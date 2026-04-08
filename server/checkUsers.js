import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB");

    const users = await User.find({}, { name: 1, email: 1, role: 1 });
    console.log("👥 Users in database:");
    users.forEach(user => console.log(`  - ${user.name} (${user.email}) - ${user.role}`));

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

checkUsers();