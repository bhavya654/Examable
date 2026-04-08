import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Question from "./models/Question.js";
import Exam from "./models/Exam.js";
import Result from "./models/Result.js";

dotenv.config();

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB\n");

    const userCount = await User.countDocuments();
    const questionCount = await Question.countDocuments();
    const examCount = await Exam.countDocuments();
    const resultCount = await Result.countDocuments();

    console.log("Database Summary:");
    console.log(`  Users: ${userCount}`);
    console.log(`  Questions: ${questionCount}`);
    console.log(`  Exams: ${examCount}`);
    console.log(`  Results: ${resultCount}`);

    if (userCount === 0) {
      console.log("\nRunning seedAdmin.js to create admin user...");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

checkData();