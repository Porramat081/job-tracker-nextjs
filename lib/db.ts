import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDb(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env",
    );
  }
  // Already connected: reuse it
  if (cached.conn) return cached.conn;

  // Not connecting yet: start a connection and share the promise
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset so the next call can retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export async function disconnectDb(): Promise<void> {
  if (!cached.conn) return;

  await mongoose.disconnect();
  cached.conn = null;
  cached.promise = null;
}
