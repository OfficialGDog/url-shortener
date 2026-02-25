import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let db: MongoMemoryServer | null = null;

export async function connectTestDatabase() {
  if (db) return;

  db = await MongoMemoryServer.create();
  const uri = db.getUri();

  await mongoose.connect(uri);
}

export async function closeTestDatabase() {
  await mongoose.disconnect();

  if (db) {
    await db.stop();
    db = null;
  }
}