import mongoose, { Connection } from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

const uri = process.env.MONGODB_URI;

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = new Promise<Connection>((resolve, reject) => {
      mongoose
        .connect(uri!, opts)
        .then(() => {
          cached.conn = mongoose.connection;
          resolve(cached.conn);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  try {
    await cached.promise;
    return cached.conn!;
  } catch (e) {
    cached.promise = null;
    throw new Error(
      'MongoDB connection error: ' +
        (e instanceof Error ? e.message : 'Unknown error occurred')
    );
  }
}

export default connectDb;
