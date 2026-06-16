import { CiLocationOn, CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiCart } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import { useState, useContext } from "react";
import logo from "../../assets/images/icons/amazon.png";
import engFlag from "../../assets/images/icons/engFlag.png";
import { Link } from "react-router-dom";
import "./header.css";
import { DataProviderContext } from "../../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

const subNavLinks = [
  { label: "Today's Deals", to: "/" },
  { label: "Gift Cards", to: "/" },
  { label: "Sell", to: "/" },
  { label: "Registry", to: "/" },
  { label: "Prime Video", to: "/" },
  { label: "Customer Service", to: "/" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state } = useContext(DataProviderContext);

  return (
    <>
      <header className="container-fluid header bg-black top-0 z-10000">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo hover-border">
            <img src={logo} alt="Amazon Logo" />
          </Link>

          {/* Location — hidden on mobile */}
          <div className="location hover-border hide-mobile">
            <CiLocationOn className="location-icon" />
            <div className="location-text">
              <span className="small-text">Deliver to</span>
              <strong>Ethiopia</strong>
            </div>
          </div>

          {/* Search */}
          <div className="search-wrapper">
            <select className="search-category">
              <option>All</option>
            </select>
            <input
              type="text"
              className="search-input"
              placeholder="Search products"
            />
            <button className="search-btn">
              <CiSearch />
            </button>
          </div>

          {/* Language — hidden on mobile */}
          <div className="language-wrapper hover-border hide-mobile">
            <img src={engFlag} alt="English" />
            <span>
              <strong>EN</strong>
              <IoMdArrowDropdown />
            </span>
          </div>

          {/* Account — hidden on mobile */}
          <Link
            className="nav-item hover-border hide-mobile p-0"
            to={!state?.user && "/auth"}
          >
            <span className="small-text">
              {state.user ? (
                <span onClick={() => auth.signOut()}>
                  Hello, {state.user.email.split("@")[0]}
                  <br />
                  Sign Out
                </span>
              ) : (
                <span>Sign In</span>
              )}
            </span>
            <strong>
              Account & Lists <IoMdArrowDropdown />
            </strong>
          </Link>

          {/* Orders — hidden on mobile */}
          <div className="nav-item hover-border hide-mobile">
            <Link to="/orders">
              <span className="small-text">Returns</span>
              <strong>& Orders</strong>
            </Link>
          </div>

          {/* Cart */}
          <div className="cart-wrapper hover-border">
            <Link to="/cart">
              <span className="cart-count">{state.cart.length}</span>
              <BiCart className="cart-icon" size={35} />
            </Link>
          </div>

          {/* Hamburger — shown on mobile only */}
          <button
            className="hamburger show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <IoMenu size={28} />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <Link
              to={!state?.user && "/auth"}
              onClick={() => setMenuOpen(false)}
            >
              {state.user ? (
                <span>
                  {state.user.email.split("@")[0]}
                  <br />
                  Sign Out
                </span>
              ) : (
                <span>Sign In</span>
              )}
            </Link>
            <Link to="/orders" onClick={() => setMenuOpen(false)}>
              Returns & Orders
            </Link>
            {subNavLinks.map(({ label, to }) => (
              <Link key={label} to={to} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Sub-header */}
      <nav className="sub-header">
        <ul className="menu-list d-flex">
          <li className="hover-border">
            <Link to="/" className="d-flex align-items-center gap-1">
              <IoMenu className="menu-icon" />
              <span className="hide-mobile">All</span>
            </Link>
          </li>
          {subNavLinks.map(({ label, to }) => (
            <li key={label} className="hover-border hide-mobile">
              <Link to={to}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Header;