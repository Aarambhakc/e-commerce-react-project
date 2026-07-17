import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import "./Profile.css";

function Profile() {
  const { user } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const { cartItems } = useContext(CartContext);

  if (!user) {
    return (
      <div className="profile-page">
        <h2>Please login first.</h2>
      </div>
    );
  }

  const email = user?.email || "";
  const name =
    user?.name ||
    (email ? email.split("@")[0] : "User");

  const orderKey = `orders_${email}`;

  const orders =
    JSON.parse(localStorage.getItem(orderKey)) || [];

  const totalSpent = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <div className="profile-page">
      <div className="profile-header">
        <p className="profile-tag">
          Private Client Area
        </p>

        <h1>My Profile</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          <div className="profile-item">
            <span>Name</span>
            <p>{name}</p>
          </div>

          <div className="profile-item">
            <span>Email Address</span>
            <p>{email || "Not Available"}</p>
          </div>

          <div className="profile-item">
            <span>Membership</span>
            <p>Private Client</p>
          </div>

          <div className="profile-item">
            <span>Status</span>
            <p className="status">Active</p>
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <h3>{orders.length}</h3>
          <p>Orders</p>
        </div>

        <div className="stat-card">
          <h3>{wishlist.length}</h3>
          <p>Wishlist</p>
        </div>

        <div className="stat-card">
          <h3>{cartItems.length}</h3>
          <p>Cart Items</p>
        </div>

        <div className="stat-card">
          <h3>${totalSpent.toFixed(2)}</h3>
          <p>Total Spent</p>
        </div>
      </div>

      <div className="profile-actions">
        <button>Account Settings</button>

        <button
          onClick={() =>
            (window.location.href = "/orders")
          }
        >
          View Orders
        </button>
      </div>
    </div>
  );
}

export default Profile;