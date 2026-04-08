import mongoose from "mongoose";
import dotenv from "dotenv";
import Exam from "./models/Exam.js";
import User from "./models/User.js"; // Import User model

dotenv.config();

const showExam = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const exams = await Exam.find().populate('createdBy', 'name email');
    console.log("Exams in database:");
    exams.forEach((exam, index) => {
      console.log(`\n${index + 1}. ${exam.title}`);
      console.log(`Description: ${exam.description}`);
      console.log(`Duration: ${exam.duration} minutes`);
      console.log(`Start: ${exam.startTime.toLocaleString()}`);
      console.log(`End: ${exam.endTime.toLocaleString()}`);
      console.log(`Questions: ${exam.questions.length}`);
      console.log(`Created by: ${exam.createdBy.name} (${exam.createdBy.email})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

showExam();