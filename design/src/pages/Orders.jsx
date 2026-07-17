import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Orders.css";

function Orders() {
  const navigate = useNavigate(); 
  const { user } = useContext(AuthContext);
  if (!user) {
  return (
    <div className="empty-orders">
      <h2>Please login first</h2>
    </div>
  );
}

const orderKey = `orders_${user.email}`;

const orders =
JSON.parse(
localStorage.getItem(orderKey)
) || [];

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <h2>No orders yet</h2>
        <p>Go buy something first.</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      <div className="orders-list">
       {orders.map((order) => (
  <div
    key={order.id}
    className="order-card"
    onClick={() => navigate(`/orders/${order.id}`)}
  >

            <div className="order-header">
              <span>Order #{order.orderNumber}</span>

              <span className={`status ${order.status?.toLowerCase()}`}>
                {order.status || "Processing"}
              </span>

              <span>{order.date}</span>
            </div>

            <div className="order-body">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.title} />

                  <div className="order-info">
                    <p className="title">{item.title}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>

                  <div className="price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <strong>Total: ${order.total.toFixed(2)}</strong>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;