/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI!); 
const databaseName = "snippet_hub"; 

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
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
