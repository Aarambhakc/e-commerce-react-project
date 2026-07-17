import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
} from "../services/productService";
import { CartContext } from "../context/CartContext";
import { RecentlyViewedContext } from "../context/RecentlyViewedContext";
import { toast } from "react-toastify";

import Rating from "../components/Rating";
import RelatedProducts from "../components/RelatedProducts";
import ProductReviews from "../components/ProductReviews";
import RecentlyViewed from "./RecentlyViewed";

import "./ProductDetails.css";

function Productdetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  const { addToCart } = useContext(CartContext);
  const { addToRecent } = useContext(
    RecentlyViewedContext
  );

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);

        setProduct(data);

        // No default size selected
        setSelectedSize("");

        addToRecent(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [id, addToRecent]);

  if (!product) {
    return (
      <div className="loading-container">
        <h2>Loading Product...</h2>
      </div>
    );
  }

  const handleAddToCart = async () => {
  if (product.stock === 0) {
    toast.error("Out of stock.");
    return;
  }

  if (!selectedSize) {
    toast.error("Please select a size.");
    return;
  }

  if (quantity < 1) {
    toast.error("Please select a quantity.");
    return;
  }

  if (quantity > product.stock) {
    toast.error(
      `Only ${product.stock} item(s) available.`
    );
    return;
  }

  // Try adding to cart FIRST
  const added = addToCart(
    product,
    selectedSize,
    quantity
  );

  // Stop if it wasn't added (duplicate, invalid, etc.)
  if (!added) return;

  const updatedProduct = {
    ...product,
    stock: product.stock - quantity,
  };

  try {
    await updateProduct(
      product.id,
      updatedProduct
    );

    setProduct(updatedProduct);

    toast.success(
      `${quantity} ${
        quantity === 1 ? "item" : "items"
      } added to cart`
    );

    // Reset selection
    setSelectedSize("");
    setQuantity(0);

  } catch (error) {
    console.error(error);

    toast.error(
      "Unable to update product stock."
    );
  }
};

  return (
    <>
      <div className="product-details-page">
        <p className="breadcrumb">
          Home / Products / {product.category}
        </p>

        <div className="product-details-container">
          <div className="product-image-section">
            <img
              src={product.image}
              alt={product.title}
            />
          </div>

          <div className="product-info-section">
            <p className="product-category">
              {product.category}
            </p>

            <h1>{product.title}</h1>

            <Rating
              rate={product.rating}
              count={product.reviews}
            />

            <p className="product-description">
              {product.description}
            </p>

            <h2 className="product-price">
              ${product.price}
            </h2>

            <div className="product-store-info">
              <p>
                <strong>Color:</strong>{" "}
                {product.color}
              </p>

              <p>
                <strong>Stock:</strong>{" "}
                {product.stock > 0
                  ? `${product.stock} Available`
                  : "Out of Stock"}
              </p>

              <p>
                <strong>Quality:</strong>{" "}
                Premium Italian Craftsmanship
              </p>
            </div>

            <div className="size-section">
              <h3>Select Size</h3>

              <div className="size-buttons">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={
                      selectedSize === size
                        ? "size-btn active"
                        : "size-btn"
                    }
                    onClick={() =>
                      setSelectedSize(size)
                    }
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-section">
              <h3>Quantity</h3>

              <div className="quantity-box">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.max(0, q - 1)
                    )
                  }
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.min(
                        product.stock,
                        q + 1
                      )
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-meta">
              <p>✓ Free Shipping Worldwide</p>
              <p>✓ Premium Packaging</p>
              <p>✓ Secure Checkout</p>
              <p>✓ Easy Returns</p>
            </div>

            <button
              className="cart-btn"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              {product.stock > 0
                ? "Add To Cart"
                : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>

      <RecentlyViewed />

      <RelatedProducts
        category={product.category}
        currentId={product.id}
      />

      <ProductReviews
        productId={product.id}
      />
    </>
  );
}

export default Productdetails;