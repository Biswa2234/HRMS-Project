import { kafkaConsumer } from "../../config/kafka.js";
import { createUserNotification } from "../../services/notification.service.js";
import { emitToUser } from "../../sockets/index.js";

let consumerStarted = false;

const serializeNotification = (notification) => ({
  ...notification,
  id: String(notification.id),
  userId: String(notification.userId),
  entityId:
    notification.entityId === null ||
    notification.entityId === undefined
      ? null
      : String(notification.entityId),
  createdAt: notification.createdAt?.toISOString?.()
    ?? notification.createdAt,
  updatedAt: notification.updatedAt?.toISOString?.()
    ?? notification.updatedAt,
});

export const startNotificationConsumer = async () => {
  if (consumerStarted) return;

  await kafkaConsumer.connect();

  await kafkaConsumer.subscribe({
    topic: "hrms.notifications",
    fromBeginning: false,
  });

  await kafkaConsumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const event = JSON.parse(message.value.toString());

      if (!event.userId || !event.title || !event.message || !event.type) {
        console.error("Invalid notification event received");
        return;
      }

      const notification = await createUserNotification({
        userId: event.userId,
        title: event.title,
        message: event.message,
        type: event.type,
        entityType: event.entityType,
        entityId: event.entityId,
      });

      emitToUser(
        event.userId,
        "notification:new",
        serializeNotification(notification),
      );
    },
  });

  consumerStarted = true;

  console.log("✅ Notification Kafka consumer started");
};