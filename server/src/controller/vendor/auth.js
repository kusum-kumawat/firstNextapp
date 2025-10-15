import { asyncHandler } from "../../utils/asyncHandler.js";
import ContactInfo from "../../models/vendor/contactInfo.model.js";
import BankDetails from "../../models/vendor/bankDetails.model.js";
import {
  isInArray,
  isNonEmptyString,
  isValidEmail,
  isValidIndianPhone,
} from "../../helper/validater.js";
import { Vendor } from "../../models/vendor/vendor.model.js";

export const VendorSignup = asyncHandler(async (req, res) => {
  const { contactInfo, bankDetails } = req.body;
  console.log(contactInfo, bankDetails);
  const errors = [];

  // --- Validate contactInfo ---
  if (!contactInfo) errors.push({ field: "contactInfo", message: "Required" });
  else {
    if (!isNonEmptyString(contactInfo.firstName))
      errors.push({ field: "contactInfo.firstName", message: "Required" });
    if (!isNonEmptyString(contactInfo.lastName))
      errors.push({ field: "contactInfo.lastName", message: "Required" });
    if (!isValidEmail(contactInfo.email))
      errors.push({ field: "contactInfo.email", message: "Invalid email" });
    if (!isValidIndianPhone(contactInfo.phone))
      errors.push({ field: "contactInfo.phone", message: "Invalid phone" });
    if (!isNonEmptyString(contactInfo.address))
      errors.push({ field: "contactInfo.address", message: "Required" });
    if (!isNonEmptyString(contactInfo.city))
      errors.push({ field: "contactInfo.city", message: "Required" });
    if (!isNonEmptyString(contactInfo.state))
      errors.push({ field: "contactInfo.state", message: "Required" });
    if (!isNonEmptyString(contactInfo.zipCode))
      errors.push({ field: "contactInfo.zipCode", message: "Required" });
  }

  // --- Validate bankDetails ---
  if (!bankDetails) errors.push({ field: "bankDetails", message: "Required" });
  else {
    if (!isNonEmptyString(bankDetails.accountHolderName))
      errors.push({
        field: "bankDetails.accountHolderName",
        message: "Required",
      });
    if (!isNonEmptyString(bankDetails.accountNumber))
      errors.push({ field: "bankDetails.accountNumber", message: "Required" });
    if (!isNonEmptyString(bankDetails.bankName))
      errors.push({ field: "bankDetails.bankName", message: "Required" });
    if (!isNonEmptyString(bankDetails.routingNumber))
      errors.push({ field: "bankDetails.routingNumber", message: "Required" });
    if (!isNonEmptyString(bankDetails.currency))
      errors.push({ field: "bankDetails.currency", message: "Required" });
    if (!isInArray(bankDetails.accountType, ["checking", "savings"]))
      errors.push({ field: "bankDetails.accountType", message: "Invalid" });
  }

  if (errors.length > 0) return res.status(400).json({ errors });

  // --- Save ContactInfo ---
  const contactDoc = new ContactInfo(contactInfo);
  await contactDoc.save();

  // --- Save BankDetails ---
  const bankDoc = new BankDetails(bankDetails);
  await bankDoc.save();

  // --- Save Vendor ---
    const vendor = new Vendor({
      contactInfo: contactDoc._id,
      bankDetails: bankDoc._id,
    });
    await vendor.save();

  return res
    .status(201)
    .json({ message: "Vendor registered successfully", vendor });
});
