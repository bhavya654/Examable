import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("📡 Connected to MongoDB for seeding...");

        const email = "admin@gmail.com";
        const password = "123456";

        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            console.log("⚠️ Admin user already exists.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: "System Admin",
            email: email,
            password: hashedPassword,
            role: "admin",
            accessibilityPreferences: {
                highContrast: false,
                largeFont: false,
                voiceAssist: true,
                screenReaderOptimized: true
            }
        });

        console.log("✅ Admin user created successfully!");
        console.log(`📧 Email: ${email}`);
        console.log(`🔑 Password: ${password}`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error.message);
        process.exit(1);
    }
};

seedAdmin();
