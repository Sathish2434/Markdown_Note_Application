import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import NavigationBridge from "./components/ui/NavigationBridge"; // adjust path
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavigationBridge>
        <App />
      </NavigationBridge>
    </BrowserRouter>
  </React.StrictMode>
);
