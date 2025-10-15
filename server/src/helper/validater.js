export const isNonEmptyString = (v) => typeof v === "string" && v.trim() !== "";
export const isInArray = (v, arr) => arr.includes(v);
export const isNumber = (v) => typeof v === "number" && !isNaN(v);
export const isValidURL = (v) => {
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
};
export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isValidIndianPhone = (v) => /^[6-9]\d{9}$/.test(v.toString());
