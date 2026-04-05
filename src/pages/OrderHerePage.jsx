import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency, panelTypeOptions } from "../data/products";
import Footer from "../components/Footer";
import Header from "../components/Header";

function OrderHerePage({ cartCount, products, onAddToCart }) {
  const navigate = useNavigate();
  const [activePackage, setActivePackage] = React.useState(null);
  const [selectedPanelTypeId, setSelectedPanelTypeId] = React.useState(panelTypeOptions[0]?.id || "");
  const [selectedPanelCount, setSelectedPanelCount] = React.useState(0);
  const [pendingAction, setPendingAction] = React.useState("cart");

  const selectedPanelType = React.useMemo(
    () => panelTypeOptions.find((panelType) => panelType.id === selectedPanelTypeId),
    [selectedPanelTypeId]
  );

  const estimatedPackagePrice = React.useMemo(() => {
    if (!activePackage || !selectedPanelType) {
      return 0;
    }

    const minPanels = activePackage.minPanels || 1;
    const maxPanels = activePackage.maxPanels || minPanels;
    const panelSpan = Math.max(1, maxPanels - minPanels);
    const ratio = (selectedPanelCount - minPanels) / panelSpan;
    const basePrice = activePackage.salePrice + (activePackage.originalPrice - activePackage.salePrice) * ratio;
    return Math.round(basePrice * selectedPanelType.packageMultiplier);
  }, [activePackage, selectedPanelCount, selectedPanelType]);

  const openPackageConfigurator = (product, action) => {
    setActivePackage(product);
    setPendingAction(action);
    setSelectedPanelTypeId(panelTypeOptions[0]?.id || "");
    setSelectedPanelCount(product.minPanels || 1);
  };

  const closePackageConfigurator = () => {
    setActivePackage(null);
  };

  const handleConfirmPackageSelection = () => {
    if (!activePackage || !selectedPanelType) {
      return;
    }

    const minPanels = activePackage.minPanels || 1;
    const maxPanels = activePackage.maxPanels || minPanels;
    const panelCount = Math.min(maxPanels, Math.max(minPanels, selectedPanelCount));
    const cartKeySuffix = `${selectedPanelType.id}-${panelCount}`;
    const displayName = `${activePackage.name} - ${selectedPanelType.name} (${panelCount} panels)`;

    onAddToCart(activePackage.id, {
      cartKeySuffix,
      unitPrice: estimatedPackagePrice,
      displayName,
      packageConfig: {
        panelTypeName: selectedPanelType.name,
        panelCount,
      },
    });

    closePackageConfigurator();

    if (pendingAction === "buy") {
      navigate("/cart");
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
        .product-card { transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .product-card:hover { transform: translateY(-6px); border-color: rgba(251,176,52,0.35) !important; box-shadow: 0 16px 50px rgba(251,176,52,0.1); }
        .btn-primary { background: linear-gradient(135deg,#fbb034,#ff9a00); color:#0a0e1a; font-weight:700; letter-spacing:0.05em; transition: all 0.3s ease; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(251,176,52,0.4); filter:brightness(1.1); }
        .btn-ghost { border:1.5px solid rgba(251,176,52,0.4); color:#fbb034; transition: all 0.3s ease; }
        .btn-ghost:hover { background: rgba(251,176,52,0.08); border-color:#fbb034; transform:translateY(-2px); }
        .badge { font-size:10px; letter-spacing:.15em; }
        .img-wrap img { transition: transform 0.5s ease; }
        .img-wrap:hover img { transform: scale(1.04); }
        .strike { text-decoration: line-through; color: rgba(255,255,255,0.25); }
      `}</style>

      <Header cartCount={cartCount} />

      {/* PAGE HEADER */}
      <section className="hero-bg px-6 md:px-16 lg:px-24 pt-28 pb-16">
        <p className="section-tag mb-4">Shop</p>
        <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl font-bold leading-tight mb-4">
          Solar Solution <span className="text-gradient">Catalog</span>
        </h1>
        <p className="text-white/45 text-base max-w-lg">
          Choose from residential, commercial, and support services based on your energy needs.
        </p>
      </section>

      {/* PRODUCTS GRID */}
      <section className="px-6 md:px-16 lg:px-24 pb-28">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="product-card bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="img-wrap h-56 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-amber-400 text-[#0a0e1a] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest badge">
                  {product.isPackage ? "Package" : "Catalog"}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-lg font-semibold mb-1">{product.name}</h2>

                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-amber-400 text-xl font-bold font-['Playfair_Display',serif]">
                    {formatCurrency(product.salePrice)}
                  </span>
                  <span className="strike text-sm">{formatCurrency(product.originalPrice)}</span>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {[
                    ["Highlights", product.maxEfficiency],
                    ["System / Scope", product.powerOutput],
                    ["Provider", product.vendor],
                    ["Category", product.type],
                    ["Warranty", product.warranty],
                  ].map(([key, val]) => (
                    <li key={key} className="flex justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-white/40">{key}</span>
                      <span className="text-white/75 font-medium">{val}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (product.isPackage) {
                        openPackageConfigurator(product, "cart");
                        return;
                      }
                      onAddToCart(product.id);
                    }}
                    className="btn-ghost flex-1 py-3 rounded-xl text-sm font-semibold uppercase tracking-wide"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      if (product.isPackage) {
                        openPackageConfigurator(product, "buy");
                        return;
                      }
                      onAddToCart(product.id);
                      navigate("/cart");
                    }}
                    className="btn-primary flex-1 py-3 rounded-xl text-sm uppercase tracking-wide"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activePackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f1629] p-7">
            <h2 className="font-['Playfair_Display',serif] text-2xl font-bold mb-2">Configure Package</h2>
            <p className="text-white/55 text-sm mb-6">{activePackage.name}</p>

            <div className="space-y-5">
              <div>
                <label className="block text-white/70 text-sm mb-2">Solar Panel Type</label>
                <select
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white"
                  value={selectedPanelTypeId}
                  onChange={(event) => setSelectedPanelTypeId(event.target.value)}
                >
                  {panelTypeOptions.map((panelType) => (
                    <option key={panelType.id} value={panelType.id} className="text-black">
                      {panelType.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">
                  Number of Panels ({activePackage.minPanels} to {activePackage.maxPanels})
                </label>
                <input
                  type="number"
                  min={activePackage.minPanels}
                  max={activePackage.maxPanels}
                  value={selectedPanelCount}
                  onChange={(event) => setSelectedPanelCount(Number(event.target.value))}
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white"
                />
              </div>

              <div className="rounded-xl border border-amber-400/25 bg-amber-400/10 p-4">
                <p className="text-white/55 text-xs uppercase tracking-widest mb-1">Estimated Package Price</p>
                <p className="font-['Playfair_Display',serif] text-2xl font-bold text-amber-400">{formatCurrency(estimatedPackagePrice)}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-7">
              <button
                onClick={closePackageConfigurator}
                className="flex-1 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/35 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPackageSelection}
                className="btn-primary flex-1 py-3 rounded-xl text-sm uppercase tracking-wide"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default OrderHerePage;