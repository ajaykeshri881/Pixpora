import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  immediate: true,
  onOfflineReady() {
    console.log("PWA ready to work offline");
  },
  onNeedRefresh() {
    console.log("New version available");
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer position="bottom-right" theme="dark" autoClose={2000} />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
