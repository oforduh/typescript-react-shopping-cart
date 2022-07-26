import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ShoppingCartProvider>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </ShoppingCartProvider>
);
