import {
  useReducer,
  useEffect,
  useContext,
} from "react";
import { WishlistContext } from "./WishlistContext";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

function wishlistReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return action.payload;

    case "ADD":
      return [...state, action.payload];

    case "REMOVE":
      return state.filter(
        (item) => item.id !== action.payload
      );

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [wishlist, dispatch] = useReducer(
    wishlistReducer,
    []
  );

  useEffect(() => {
    if (!user) {
      dispatch({
        type: "CLEAR",
      });
      return;
    }

    const savedWishlist =
      JSON.parse(
        localStorage.getItem(
          `wishlist_${user.email}`
        )
      ) || [];

    dispatch({
      type: "LOAD",
      payload: savedWishlist,
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem(
      `wishlist_${user.email}`,
      JSON.stringify(wishlist)
    );
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    if (!user) {
      toast.error(
        "Please login to use your wishlist."
      );
      return false;
    }

    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    if (exists) {
      toast.info("Already in wishlist.");
      return false;
    }

    dispatch({
      type: "ADD",
      payload: product,
    });

    toast.success("Added to wishlist.");

    return true;
  };

  const removeFromWishlist = (id) => {
    if (!user) {
      toast.error(
        "Please login to use your wishlist."
      );
      return;
    }

    dispatch({
      type: "REMOVE",
      payload: id,
    });


  };

  const toggleWishlist = (product) => {
    if (!user) {
      toast.error(
        "Please login to use your wishlist."
      );
      return;
    }

    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;