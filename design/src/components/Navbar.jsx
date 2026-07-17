import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {
  const { cartItems } =
    useContext(CartContext);

  const { user, logout } =
    useContext(AuthContext);

  const {
    darkMode,
    toggleTheme,
  } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const totalItems =
    cartItems.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  const closeMenu = () =>
    setMenuOpen(false);

  return (
    <nav className="navbar">

      {/* LOGO */}
      <Link
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        STRUT & SUBSTANCE
      </Link>

      {/* MOBILE MENU ICON */}
      <div
        className="menu-icon"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        {menuOpen ? (
          <FaTimes />
        ) : (
          <FaBars />
        )}
      </div>

      {/* NAVIGATION */}
      <ul
        className={
          menuOpen
            ? "nav-links active"
            : "nav-links"
        }
      >
        <li>
          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/product"
            onClick={closeMenu}
          >
            Collections
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            onClick={closeMenu}
          >
            About
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </li>

        <li>
          <Link
            to="/wishlist"
            onClick={closeMenu}
          >
            Saved Items
          </Link>
        </li>

        {user && (
          <li>
            <Link
              to="/orders"
              onClick={closeMenu}
            >
              Orders
            </Link>
          </li>
        )}

        <li>
          <Link
            to="/cart"
            className="cart-link"
            onClick={closeMenu}
          >
            <FaShoppingCart />

            {totalItems > 0 && (
              <span className="cart-count">
                {totalItems}
              </span>
            )}
          </Link>
        </li>

        {/* USER SECTION */}
        {user ? (
          <>
            <li>
              <Link
                to="/profile"
                onClick={closeMenu}
              >
                Profile
              </Link>
            </li>

            {user && user.email ? (
  <li className="user-email">
    Hello, {user.email.split("@")[0]}
  </li>
) : null}

            <li>
              <button
                className="logout-btn"
                onClick={() => {
                  logout();
                   toast.info("Logged out successfully");
                  closeMenu();
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
           <li>
  <Link
    to="/auth"
    onClick={closeMenu}
  >
    Sign In / Register
  </Link>
</li>
          </>
        )}

        {/* THEME BUTTON */}
        <li>
         <button
  type="button"
  className="theme-btn"
  onClick={toggleTheme}
>
            {darkMode ? "☀" : "☾"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;