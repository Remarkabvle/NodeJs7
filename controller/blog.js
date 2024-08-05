import { Blogs, validateBlog } from "../modules/blogSchema.js";

class BlogController {
  async fetchAllBlogs(req, res) {
    try {
      const blogs = await Blogs.find();
      if (!blogs.length) {
        return res.status(400).json({
          msg: "No blogs found",
          variant: "error",
          payload: null,
        });
      }
      res.status(200).json({
        msg: "Retrieved all blogs",
        variant: "success",
        payload: blogs,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
        variant: "error",
        payload: null,
      });
    }
  }

  async createBlog(req, res) {
    try {
      const { error } = validateBlog(req.body);
      if (error) {
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "warning",
          payload: null,
        });
      }
      const newBlog = new Blogs(req.body);
      await newBlog.save();
      res.status(201).json({
        msg: "Blog created successfully",
        variant: "success",
        payload: newBlog,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
        variant: "error",
        payload: null,
      });
    }
  }
}

export default new BlogController();
