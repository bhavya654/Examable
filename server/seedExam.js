import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/Question.js";
import Exam from "./models/Exam.js";
import User from "./models/User.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB for seeding...");

    // Get admin user
    const admin = await User.findOne({ email: "admine@gmail.com" });
    if (!admin) {
      console.log("❌ Admin user not found");
      process.exit(1);
    }

    // Create sample questions
    const questions = [
      {
        text: "What is the capital of France?",
        subject: "Geography",
        difficulty: "Easy",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctOption: 2, // Paris (0-indexed)
        createdBy: admin._id
      },
      {
        text: "Which planet is known as the Red Planet?",
        subject: "Science",
        difficulty: "Easy",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctOption: 1, // Mars
        createdBy: admin._id
      },
      {
        text: "What is 2 + 2 × 3?",
        subject: "Mathematics",
        difficulty: "Medium",
        options: ["8", "12", "6", "10"],
        correctOption: 0, // 8 (following order of operations)
        createdBy: admin._id
      },
      {
        text: "Who wrote 'Romeo and Juliet'?",
        subject: "Literature",
        difficulty: "Easy",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctOption: 1, // William Shakespeare
        createdBy: admin._id
      },
      {
        text: "What is the chemical symbol for water?",
        subject: "Chemistry",
        difficulty: "Easy",
        options: ["H2O", "CO2", "O2", "NaCl"],
        correctOption: 0, // H2O
        createdBy: admin._id
      }
    ];

    // Insert questions
    const insertedQuestions = await Question.insertMany(questions);
    console.log(`✅ Created ${insertedQuestions.length} questions`);

    // Create a sample exam
    const exam = await Exam.create({
      title: "General Knowledge Quiz",
      description: "A basic quiz covering various subjects",
      duration: 30, // 30 minutes
      questions: insertedQuestions.map(q => ({
        type: "MCQ",
        text: q.text,
        options: q.options,
        correctOption: q.correctOption
      })),
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      endTime: new Date(Date.now() + 25 * 60 * 60 * 1000), // Tomorrow + 1 hour
      totalMarks: insertedQuestions.length,
      createdBy: admin._id
    });

    console.log(`Created exam: "${exam.title}"`);
    console.log(`Start: ${exam.startTime.toLocaleString()}`);
    console.log(`Duration: ${exam.duration} minutes`);
    console.log(`Questions: ${exam.questions.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedData();