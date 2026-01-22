import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, fetchTaskById, updateTask } from "../api/taskApi";
import { fetchUsers } from "../api/userApi";
import { useAuthStore } from "../stores/authStore";

export default function TaskForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const user = useAuthStore((s) => s.user);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(isEdit);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "todo",
  });

  /* ===============================
     FETCH USERS (ADMIN / MANAGER)
  ================================ */
  useEffect(() => {
    if (user.role !== "employee") {
      fetchUsers().then(setUsers);
    }
  }, [user.role]);

  /* ===============================
     FETCH TASK (EDIT MODE)
  ================================ */
  useEffect(() => {
    if (!isEdit) return;

    fetchTaskById(id)
      .then((task) => {
        setFormData({
          title: task.title || "",
          description: task.description || "",
          assignedTo: task.assignedTo?._id || "",
          status: task.status || "todo",
        });
      })
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  /* ===============================
     HANDLERS
  ================================ */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateTask(id, formData);
    } else {
      await createTask(formData);
    }

    navigate("/tasks");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  /* ===============================
     UI
  ================================ */
  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Task" : "Create Task"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task title"
          className="w-full px-4 py-3 rounded-xl border"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task description"
          className="w-full px-4 py-3 rounded-xl border"
          rows={4}
        />

        {/* STATUS */}
        {isEdit && (
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border"
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        )}

        {/* ASSIGN TO */}
        {user.role !== "employee" && (
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border"
          >
            <option value="">Assign to user</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-xl"
        >
          {isEdit ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}
