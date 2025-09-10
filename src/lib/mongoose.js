import mongoose from "mongoose";

let cached = global.__mongooseConnection;

if (!cached) {
  cached = global.__mongooseConnection = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness_tracker';
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (!cached.promise) {
    const connectOptions = {};
    if (process.env.MONGODB_DB) {
      connectOptions.dbName = process.env.MONGODB_DB;
    }
    cached.promise = mongoose.connect(mongoUri, connectOptions).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}



