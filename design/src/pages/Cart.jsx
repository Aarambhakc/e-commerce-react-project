
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    removeItem,
    clearCart,
  } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <p className="cart-tag">
          Shopping Bag
        </p>

        <h1>Your Cart</h1>

        <p>
          Your shopping bag is currently empty.
        </p>

        <Link
          to="/product"
          className="continue-btn"
        >
          Discover Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <p className="cart-tag">
          Shopping Bag
        </p>

        <h1>Your Cart</h1>
      </div>

      <div className="cart-container">

        <div className="cart-items">

          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="cart-item"
            >
              <img
                src={item.image}
                alt={item.title}
              />

              <div className="item-info">

                <h3>{item.title}</h3>

                <p>
                  <strong>Size:</strong>{" "}
                  {item.size}
                </p>

                <p>
                  <strong>Color:</strong>{" "}
                  {item.color}
                </p>

                

                <p>Price:${item.price.toFixed(2)}
                </p>

                <div className="quantity-box">

                 

                  <span>
                    <p>
                    Quantity: {item.quantity}
                    </p>
                  </span>

                 

                </div>

              </div>

              <div className="item-actions">

                <p className="subtotal">
                  $
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </p>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(
                      item.id,
                      item.size
                    )
                  }
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>

        <div className="cart-summary">

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

          <Link to="/checkout">
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </Link>

          <button
            className="clear-btn"
            onClick={() => {
              clearCart();
              toast.info(
                "Cart cleared"
              );
            }}
          >
            Clear Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;