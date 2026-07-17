import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import "./Wishlist.css";
import { toast } from "react-toastify";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist">

  <p className="wishlist-tag">
    Curated Selection
  </p>

  <h1>Your Wishlist</h1>

  <p>
    Save the pieces you admire and revisit
    them whenever inspiration calls.
  </p>

  <Link
    to="/product"
    className="wishlist-btn"
  >
    Explore Collection
  </Link>

</div>
    );
  }

  return (
    <div className="wishlist-page">

      <div className="wishlist-header">
        <p className="wishlist-tag">
          Curated Selection
        </p>

        <h1>Your Wishlist</h1>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="wishlist-card"
          >
            <img
              src={item.image}
              alt={item.title}
            />

            <h3>{item.title}</h3>

            <p className="wishlist-price">
              ${item.price}
            </p>

            <div className="wishlist-buttons">
              <Link
                to={`/product/${item.id}`}
                className="view-btn"
              >
                View Details
              </Link>

              <button
  className="remove-btn"
  onClick={() => {
    removeFromWishlist(item.id);
    toast.info("Removed from wishlist");
  }}
>
  Remove
</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Wishlist;