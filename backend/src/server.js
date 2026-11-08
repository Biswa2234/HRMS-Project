import { createServer } from "node:http";
import app from "./app.js";
import env from "../config/env.js";
import { initializeSocket } from "../sockets/chat.socket.js";
import { startNotificationConsumer } from "../kafka/consumers/notification.consumer.js";

const httpServer = createServer(app);

initializeSocket(httpServer);

startNotificationConsumer().catch((error) => {
  console.error("❌ Error starting notification consumer:", error);
});

httpServer.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});

httpServer.on("error", (error) => {
  console.error("❌ Server error:", error);
});

httpServer.on("close", () => {
  console.log("⚠️ Server closed");
});