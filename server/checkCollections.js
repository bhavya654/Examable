import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const checkCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB");

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📋 Collections:");
    collections.forEach(col => console.log(`  - ${col.name}`));

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

checkCollections();