export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <label className={task.completed ? "done" : ""}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        {task.title}
      </label>
      <button className="delete" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </li>
  );
}
