import React, { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { checkoutServices, products } from "./data/products";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import OrderHerePage from "./pages/OrderHerePage";
import ProjectsPage from "./pages/ProjectsPage";

const buildCartKey = (productId, cartKeySuffix) =>
  cartKeySuffix ? `${productId}:${cartKeySuffix}` : productId;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);

  const productsById = useMemo(
    () => Object.fromEntries(products.map((product) => [product.id, product])),
    []
  );

  const cartDetails = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = productsById[item.productId];
          if (!product) {
            return null;
          }

          return {
            ...item,
            product,
            unitPrice: item.unitPrice ?? product.salePrice,
            name: item.displayName ?? product.name,
            configurationText:
              item.packageConfig
                ? `${item.packageConfig.panelTypeName} x ${item.packageConfig.panelCount} panels`
                : "",
            lineTotal: (item.unitPrice ?? product.salePrice) * item.quantity,
          };
        })
        .filter(Boolean),
    [cartItems, productsById]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartDetails.reduce((total, item) => total + item.lineTotal, 0),
    [cartDetails]
  );

  const selectedServices = useMemo(
    () => checkoutServices.filter((service) => selectedServiceIds.includes(service.id)),
    [selectedServiceIds]
  );

  const servicesTotal = useMemo(
    () => selectedServices.reduce((total, service) => total + service.price, 0),
    [selectedServices]
  );

  const grandTotal = useMemo(
    () => subtotal + servicesTotal,
    [subtotal, servicesTotal]
  );

  const addToCart = (productId, config = {}) => {
    const cartKey = buildCartKey(productId, config.cartKeySuffix);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.cartKey === cartKey);
      if (existingItem) {
        return prevItems.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevItems,
        {
          cartKey,
          productId,
          quantity: 1,
          unitPrice: config.unitPrice ?? null,
          displayName: config.displayName ?? null,
          packageConfig: config.packageConfig ?? null,
        },
      ];
    });
  };

  const increaseQuantity = (cartKey) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (cartKey) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (cartKey) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartKey !== cartKey)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedServiceIds([]);
  };

  const toggleCheckoutService = (serviceId) => {
    setSelectedServiceIds((prevIds) =>
      prevIds.includes(serviceId)
        ? prevIds.filter((id) => id !== serviceId)
        : [...prevIds, serviceId]
    );
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage cartCount={cartCount} />} />
      <Route
        path="/projects"
        element={<ProjectsPage cartCount={cartCount} />}
      />
      <Route path="/about" element={<AboutPage cartCount={cartCount} />} />
      <Route
        path="/orderhere"
        element={
          <OrderHerePage
            cartCount={cartCount}
            products={products}
            onAddToCart={addToCart}
          />
        }
      />
      <Route
        path="/cart"
        element={
          <CartPage
            cartCount={cartCount}
            cartItems={cartDetails}
            subtotal={subtotal}
            checkoutServices={checkoutServices}
            selectedServiceIds={selectedServiceIds}
            selectedServices={selectedServices}
            servicesTotal={servicesTotal}
            grandTotal={grandTotal}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeItem}
            onToggleCheckoutService={toggleCheckoutService}
            onClearCart={clearCart}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
