import { Link } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";

import "./Productcard.css";
import "./Rating.css";

import Rating from "./Rating";

import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

function Productcard({ product }) {
  const { wishlist, toggleWishlist } =
    useContext(WishlistContext);

  const { user } =
    useContext(AuthContext);

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error(
        "Please login to use your wishlist."
      );
      return;
    }

    toggleWishlist(product);
  };

  return (
    <div className="product-card">

      <button
        className="wishlist-btn"
        type="button"
        onClick={handleWishlist}
      >
        {isWishlisted ? "♥" : "♡"}
      </button>

      <div className="product-image">
        <img
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="product-content">
        <h3>{product.title}</h3>

        <Rating
          rate={product.rating?.rate || product.rating || 4.5}
          count={product.rating?.count || product.reviews || 120}
        />

        <p className="product-price">
          ${product.price}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="details-btn"
        >
          Discover
        </Link>
      </div>

    </div>
  );
}

export default Productcard;