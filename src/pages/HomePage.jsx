import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency, products as catalogProducts } from "../data/products";
import Footer from "../components/Footer";
import Header from "../components/Header";

function HomePage({ cartCount }) {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-['Outfit',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=Playfair+Display:wght@700;900&display=swap');

        * { box-sizing: border-box; }

        .hero-bg {
          background: radial-gradient(ellipse at 70% 40%, rgba(251,176,52,0.12) 0%, transparent 60%),
                      radial-gradient(ellipse at 10% 80%, rgba(251,176,52,0.06) 0%, transparent 50%),
                      linear-gradient(135deg, #0a0e1a 0%, #0f1629 50%, #0a0e1a 100%);
        }

        .amber-glow {
          box-shadow: 0 0 40px rgba(251,176,52,0.25), 0 0 80px rgba(251,176,52,0.08);
        }

        .card-glow:hover {
          box-shadow: 0 8px 40px rgba(251,176,52,0.15);
          transform: translateY(-4px);
          border-color: rgba(251,176,52,0.4) !important;
        }

        .card-glow {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .text-gradient {
          background: linear-gradient(135deg, #fbb034, #ff9a00, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }

        .btn-primary {
          background: linear-gradient(135deg, #fbb034, #ff9a00);
          color: #0a0e1a;
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(251,176,52,0.4);
          filter: brightness(1.1);
        }

        .btn-outline {
          border: 1.5px solid rgba(251,176,52,0.5);
          color: #fbb034;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          background: rgba(251,176,52,0.1);
          border-color: #fbb034;
          transform: translateY(-2px);
        }

        .divider-line {
          background: linear-gradient(90deg, transparent, rgba(251,176,52,0.5), transparent);
        }

        .service-card-img {
          overflow: hidden;
          border-radius: 12px;
        }

        .service-card-img img {
          transition: transform 0.6s ease;
        }

        .service-card-img:hover img {
          transform: scale(1.05);
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 0;
        }

        .form-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: rgba(251,176,52,0.6);
          background: rgba(251,176,52,0.05);
          box-shadow: 0 0 0 3px rgba(251,176,52,0.1);
        }

        .form-input::placeholder { color: rgba(255,255,255,0.3); }

        .section-tag {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fbb034;
          font-weight: 600;
        }
      `}</style>

      <div className="noise-overlay" aria-hidden="true" />

      <Header cartCount={cartCount} />

      {/* HERO */}
      <section className="hero-bg relative min-h-screen flex items-center overflow-hidden px-6 md:px-16 lg:px-24">
        {/* Decorative sun circle */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 bg-amber-400 blur-[120px] pointer-events-none" />
        <div className="absolute right-[10%] top-[20%] w-[300px] h-[300px] rounded-full border border-amber-400/10 pointer-events-none" />
        <div className="absolute right-[8%] top-[18%] w-[400px] h-[400px] rounded-full border border-amber-400/5 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <p className="section-tag mb-6">Sustainable Energy Solutions</p>
          <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl text-white mb-6">
            Go Solar.
            <br />
            <span className="text-gradient">Save 30%</span>
            <br />
            on Bills.
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
            SOLATEC delivers residential and commercial solar solutions designed
            for long-term savings and cleaner energy — built to last decades.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/orderhere" className="btn-primary px-8 py-4 rounded-full text-sm uppercase inline-block">
              Explore Products
            </Link>
            <Link to="/projects" className="btn-outline px-8 py-4 rounded-full text-sm uppercase inline-block">
              View Projects
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 grid grid-cols-3 divide-x divide-white/5">
          {[["500+", "Installations"], ["30%", "Bill Reduction"], ["25yr", "Panel Warranty"]].map(([num, label]) => (
            <div key={label} className="py-6 px-8 text-center">
              <p className="stat-number text-2xl md:text-3xl text-gradient">{num}</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <p className="section-tag mb-3">What We Offer</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold">Our Services</h2>
          <p className="text-white/40 max-w-sm text-sm leading-relaxed">Complete solar support from planning to professional installation.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { src: "/img/residential-services-.jpg", title: "Residential Services", desc: "Lower utility bills and power your home with reliable, long-lasting solar systems." },
            { src: "/img/commercial-services.jpeg", title: "Commercial Services", desc: "Scalable energy systems built for businesses focused on efficiency and ROI." },
          ].map(({ src, title, desc }) => (
            <div key={title} className="card-glow bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden group">
              <div className="service-card-img h-64">
                <img src={src} alt={title} className="w-full h-full object-cover" />
              </div>
              <div className="p-7">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider-line h-px mx-6 md:mx-16 lg:mx-24" />

      {/* FEATURED PROJECTS + WHY SOLATEC */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24 grid md:grid-cols-2 gap-10">
        {[
          {
            tag: "Portfolio",
            title: "Featured Projects",
            desc: "See how SOLATEC powers homes and businesses with high-performance solar installations across the Philippines.",
            src: "/img/commercial-services-projects.jpeg",
            link: "/projects",
            linkLabel: "See all projects →",
          },
          {
            tag: "About Us",
            title: "Why SOLATEC",
            desc: "Customized solutions, professional installation, and long-term support to maximize your solar investment.",
            src: "/img/details.jpg",
            link: "/about",
            linkLabel: "Read about us →",
          },
        ].map(({ tag, title, desc, src, link, linkLabel }) => (
          <div key={title} className="flex flex-col gap-5">
            <p className="section-tag">{tag}</p>
            <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold">{title}</h2>
            <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
            <div className="rounded-2xl overflow-hidden service-card-img h-60">
              <img src={src} alt={title} className="w-full h-full object-cover" />
            </div>
            <Link to={link} className="text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors">
              {linkLabel}
            </Link>
          </div>
        ))}
      </section>

      {/* DIVIDER */}
      <div className="divider-line h-px mx-6 md:mx-16 lg:mx-24" />

      {/* POPULAR PRODUCTS */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <p className="section-tag mb-3">Catalog</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold">Popular Packages</h2>
          <p className="text-white/40 max-w-sm text-sm">Explore our most requested residential and commercial solar solutions.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {catalogProducts.slice(0, 3).map(({ id, image, name, salePrice }) => (
            <div key={name} className="card-glow bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
              <div className="h-52 overflow-hidden">
                <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-base">{name}</h3>
                  <p className="text-amber-400 font-bold mt-1">From {formatCurrency(salePrice)}</p>
                </div>
                <Link to="/orderhere" className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-[#0a0e1a] transition-all text-lg font-bold">
                  +
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/orderhere" className="btn-primary px-8 py-4 rounded-full text-sm uppercase inline-block">
            Go to Product Catalog
          </Link>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider-line h-px mx-6 md:mx-16 lg:mx-24" />

      {/* CONTACT */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <p className="section-tag mb-3">Get In Touch</p>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>
          <p className="text-white/40 text-sm leading-relaxed">
            Send us your details and we'll reach out with the right solar package for your needs.
          </p>
        </div>

        <form
          className="max-w-xl mx-auto grid gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-2 gap-4">
            <input className="form-input rounded-xl px-5 py-4 text-sm w-full" type="text" placeholder="Name" />
            <input className="form-input rounded-xl px-5 py-4 text-sm w-full" type="email" placeholder="Email" />
          </div>
          <input className="form-input rounded-xl px-5 py-4 text-sm" type="tel" placeholder="Phone" />
          <input className="form-input rounded-xl px-5 py-4 text-sm" type="text" placeholder="Preferred Service" />
          <button type="submit" className="btn-primary py-4 rounded-full text-sm uppercase font-bold mt-2">
            Send Inquiry
          </button>
        </form>
      </section>

      <Footer className="footer" />
    </div>
  );
}

export default HomePage;