import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: false,
});
//http://localhost:5000

//import.meta.env.VITE_SERVER_URL