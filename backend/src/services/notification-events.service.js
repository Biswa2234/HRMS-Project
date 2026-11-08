import { kafkaProducer } from "../config/kafka.js";

let producerConnection;

const getProducer = async () => {
  if (!producerConnection) {
    producerConnection = kafkaProducer.connect().catch((error) => {
      producerConnection = undefined;
      throw error;
    });
  }

  await producerConnection;
  return kafkaProducer;
};

export const publishNotificationEvent = async (event) => {
  const producer = await getProducer();

  await producer.send({
    topic: "hrms.notifications",
    messages: [
      {
        key: `${event.type}:${event.entityId ?? event.userId}`,
        value: JSON.stringify({
          ...event,
          eventId: crypto.randomUUID(),
          occurredAt: new Date().toISOString(),
        }),
      },
    ],
  });
};