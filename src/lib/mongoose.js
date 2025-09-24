import mongoose from "mongoose";

let cached = global.__mongooseConnection;

if (!cached) {
  cached = global.__mongooseConnection = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://vinayp9399:mechanic%4093@vinaycluster.03uocxi.mongodb.net/fitnessapp?retryWrites=true&w=majority&appName=VinayCluster';
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



