import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used inside SocketProvider");
  }

  console.log("useSocket hook called", context);
  return context;
}
