import {
  useReducer,
  useEffect,
  useContext,
} from "react";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";

function cartReducer(state, action) {
  switch (action.type) {
    case "LOAD_CART":
      return action.payload;

    case "ADD_ITEM":
      return [...state, action.payload];

    case "REMOVE_ITEM":
      return state.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.size === action.payload.size
          )
      );

    case "INCREASE":
      return state.map((item) =>
        item.id === action.payload.id &&
        item.size === action.payload.size
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

    case "DECREASE":
      return state.map((item) =>
        item.id === action.payload.id &&
        item.size === action.payload.size
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity - 1
              ),
            }
          : item
      );

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

function CartProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [cartItems, dispatch] = useReducer(
    cartReducer,
    []
  );

  useEffect(() => {
    if (!user) {
      dispatch({
        type: "LOAD_CART",
        payload: [],
      });
      return;
    }

    const savedCart =
      JSON.parse(
        localStorage.getItem(
          `cart_${user.email}`
        )
      ) || [];

    dispatch({
      type: "LOAD_CART",
      payload: savedCart,
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem(
      `cart_${user.email}`,
      JSON.stringify(cartItems)
    );
  }, [cartItems, user]);

  const addToCart = (
    product,
    size,
    quantity
  ) => {
    // LOGIN REQUIRED
    if (!user) {
      toast.error(
        "Please login to add items to your cart."
      );
      return false;
    }

    // SIZE REQUIRED
    if (!size || size.trim() === "") {
      toast.error("Please select a size.");
      return false;
    }

    // QUANTITY REQUIRED
    if (!quantity || quantity < 1) {
      toast.error("Please select a quantity.");
      return false;
    }

    const exists = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.size === size
    );

    if (exists) {
      toast.info(
        "Item already exists in cart."
      );
      return false;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        ...product,
        size,
        quantity,
      },
    });

    return true;
  };

  const removeItem = (
    id,
    size
  ) => {
    if (!user) return;

    dispatch({
      type: "REMOVE_ITEM",
      payload: { id, size },
    });

    toast.info("Item removed.");
  };

  const increaseQuantity = (
    id,
    size
  ) => {
    if (!user) return;

    dispatch({
      type: "INCREASE",
      payload: { id, size },
    });
  };

  const decreaseQuantity = (
    id,
    size
  ) => {
    if (!user) return;

    dispatch({
      type: "DECREASE",
      payload: { id, size },
    });
  };

  const clearCart = () => {
    if (!user) return;

    dispatch({
      type: "CLEAR",
    });

    toast.info("Cart cleared.");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;