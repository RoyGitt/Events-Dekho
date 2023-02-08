import { MongoClient } from "mongodb";
import { mongodbUsername } from "./config";
import { mongodbPassword } from "./config";

export const establishConnection = async (databaseName) => {
  const client = await MongoClient.connect(
    `mongodb+srv://${mongodbUsername}:${mongodbPassword}@cluster0.ddguuvq.mongodb.net/${databaseName}?retryWrites=true&w=majority`
  );

  return client;
};

export const insertDocument = async (client, collection, data) => {
  const db = client.db();

  await db.collection(collection).insertOne(data);
};

export const getAllDocuments = async (collection, client, filter) => {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort({ id: -1 })
    .toArray();

  return documents;
};
