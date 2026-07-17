import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Checkout.css";
import { AuthContext } from "../context/AuthContext";

const generateOrderNumber = () => {
  return (
    "SS-" +
    crypto.randomUUID()
    .slice(0, 8)
    .toUpperCase()
  );
};

const generateDeliveryDate = () => {
  const delivery = new Date();
  
  delivery.setDate(
    delivery.getDate() + 5
  );
  
  return delivery.toLocaleDateString();
};

function Checkout() {
  const { cartItems, clearCart } =
  useContext(CartContext);
  
  const{user} = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [customer, setCustomer] =
    useState({
      name: "",
      address: "",
      city: "",
      payment: "Cash on Delivery",
    });

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]:
        e.target.value,
    });
  };

  const handlePlaceOrder = () => {
   if (!user) {
  toast.error("Please login first.");
  navigate("/auth");
  return;
}

if (
      !customer.name.trim() ||
      !customer.address.trim() ||
      !customer.city.trim()
    ) {
      toast.error(
        "Please fill all shipping details."
      );
      return;
    }

    setLoading(true);

    const orderKey = `orders_${user.email}`;

const previousOrders =
JSON.parse(localStorage.getItem(orderKey)) || [];

    const orderNumber =
      generateOrderNumber();

    const estimatedDelivery =
      generateDeliveryDate();

    const newOrder = {
      id: crypto.randomUUID(),
      orderNumber,
      items: cartItems.map((item) => ({
        ...item,
      })),
      total,
      date:
        new Date().toLocaleString(),
      status: "Order Placed",
      paymentStatus: "Unpaid",
      customer,
      estimatedDelivery,
    };

   localStorage.setItem(
orderKey,
JSON.stringify([
...previousOrders,
newOrder,
])
);

    toast.success(
      `Order #${orderNumber} placed successfully!`
    );

    setTimeout(() => {
      const orders =
JSON.parse(
localStorage.getItem(orderKey)
) || [];

      const updated =
        orders.map((order) =>
          order.id === newOrder.id
            ? {
                ...order,
                status:
                  "Delivered",
                paymentStatus:
                  order.customer
                    .payment ===
                  "Cash on Delivery"
                    ? "Paid"
                    : order.paymentStatus,
              }
            : order
        );

      localStorage.setItem(
orderKey,
JSON.stringify(updated)
);

      toast.info(
        `Order #${orderNumber} has been delivered 🎉`
      );
    }, 5000);

    clearCart();

    setCustomer({
      name: "",
      address: "",
      city: "",
      payment:
        "Cash on Delivery",
    });

    setLoading(false);

    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>
          Your cart is empty.
        </h2>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <p className="checkout-tag">
          Secure Checkout
        </p>

        <h1>
          Review Your Order
        </h1>
      </div>

      <div className="checkout-container">
        <div className="checkout-items">
          <div className="checkout-form">
            <h2>
              Shipping Information
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customer.name}
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={customer.city}
              onChange={
                handleChange
              }
            />

            <select
              name="payment"
              value={
                customer.payment
              }
              onChange={
                handleChange
              }
            >
              <option>
                Cash on Delivery
              </option>

              <option>
                Credit Card
              </option>

              <option>
                Debit Card
              </option>

              <option>
                eSewa
              </option>

              <option>
                Khalti
              </option>
            </select>
          </div>

          <h2>
            Order Items
          </h2>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="checkout-item"
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
                  Quantity:{" "}
                  {item.quantity}
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

        <div className="checkout-summary">
          <h2>
            Order Summary
          </h2>

          <div className="summary-row">
            <span>
              Subtotal
            </span>

            <span>
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="summary-row">
            <span>
              Shipping
            </span>

            <span>
              Free
            </span>
          </div>

          <div className="summary-total">
            <span>
              Total
            </span>

            <span>
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            className="place-order-btn"
            onClick={
              handlePlaceOrder
            }
            disabled={loading}
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;