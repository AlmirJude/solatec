import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../data/products";
import Footer from "../components/Footer";
import Header from "../components/Header";

function CartPage({
  cartCount,
  cartItems,
  subtotal,
  checkoutServices,
  selectedServiceIds,
  selectedServices,
  servicesTotal,
  grandTotal,
  onIncrease,
  onDecrease,
  onRemove,
  onToggleCheckoutService,
  onClearCart,
}) {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = React.useState(false);
  const [isSendingEmail, setIsSendingEmail] = React.useState(false);
  const [checkoutError, setCheckoutError] = React.useState("");
  const [checkoutSuccess, setCheckoutSuccess] = React.useState("");
  const isEmpty = cartItems.length === 0;

  const handleConfirmCheckout = async () => {
    if (isSendingEmail) return;
    setCheckoutError("");
    setCheckoutSuccess("");
    setIsSendingEmail(true);

    const payload = {
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitPriceFormatted: formatCurrency(item.unitPrice),
        configuration: item.configurationText,
        lineTotalFormatted: formatCurrency(item.lineTotal),
      })),
      optionalServices: selectedServices.map((service) => ({
        name: service.name,
        lineTotalFormatted: formatCurrency(service.price),
      })),
      subtotal: formatCurrency(subtotal),
      serviceTotal: formatCurrency(servicesTotal),
      grandTotal: formatCurrency(grandTotal),
      submittedAt: new Date().toLocaleString(),
    };

    try {
      const response = await fetch("/api/send-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorResult = await response.json().catch(() => ({}));
        throw new Error(errorResult.message || "Failed to send email.");
      }

      onClearCart();
      setIsCheckoutModalOpen(false);
      setCheckoutSuccess("Receipt sent successfully. Please check your email.");
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Something went wrong while sending the receipt.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-['Outfit',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; }
        .text-gradient { background: linear-gradient(135deg,#fbb034,#ff9a00,#ffd700); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .section-tag { font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:#fbb034; font-weight:600; }
        .hero-bg { background: radial-gradient(ellipse at 60% 30%, rgba(251,176,52,0.08) 0%, transparent 60%), linear-gradient(135deg, #0a0e1a 0%, #0f1629 100%); }
        .btn-primary { background: linear-gradient(135deg,#fbb034,#ff9a00); color:#0a0e1a; font-weight:700; transition: all 0.3s ease; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(251,176,52,0.4); filter:brightness(1.1); }
        .btn-primary:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
        .btn-ghost { border:1.5px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.6); transition: all 0.3s ease; }
        .btn-ghost:hover { border-color:rgba(255,255,255,0.3); color:white; }
        .qty-btn { width:30px; height:30px; border-radius:50%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); color:white; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s; font-size:16px; line-height:1; }
        .qty-btn:hover { background:rgba(251,176,52,0.15); border-color:rgba(251,176,52,0.4); color:#fbb034; }
        .cart-item-row { transition: all 0.3s ease; }
        .cart-item-row:hover { background:rgba(255,255,255,0.025) !important; }
        .remove-btn { color:rgba(255,255,255,0.3); transition:color 0.2s; font-size:18px; line-height:1; background:none; border:none; cursor:pointer; padding:4px; }
        .remove-btn:hover { color:#ff6b6b; }
        .overlay { background:rgba(0,0,0,0.75); backdrop-filter:blur(8px); }
        .modal { background:#0f1629; border:1px solid rgba(251,176,52,0.2); }
        .btn-cancel { border:1.5px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.6); transition:all 0.3s ease; }
        .btn-cancel:hover { border-color:rgba(255,255,255,0.35); color:white; }
        .btn-cancel:disabled { opacity:0.4; cursor:not-allowed; }
      `}</style>

      <Header cartCount={cartCount} />

      {/* PAGE HEADER */}
      <section className="hero-bg px-6 md:px-16 lg:px-24 pt-28 pb-12">
        <p className="section-tag mb-3">Shopping</p>
        <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold leading-tight">
          Your <span className="text-gradient">Cart</span>
        </h1>
        <p className="text-white/45 text-base mt-3">Review your selected solar products and optional services before checkout.</p>
      </section>

      <main className="px-6 md:px-16 lg:px-24 pb-28">

        {/* SUCCESS MESSAGE */}
        {checkoutSuccess && (
          <div className="mb-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-emerald-400 text-sm" role="status">
            ✓ {checkoutSuccess}
          </div>
        )}

        {!isEmpty ? (
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">

            {/* ITEMS */}
            <div className="space-y-3">
              {/* Header row */}
              <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-6 px-6 pb-3 border-b border-white/8 text-white/30 text-xs uppercase tracking-widest">
                <span>Product</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Total</span>
                <span />
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.cartKey}
                  className="cart-item-row bg-white/[0.03] border border-white/8 rounded-2xl p-5 grid md:grid-cols-[1fr_auto_auto_auto] gap-5 items-center"
                >
                  {/* Product info */}
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/8">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-base mb-1">{item.name}</h2>
                      <p className="text-amber-400 text-sm font-medium">{formatCurrency(item.unitPrice)}</p>
                      <p className="text-white/35 text-xs mt-1">
                        {item.configurationText || `${item.product.powerOutput} · ${item.product.maxEfficiency}`}
                      </p>
                    </div>
                  </div>

                  {/* Qty */}
                  <div className="flex items-center gap-3">
                    <button className="qty-btn" onClick={() => onDecrease(item.cartKey)}>−</button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => onIncrease(item.cartKey)}>+</button>
                  </div>

                  {/* Line total */}
                  <div className="font-['Playfair_Display',serif] font-bold text-lg text-right">
                    {formatCurrency(item.lineTotal)}
                  </div>

                  {/* Remove */}
                  <button className="remove-btn" onClick={() => onRemove(item.cartKey)} aria-label={`Remove ${item.name}`}>
                    ✕
                  </button>
                </div>
              ))}

              <Link to="/orderhere" className="inline-block mt-4 text-amber-400 text-sm hover:text-amber-300 transition-colors">
                ← Continue shopping
              </Link>
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-7 sticky top-24">
              <h2 className="font-['Playfair_Display',serif] text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 text-sm">
                {cartItems.map((item) => (
                  <div key={item.cartKey} className="flex justify-between text-white/50">
                    <span>{item.name} ×{item.quantity}</span>
                    <span className="text-white/75">{formatCurrency(item.lineTotal)}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 border-t border-white/8 pt-5">
                <p className="text-white/55 text-xs uppercase tracking-widest mb-4">Optional Services</p>
                <div className="space-y-3">
                  {checkoutServices.map((service) => {
                    const isChecked = selectedServiceIds.includes(service.id);
                    return (
                      <label
                        key={service.id}
                        className="flex items-start justify-between gap-3 text-sm cursor-pointer"
                      >
                        <span className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            className="mt-1"
                            checked={isChecked}
                            onChange={() => onToggleCheckoutService(service.id)}
                          />
                          <span>
                            <span className="text-white/80 block">{service.name}</span>
                            <span className="text-white/35 text-xs block mt-1">{service.description}</span>
                          </span>
                        </span>
                        <span className="text-white/75">{formatCurrency(service.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-white/8 pt-4 mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-white/60 text-sm">Subtotal</span>
                  <span className="text-white/80">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-white/60 text-sm">Optional Services</span>
                  <span className="text-white/80">{formatCurrency(servicesTotal)}</span>
                </div>
                <div className="flex justify-between items-baseline border-t border-white/8 pt-3 mt-3">
                  <span className="text-white/70 text-sm">Grand Total</span>
                  <span className="font-['Playfair_Display',serif] text-2xl font-bold text-gradient">{formatCurrency(grandTotal)}</span>
                </div>
                <p className="text-white/30 text-xs mt-2">Optional services are unchecked by default.</p>
              </div>

              <button
                className="btn-primary w-full py-4 rounded-xl text-sm uppercase tracking-widest"
                onClick={() => setIsCheckoutModalOpen(true)}
              >
                Check Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-4xl mb-6">☀️</div>
            <h2 className="font-['Playfair_Display',serif] text-3xl font-bold mb-3">Your cart is empty</h2>
            <p className="text-white/40 text-sm mb-8">Browse products and add items to get started.</p>
            <Link to="/orderhere" className="btn-primary px-8 py-4 rounded-full text-sm uppercase tracking-widest inline-block">
              Go to Products
            </Link>
          </div>
        )}
      </main>

      {/* CHECKOUT MODAL */}
      {isCheckoutModalOpen && (
        <div className="overlay fixed inset-0 z-50 flex items-center justify-center p-6" role="dialog" aria-modal="true">
          <div className="modal rounded-2xl p-8 w-full max-w-md">
            <h2 className="font-['Playfair_Display',serif] text-2xl font-bold mb-2">Review Checkout</h2>
            <p className="text-white/45 text-sm mb-6">Confirm your items before we send the receipt to your email.</p>

            {checkoutError && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
                {checkoutError}
              </div>
            )}

            <div className="space-y-3 mb-5">
              {cartItems.map((item) => (
                <div key={item.cartKey} className="flex justify-between items-center text-sm border-b border-white/8 pb-3">
                  <span className="text-white/65">{item.name} ×{item.quantity}</span>
                  <strong className="text-white">{formatCurrency(item.lineTotal)}</strong>
                </div>
              ))}
              {selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between items-center text-sm border-b border-white/8 pb-3">
                  <span className="text-white/65">{service.name}</span>
                  <strong className="text-white">{formatCurrency(service.price)}</strong>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-8">
              <div className="flex justify-between items-baseline">
                <span className="text-white/50 text-sm">Subtotal</span>
                <span className="text-white/80">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white/50 text-sm">Optional Services</span>
                <span className="text-white/80">{formatCurrency(servicesTotal)}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/8 pt-3 mt-2">
                <span className="text-white/50 text-sm">Grand Total</span>
                <span className="font-['Playfair_Display',serif] text-2xl font-bold text-gradient">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="btn-cancel flex-1 py-3 rounded-xl text-sm uppercase tracking-wide"
                disabled={isSendingEmail}
                onClick={() => setIsCheckoutModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary flex-1 py-3 rounded-xl text-sm uppercase tracking-wide"
                disabled={isSendingEmail}
                onClick={handleConfirmCheckout}
              >
                {isSendingEmail ? "Sending…" : "Confirm & Email"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default CartPage;