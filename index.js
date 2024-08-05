import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
});

app.use("/", blogRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
