export default function TaskForm({ title, setTitle, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter a task..."
        aria-label="Task title"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
