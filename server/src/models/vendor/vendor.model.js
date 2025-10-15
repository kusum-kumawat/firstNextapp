import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const vendorSchema = new Schema(
  {
    contactInfo: { type: Schema.Types.ObjectId, ref: "ContactInfo", required: true },
    bankDetails: { type: Schema.Types.ObjectId, ref: "BankDetails", required: true },
    status: { type: String, enum: ["pending","approved","rejected"], default: "pending" },
  },
  { timestamps: true }
);

// vendorSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

vendorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

vendorSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
vendorSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Vendor = model("Vendor", vendorSchema);
