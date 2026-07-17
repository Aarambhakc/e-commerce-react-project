import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

 if (!user) {
  return (
    <div className="order-not-found">
      <h2>Please login first</h2>

      <button
        className="back-btn"
        onClick={() => navigate("/auth")}
      >
        Login
      </button>
    </div>
  );
}

const orderKey = `orders_${user.email}`;

const orders =
JSON.parse(localStorage.getItem(orderKey)) || [];

  const order = orders.find(
    (o) => o.id === id
  );

  if (!order) {
    return (
      <div className="order-not-found">
        <h2>Order not found</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const steps = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const currentStep =
    steps.indexOf(order.status);

  const totalItems =
    order.items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  return (
    <div className="order-details-page">
      <div className="details-header">
        <p className="details-tag">
          Private Order Record
        </p>

        <h1>Order Details</h1>
      </div>

      <div className="details-card">

        {/* ORDER INFORMATION */}
        <div className="details-info">

          <div>
            <span>Order ID</span>

           <p># {order.orderNumber}</p>
          </div>

          <div>
            <span>Date</span>

            <p>{order.date}</p>
          </div>

          <div>
            <span>Items</span>

            <p>
              {totalItems}
            </p>
          </div>

          <div>
            <span>Payment</span>

            <p>
              {order.paymentStatus}
            </p>
          </div>
            <div>
  <span>Estimated Delivery</span>

  <p>{order.estimatedDelivery}</p>
</div>
        </div>

        {/* ORDER STATUS */}
        <div className="order-status">
          <h2>
            Order Progress
          </h2>

          <div className="order-timeline">
            {steps.map(
              (step, index) => (
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
              )
            )}
          </div>
        </div>

        {/* ORDER ITEMS */}
        <div className="details-items">
          <h2>
            Purchased Items
          </h2>

          {order.items.map(
            (item) => (
              <div
                key={item.id}
                className="details-item"
              >
                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="item-info">
                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    Quantity:
                    {" "}
                    {item.quantity}
                  </p>

                  <p>
                    Price:
                    {" "}
                    $
                    {item.price.toFixed(
                      2
                    )}
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
            )
          )}
        </div>

        {/* TOTAL */}
        <div className="details-total">
          <span>Total</span>

          <span>
            $
            {order.total.toFixed(
              2
            )}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="details-actions">
          <button
            className="back-btn"
            onClick={() =>
              navigate("/orders")
            }
          >
            Back to Orders
          </button>

          <button
            className="continue-btn"
            onClick={() =>
              navigate("/product")
            }
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}

export default OrderDetails;