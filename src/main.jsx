import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "./styles/index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <App />
      <ToastContainer
        position="top-right"
        theme="colored"
        closeOnClick
        autoClose={6000}
        draggable="touch"
      />
    </BrowserRouter>
  </StrictMode>
);
