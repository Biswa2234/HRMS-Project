import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  auth: (callback) => {
    callback({
      token: localStorage.getItem("accessToken"),
    });
  },
});