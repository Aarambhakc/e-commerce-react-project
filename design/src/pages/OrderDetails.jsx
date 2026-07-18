import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  // ===========================
  // USER NOT LOGGED IN
  // ===========================

  if (!user) {
    return (
      <div className="order-not-found">
        <h2>Please login first</h2>

        <p>
          Sign in to access your complete order history
          and shipment details.
        </p>

        <button
          className="back-btn"
          onClick={() => navigate("/auth")}
        >
          Login
        </button>
      </div>
    );
  }

  // ===========================
  // FETCH ORDERS
  // ===========================

  const orderKey = `orders_${user.email}`;

  const orders =
    JSON.parse(localStorage.getItem(orderKey)) || [];

  const order = orders.find(
    (o) => String(o.id) === String(id)
  );

  // ===========================
  // ORDER NOT FOUND
  // ===========================

  if (!order) {
    return (
      <div className="order-not-found">
        <h2>Order Not Found</h2>

        <p>
          We couldn't locate the requested order.
          It may have been removed or the link is
          invalid.
        </p>

        <button
          className="back-btn"
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  // ===========================
  // TIMELINE
  // ===========================

  const steps = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const status =
    order.status || "Processing";

  const currentStep = Math.max(
    0,
    steps.findIndex(
      (step) =>
        step.toLowerCase() ===
        status.toLowerCase()
    )
  );

  // ===========================
  // ORDER CALCULATIONS
  // ===========================

  const totalItems = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = order.items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const shipping = order.shipping ?? 0;

  const discount = order.discount ?? 0;

  const tax = order.tax ?? 0;

  const total =
    order.total ??
    subtotal + shipping + tax - discount;

  return (
    <div className="order-details-page">
      {/* ===========================
          HEADER
      ============================ */}

      <div className="details-header">
        <p className="details-tag">
          Private Client Record
        </p>

        <h1>Order Details</h1>
      </div>

      {/* ===========================
          CARD
      ============================ */}

      <div className="details-card">

        {/* ===========================
            ORDER INFO
        ============================ */}

        <div className="details-info">

          <div>
            <span>Order ID</span>

            <p>
              #
              {order.orderNumber ||
                order.id}
            </p>
          </div>

          <div>
            <span>Order Date</span>

            <p>{order.date}</p>
          </div>

          <div>
            <span>Total Items</span>

            <p>{totalItems}</p>
          </div>

          <div>
            <span>Payment</span>

            <p>
              {order.paymentStatus ||
                "Paid"}
            </p>
          </div>

          <div>
            <span>Status</span>

            <p>{status}</p>
          </div>

          <div>
            <span>
              Estimated Delivery
            </span>

            <p>
              {order.estimatedDelivery ||
                "To be announced"}
            </p>
          </div>

        </div>

        {/* ===========================
            ORDER PROGRESS
        ============================ */}

        <div className="order-status">

          <h2>Order Progress</h2>

          <div className="order-timeline">

            {steps.map((step, index) => (

              <div
                key={step}
                className={`timeline-step ${
                  index <= currentStep
                    ? "active"
                    : ""
                }`}
              >
                {step}
              </div>

            ))}

          </div>

        </div>

        {/* ===========================
            ORDER ITEMS
        ============================ */}

        <div className="details-items">

          <h2>Purchased Items</h2>

          {order.items.map((item) => (

            <div
              key={`${item.id}-${item.size}`}
              className="details-item"
            >
              <img
                src={item.image}
                alt={item.title}
              />

              <div className="item-info">

                <h3>{item.title}</h3>

                <p>
                  <strong>Size:</strong>{" "}
                  {item.size || "Standard"}
                </p>

                <p>
                  <strong>Quantity:</strong>{" "}
                  {item.quantity}
                </p>

                <p>
                  <strong>Unit Price:</strong>{" "}
                  ${item.price.toFixed(2)}
                </p>
                              </div>

              <div className="item-price">
                $
                {(
                  item.price *
                  item.quantity
                ).toFixed(2)}
              </div>
            </div>

          ))}

        </div>

        {/* ===========================
            ORDER SUMMARY
        ============================ */}

        <div className="details-summary">

          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>

            <span>
              {shipping === 0
                ? "Free"
                : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="summary-row">
            <span>Tax</span>

            <span>
              ${tax.toFixed(2)}
            </span>
          </div>

          {discount > 0 && (
            <div className="summary-row discount">
              <span>Discount</span>

              <span>
                -${discount.toFixed(2)}
              </span>
            </div>
          )}

        </div>

        {/* ===========================
            TOTAL
        ============================ */}

        <div className="details-total">

          <span>Total</span>

          <span>
            ${total.toFixed(2)}
          </span>

        </div>

        {/* ===========================
            ACTIONS
        ============================ */}

        <div className="details-actions">

          <button
            className="back-btn"
            onClick={() => navigate("/orders")}
          >
            Back to Orders
          </button>

          <button
            className="continue-btn"
            onClick={() => navigate("/product")}
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  );
}

export default OrderDetails;