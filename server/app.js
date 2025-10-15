import express from "express";
import cors from "cors";
import path from "path";
const app = express();
import dotenv from "dotenv";

dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URI || "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public/uploads", express.static(path.join("public", "uploads")));
// app.use(express.static("public/uploads"));

// * --------------- Routes --------------------

import productRouter from "./src/routes/products.js";
import vendorRouter from "./src/routes/vendor/vendor.route.js";

app.use("/api/products", productRouter);
app.use("/api/vendor", vendorRouter);

//* ________________ Error Handling _______________

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, message: err.message });
});

export { app };
