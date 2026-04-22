import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn('MONGODB_URI not defined in environment variables');
}

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseGlobal: GlobalMongoose | undefined;
}

const cached: GlobalMongoose = global.mongooseGlobal ?? { conn: null, promise: null };
global.mongooseGlobal = cached;

async function connectMongoDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongoDB;
