import { defineConfig, loadEnv } from "vite";
import tailwindcss from '@tailwindcss/vite'
import nodemailer from "nodemailer";

const RECEIPT_ROUTE = "/api/send-receipt";
const EMAIL_CONFIG_ERROR =
  "Email service is not configured. Check SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL, and TO_EMAIL.";

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const parseSmtpPort = (value) => {
  const parsed = Number(value?.trim());
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      if (!data) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });

const createEmailContent = ({ items, subtotal, submittedAt }) => {
  const lines = items.map(
    (item) => `${item.name} x${item.quantity} = ${item.lineTotalFormatted}`
  );

  const text = [
    "Hello,",
    "",
    "Please see the checkout receipt below:",
    "",
    ...lines,
    "",
    `Subtotal: ${subtotal}`,
    `Date: ${submittedAt}`,
    "",
    "Thank you,",
    "SOLATEC Checkout",
  ].join("\n");

  const htmlLines = items
    .map(
      (item) =>
        `<tr><td style="padding:6px 0;">${escapeHtml(item.name)} x${escapeHtml(item.quantity)}</td><td style="padding:6px 0; text-align:right;">${escapeHtml(item.lineTotalFormatted)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5;">
      <h2 style="margin-bottom: 8px;">SOLATEC Checkout Receipt</h2>
      <p style="margin-top: 0; color: #4b5563;">Date: ${escapeHtml(submittedAt)}</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
        <tbody>
          ${htmlLines}
        </tbody>
      </table>
      <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="font-size: 16px;"><strong>Subtotal:</strong> ${escapeHtml(subtotal)}</p>
    </div>
  `;

  return { text, html };
};

const createReceiptHandler = ({ transporter, fromEmail, toEmail }) => async (req, res) => {
  if (req.method !== "POST") {
    sendJson(res, 405, { message: "Method not allowed" });
    return;
  }

  if (!transporter || !fromEmail || !toEmail) {
    sendJson(res, 500, { message: EMAIL_CONFIG_ERROR });
    return;
  }

  try {
    const body = await readBody(req);
    const { items, subtotal, submittedAt } = body;

    if (!Array.isArray(items) || items.length === 0 || !subtotal || !submittedAt) {
      sendJson(res, 400, { message: "Invalid receipt payload." });
      return;
    }

    const { text, html } = createEmailContent({ items, subtotal, submittedAt });

    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: `SOLATEC Receipt - ${new Date().toLocaleDateString()}`,
      text,
      html,
    });

    sendJson(res, 200, {
      message: "Receipt sent successfully.",
      id: info?.messageId,
    });
  } catch (error) {
    sendJson(res, 500, {
      message: "Failed to send receipt.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const attachReceiptApiRoute = (server, handleSendReceipt) => {
  server.middlewares.use((req, res, next) => {
    if (req.url?.startsWith(RECEIPT_ROUTE)) {
      handleSendReceipt(req, res);
      return;
    }

    next();
  });
};

const emailApiPlugin = ({ transporter, fromEmail, toEmail }) => {
  const handleSendReceipt = createReceiptHandler({ transporter, fromEmail, toEmail });

  return {
    name: "solatec-email-api",
    configureServer(server) {
      attachReceiptApiRoute(server, handleSendReceipt);
    },
    configurePreviewServer(server) {
      attachReceiptApiRoute(server, handleSendReceipt);
    },
  };
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const smtpHost = env.SMTP_HOST?.trim();
  const smtpPort = parseSmtpPort(env.SMTP_PORT);
  const smtpUser = env.SMTP_USER?.trim();
  const smtpPass = env.SMTP_PASS?.trim();
  const smtpSecure = env.SMTP_SECURE?.trim() === "true";
  const fromEmail = env.FROM_EMAIL?.trim();
  const toEmail = env.TO_EMAIL?.trim();

  const transporter =
    smtpHost && smtpPort && smtpUser && smtpPass
      ? nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })
      : null;

  return {
    plugins: [emailApiPlugin({ transporter, fromEmail, toEmail }), tailwindcss()],
  };
});