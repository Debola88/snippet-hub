/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI!); // Make sure to use your MongoDB URI
const databaseName = "snippet_hub"; // You can change this to your preferred database name

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to prevent multiple connections
  let globalClient: MongoClient | undefined = (global as any).mongoClient;
  if (!globalClient) {
    globalClient = client;
    (global as any).mongoClient = globalClient;
  }
  clientPromise = Promise.resolve(globalClient);
} else {
  clientPromise = client.connect();
}

export const getDb = async () => {
  const clientInstance = await clientPromise;
  return clientInstance.db(databaseName);
};
