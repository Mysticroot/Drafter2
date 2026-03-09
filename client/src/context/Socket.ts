import { io } from "socket.io-client";

function resolveServerUrl() {
  const envUrl = import.meta.env.VITE_SERVER_URL?.trim();
  if (envUrl) return envUrl;

  if (typeof window === "undefined") {
    return "http://localhost:5000";
  }

  const { protocol, host, hostname, port } = window.location;

  // Dev Tunnels pattern: <id>-5173.<region>.devtunnels.ms -> <id>-5000.<region>.devtunnels.ms
  if (host.includes("-5173.") && host.includes("devtunnels.ms")) {
    return `${protocol}//${host.replace("-5173.", "-5000.")}`;
  }

  // Local/LAN dev fallback.
  if (port === "5173") {
    return `${protocol}//${hostname}:5000`;
  }

  return `${protocol}//${host}`;
}

export const socket = io(resolveServerUrl(), {
  transports: ["websocket", "polling"],
  autoConnect: false,
  withCredentials: false,
});