import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="top-padding"></div>
      <header>
        <div className="logo">
          <img src="/img/logo.png" alt="Logo" />
          <h2>SOLATEC</h2>
        </div>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="primary-nav"
          aria-expanded={isMenuOpen}
          onClick={handleToggleMenu}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <nav id="primary-nav" className={isMenuOpen ? "open" : ""}>
          <NavLink to="/" end onClick={handleCloseMenu}>
            HOME
          </NavLink>
          <NavLink to="/projects" onClick={handleCloseMenu}>
            PROJECTS
          </NavLink>
          <NavLink to="/about" onClick={handleCloseMenu}>
            ABOUT
          </NavLink>
          <NavLink
            to="/orderhere"
            onClick={handleCloseMenu}
            className={({ isActive }) =>
              isActive ? "order-button active" : "order-button"
            }
          >
            ORDER
            <br />
            HERE
          </NavLink>
          <Link
            to="/cart"
            className="cart-link"
            aria-label="Go to cart"
            onClick={handleCloseMenu}
          >
            <img src="/img/cart.png" alt="cart" />
            {cartCount > 0 ? (
              <span className="cart-count">{cartCount}</span>
            ) : null}
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
