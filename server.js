// Import Express
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Simple in-memory storage for blog posts
let posts = [];

// 🏠 Serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✏️ Add a new post
app.post("/add-post", (req, res) => {
  const { title, content } = req.body;

  if (title && content) {
    posts.unshift({ title, content }); // add new posts to the top
  }

  res.redirect("/");
});

// 📜 Get all posts (for frontend)
app.get("/posts", (req, res) => {
  res.json(posts);
});

// 🌐 Dynamic PORT for Render
const PORT = process.env.PORT || 3000;

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
