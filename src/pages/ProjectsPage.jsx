import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function ProjectsPage({ cartCount }) {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-['Outfit',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; }
        .text-gradient { background: linear-gradient(135deg,#fbb034,#ff9a00,#ffd700); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .section-tag { font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:#fbb034; font-weight:600; }
        .divider-line { background: linear-gradient(90deg, transparent, rgba(251,176,52,0.4), transparent); }
        .hero-bg { background: radial-gradient(ellipse at 60% 30%, rgba(251,176,52,0.08) 0%, transparent 60%), linear-gradient(135deg, #0a0e1a 0%, #0f1629 100%); }
        .project-img { transition: transform 0.6s ease; }
        .project-img-wrap { overflow: hidden; border-radius: 1rem; }
        .project-img-wrap:hover .project-img { transform: scale(1.04); }
      `}</style>

      <Header cartCount={cartCount} />

      {/* PAGE HEADER */}
      <section className="hero-bg px-6 md:px-16 lg:px-24 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[350px] h-[350px] rounded-full opacity-10 bg-amber-400 blur-[100px] pointer-events-none" />
        <p className="section-tag mb-4">Portfolio</p>
        <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold leading-tight mb-4">
          Our <span className="text-gradient">Projects</span>
        </h1>
        <p className="text-white/45 max-w-lg text-base leading-relaxed">
          From rooftop residences to large-scale commercial installations — every project is a step toward a sustainable future.
        </p>
      </section>

      {/* COMMERCIAL */}
      <section className="px-6 md:px-16 lg:px-24 py-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 text-lg">🏢</div>
          <div>
            <p className="section-tag">Category</p>
            <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold">Commercial Services</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="project-img-wrap h-72 border border-white/8">
            <img src="/img/commercial-services-projects.jpeg" alt="Commercial project 1" className="project-img w-full h-full object-cover" />
          </div>
          <div className="project-img-wrap h-72 border border-white/8">
            <img src="/img/commercial-services-projects2.jpeg" alt="Commercial project 2" className="project-img w-full h-full object-cover" />
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8 max-w-3xl mx-auto">
          <p className="text-white/60 leading-relaxed text-sm text-center">
            Commercial solar panels are efficient photovoltaic systems designed to generate substantial electricity for
            businesses, reducing energy costs and promoting sustainability. Our commercial installations are engineered
            for maximum output, low maintenance, and long service life — delivering measurable ROI from day one.
          </p>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider-line h-px mx-6 md:mx-16 lg:mx-24" />

      {/* RESIDENTIAL */}
      <section className="px-6 md:px-16 lg:px-24 py-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 text-lg">🏡</div>
          <div>
            <p className="section-tag">Category</p>
            <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold">Residential Services</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="project-img-wrap h-72 border border-white/8">
            <img src="/img/residential-services-projects.jpg" alt="Residential project 1" className="project-img w-full h-full object-cover" />
          </div>
          <div className="project-img-wrap h-72 border border-white/8">
            <img src="/img/residential-services-projects2.jpg" alt="Residential project 2" className="project-img w-full h-full object-cover" />
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8 max-w-3xl mx-auto">
          <p className="text-white/60 leading-relaxed text-sm text-center">
            Residential solar panels are photovoltaic systems designed for homes to generate electricity, reduce utility
            bills, and promote sustainability by harnessing solar energy. Each SOLATEC home installation is customized
            to your roof, usage patterns, and budget — so you get the most out of every ray of sunlight.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProjectsPage;