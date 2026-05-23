// main.jsx OR index.jsx

import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// App Component
import App from "./App";

// Redux Provider
import { Provider } from "react-redux";

// Redux Store
import { store } from "./store";

// Global CSS
import "./index.css";

// Render React App
ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);