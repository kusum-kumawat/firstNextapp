import { Schema, model } from "mongoose";

const bankDetailsSchema = new Schema({
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  bankName: { type: String, required: true },
  routingNumber: { type: String, required: true },
  currency: { type: String, required: true },
  accountType: {
    type: String,
    enum: ["checking", "savings"],
    required: true,
  },
});

export default model("VendorBankDetail", bankDetailsSchema);
