import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// ...existing code...
import { SocketProvider } from "./context/SocketProvider";
// ...existing code...
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>,
);
