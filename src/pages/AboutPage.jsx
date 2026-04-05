import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function AboutPage({ cartCount }) {
  const offerings = [
    { title: "Customized Solar Solutions", desc: "Tailored solar panel systems to meet the specific energy needs of both commercial and residential clients." },
    { title: "Professional Installation", desc: "Expert installation services ensuring seamless integration and optimal performance of solar panels." },
    { title: "Maintenance & Support", desc: "Comprehensive maintenance plans and dedicated customer support to ensure long-term efficiency and satisfaction." },
    { title: "Advanced Technology", desc: "Utilization of the latest solar technologies to maximize energy production and system reliability." },
    { title: "Energy Audits", desc: "Detailed energy assessments to determine the best solar solutions for maximum savings and efficiency." },
    { title: "Financing Options", desc: "Flexible financing plans to make solar energy accessible and affordable for all clients." },
    { title: "Educational Programs", desc: "Informative workshops and resources to educate clients about the benefits of solar energy." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-['Outfit',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; }
        .text-gradient { background: linear-gradient(135deg,#fbb034,#ff9a00,#ffd700); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .section-tag { font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:#fbb034; font-weight:600; }
        .divider-line { background: linear-gradient(90deg, transparent, rgba(251,176,52,0.4), transparent); }
        .offering-card { transition: all 0.3s ease; }
        .offering-card:hover { background: rgba(251,176,52,0.05); border-color: rgba(251,176,52,0.3) !important; transform: translateX(4px); }
        .hero-bg { background: radial-gradient(ellipse at 60% 30%, rgba(251,176,52,0.1) 0%, transparent 60%), linear-gradient(135deg, #0a0e1a 0%, #0f1629 100%); }
      `}</style>

      <Header cartCount={cartCount} />

      {/* PAGE HERO */}
      <section className="hero-bg relative px-6 md:px-16 lg:px-24 pt-28 pb-20 overflow-hidden">
        <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full opacity-10 bg-amber-400 blur-[120px] pointer-events-none" />
        <p className="section-tag mb-4">Who We Are</p>
        <h1 className="font-['Playfair_Display',serif] font-900 text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-[1.05] mb-6">
          Powering a <span className="text-gradient">Cleaner</span> Future
        </h1>
        <p className="text-white/50 max-w-2xl text-lg leading-relaxed font-light">
          Solatec is a leading provider of solar energy systems, offering top-quality solar panels and professional
          installation services for both commercial and residential clients. With a commitment to sustainability and
          energy efficiency, we help businesses and homeowners reduce electricity costs, lower their carbon footprint,
          and achieve true energy independence.
        </p>
      </section>

      {/* IMAGE + MISSION */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden h-[420px] border border-white/8">
          <img src="/img/details.jpg" alt="Solatec installation" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="section-tag mb-4">Our Mission</p>
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Making Solar Energy Accessible for Everyone
          </h2>
          <p className="text-white/45 leading-relaxed mb-6 text-sm">
            We believe that clean, renewable energy should not be a luxury. Our team of certified engineers and
            energy consultants works alongside every client to design a solar system that fits their lifestyle,
            budget, and energy goals — from initial audit through years of ongoing support.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[["500+", "Projects Completed"], ["30%", "Average Bill Savings"], ["25yr", "Panel Warranty"], ["100%", "Client Satisfaction"]].map(([num, label]) => (
              <div key={label} className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
                <p className="font-['Playfair_Display',serif] text-2xl font-bold text-gradient">{num}</p>
                <p className="text-white/40 text-xs uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider-line h-px mx-6 md:mx-16 lg:mx-24" />

      {/* KEY OFFERINGS */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <p className="section-tag mb-3">What We Provide</p>
        <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold mb-14">Key Offerings</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {offerings.map(({ title, desc }, i) => (
            <div
              key={title}
              className="offering-card bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 font-bold font-['Playfair_Display',serif] text-sm">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;