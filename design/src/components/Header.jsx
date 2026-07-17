
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="top-header">
      <div className="header-left">
        Complimentary Shipping Worldwide
      </div>

      <div className="header-center">
        Crafted in Italy • Timeless Luxury
      </div>

      <Link to="/contact" className="header-right">
  Customer Care
</Link>
    </header>
  );
}

export default Header;
