import mongoose, { Connection } from "mongoose";

let cache = (global as any).mongoose;
const mongoURI = process.env.MONGO_URI ?? "";

if (!cache)
  cache = (global as any).mongoose = { promise: null, connection: null };

async function connect() {
  mongoose.set("strictQuery", false);
  if (!mongoURI) return "NO URI PROVIDED";
  if (cache.connection) return cache.connection as Connection;

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(mongoURI)
      .then((mongooseConnection) => mongooseConnection);
  }

  try {
    cache.connection = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.connection as Connection;
}

export default connect;
