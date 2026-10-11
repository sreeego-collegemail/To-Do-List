import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API = "http://localhost:5000/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  // Fetch tasks when the page loads
  useEffect(() => {
    fetch(API)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then(setTasks)
      .catch(() => setError("Cannot connect to backend."));
  }, []);

  // Add a task
  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not add task");

      setTasks(prev => [data, ...prev]);
      setTitle("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  // Mark a task complete or incomplete
  async function toggleTask(task) {
    try {
      const res = await fetch(`${API}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not update task");

      setTasks(prev => prev.map(t => t._id === task._id ? data : t));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete a task
  async function deleteTask(id) {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not delete task");

      setTasks(prev => prev.filter(t => t._id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container">
      <h1>My To-Do List</h1>
      <p className="subtitle">Organise your day, one task at a time.</p>

      <TaskForm title={title} setTitle={setTitle} onSubmit={addTask} />

      {error && <p className="error">{error}</p>}

      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />

      <footer>{tasks.filter(t => !t.completed).length} tasks remaining</footer>
    </main>
  );
}
