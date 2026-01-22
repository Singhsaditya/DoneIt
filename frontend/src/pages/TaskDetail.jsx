import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchTaskById, deleteTask } from "../api/taskApi";
import { useAuthStore } from "../stores/authStore";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaskById(id)
      .then(setTask)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    await deleteTask(id);
    navigate("/tasks");
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!task) return <p className="p-6">Task not found</p>;

  return (
    <div className="p-6 max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">{task.title}</h1>

      <p className="text-muted-foreground">{task.description}</p>

      <p>
        <strong>Assigned to:</strong>{" "}
        {task.assignedTo?.name || "Unassigned"}
      </p>

      <p>
        <strong>Status:</strong> {task.status}
      </p>

      {/* ACTIONS */}
      {(user.role === "admin" || user.role === "manager") && (
        <div className="flex gap-3 pt-4">
          <Link
            to={`/tasks/${id}/edit`}
            className="px-4 py-2 rounded-xl border"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
