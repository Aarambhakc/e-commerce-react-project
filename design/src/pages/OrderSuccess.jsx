import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <p className="success-tag">
          Order Confirmed
        </p>

        <h1>
          Thank You For Your Purchase
        </h1>

        <p className="success-text">
          Your order has been placed successfully.
          Our atelier team is preparing your pieces
          with exceptional care.
        </p>

        <div className="success-buttons">

          <Link
            to="/orders"
            className="secondary-btn"
          >
            View Orders
          </Link>

          <Link
            to="/product"
            className="primary-btn"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;