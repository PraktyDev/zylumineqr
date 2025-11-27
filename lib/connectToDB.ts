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