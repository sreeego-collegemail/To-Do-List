require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

const Task = mongoose.model("Task", new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}));

// GET: Fetch all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    res.json(await Task.find().sort({ createdAt: -1 }));
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// POST: Create a task
app.post("/api/tasks", async (req, res) => {
  const title = String(req.body.title ?? "").trim();
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    res.status(201).json(await Task.create({ title }));
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT: Update a task
app.put("/api/tasks/:id", async (req, res) => {
  const updates = {};

  if (req.body.title !== undefined) {
    updates.title = String(req.body.title ?? "").trim();
    if (!updates.title)
      return res.status(400).json({ error: "Title is required" });
  }

  if (req.body.completed !== undefined) {
    if (typeof req.body.completed !== "boolean")
      return res.status(400).json({ error: "Invalid completed value" });
    updates.completed = req.body.completed;
  }

  if (!Object.keys(updates).length)
    return res.status(400).json({ error: "No updates provided" });

  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).json({ error: "Invalid task ID" });

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true, runValidators: true
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE: Remove a task
app.delete("/api/tasks/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).json({ error: "Invalid task ID" });

  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Start server after connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error("MongoDB connection failed:", err.message));
