// // lib/db.ts
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGO_URI as string;

// if (!MONGODB_URI) {
//   throw new Error("❌ Please define the MONGODB_URI environment variable");
// }



// let cached: MongooseConnection = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export async function connectDB() {
//   if (cached.conn) {
//     return cached.conn; // Return existing connection
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         bufferCommands: false,
//         serverSelectionTimeoutMS: 5000,
//       })
//       .then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }


import mongoose from "mongoose";

export const ConnectToDB = async (): Promise<void> => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Connected already to the database");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting to database...");
    return;
  }

  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(uri, {
      dbName: "Zylumineqr",
      bufferCommands: true,
    });

    console.log("Connected to the database");
  } catch (error) {
    console.log("Error: ", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};