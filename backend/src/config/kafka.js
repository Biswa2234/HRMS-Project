import { Kafka } from "kafkajs";
import env from "./env.js";

const brokers = env.KAFKA_BROKERS
  .split(",")
  .map((broker) => broker.trim())
  .filter(Boolean);

const kafka = new Kafka({
  clientId: "hrms-backend",
  brokers,
});

export const kafkaProducer = kafka.producer();

export const kafkaConsumer = kafka.consumer({
  groupId: "hrms-notification-consumer",
});

export default kafka;