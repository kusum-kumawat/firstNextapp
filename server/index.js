import { app } from "./app.js";
import connectDB from "./src/db/connectDb.js";

const port = process.env.PORT || 2880;

try {
  await connectDB();
  console.log("MongoDB connnected successfully.");
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
} catch (error) {
  console.log("Database connection failed", error);
}
