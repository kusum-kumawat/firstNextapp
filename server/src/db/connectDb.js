import mongoose from "mongoose";
import { Admin } from "../models/Admin.model.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
    const admin = await Admin.findOne({ adminName: "obtAdmin" });
    if (!admin) {
      // Create new admin
      const newAdmin = await Admin.create({
        adminName: "obtAdmin",
        email: "obtAdmin@gmail.com",
        password: "obtPass@1111",
      });

      if (!newAdmin) {
        throw new Error("Failed to create admin user");
      }

      const savedAdmin = newAdmin.save();
    }
  } catch (error) {
    console.error("database connection error: ", error);
  }
};

export default connectDB;
