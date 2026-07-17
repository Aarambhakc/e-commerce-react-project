
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CartProvider from "./context/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthProvider";
import WishlistProvider from "./context/WishlistProvider";
import ThemeProvider from "./context/ThemeProvider";
import "./App.css";
import RecentlyViewedProvider from "./context/RecentlyViewedProvider";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

  <ThemeProvider> 
  <AuthProvider>
  <WishlistProvider>
  <CartProvider>
    <RecentlyViewedProvider>
    <App />
    </RecentlyViewedProvider>
  <ToastContainer 
    position="top-right"
    autoClose={2000}
    />
    </CartProvider>
  </WishlistProvider>
  </AuthProvider>
  </ThemeProvider>
  </BrowserRouter>
);