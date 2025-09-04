import React from "react";
import ReactDOM from "react-dom";  // React 17 me yahi import hota hai
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CartProvider } from "./context/CartContext";

ReactDOM.render(
  <CartProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CartProvider>,
  document.getElementById("root")   // <-- yeh last me alag likhna hai
);
