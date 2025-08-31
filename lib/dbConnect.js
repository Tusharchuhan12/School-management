import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; // .env.local me rakho

if (!MONGODB_URI) {
    throw new Error("⚠️ Please define the MONGODB_URI in .env.local");
}

let isConnected = null; // track connection

export async function dbConnect() {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = db.connections[0].readyState;
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
    }
}
