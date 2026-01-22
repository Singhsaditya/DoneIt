import { useEffect, useState } from "react";
import { fetchTasks } from "../api/taskApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function TaskList() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading tasks...</p>;

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks</h1>

        {(user.role === "admin" || user.role === "manager") && (
          <button
            onClick={() => navigate("/tasks/new")}
            className="bg-primary text-white px-4 py-2 rounded-xl"
          >
            + Create Task
          </button>
        )}
      </div>

      {/* EMPTY STATE */}
      {!tasks.length && (
        <p className="text-muted-foreground">No tasks found</p>
      )}

      {/* TASK LIST */}
      {tasks.map((task) => (
        <Link
          key={task._id}
          to={`/tasks/${task._id}`}
          className="block p-4 rounded-xl border hover:bg-muted"
        >
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-muted-foreground">
            {task.assignedTo?.name || "Unassigned"}
          </p>
        </Link>
      ))}
    </div>
  );
}
