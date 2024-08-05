import express from "express";
import BlogController from "../controllers/blogController.js";

const router = express.Router();

router.get("/api/blogs", BlogController.fetchAllBlogs);
router.post("/api/blogs", BlogController.createBlog);

export default router;
