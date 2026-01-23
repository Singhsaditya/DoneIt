import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function TaskForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
  });

  /* ===============================
     LOAD USERS
  ================================ */
  useEffect(() => {
    async function loadUsers() {
      const res = await api.get("/users");
      setUsers(res.data);
    }
    loadUsers();
  }, []);

  /* ===============================
     LOAD TASK (EDIT)
  ================================ */
  useEffect(() => {
    if (!isEdit) return;

    async function loadTask() {
      const res = await api.get(`/tasks/${id}`);
      setForm({
        title: res.data.title,
        description: res.data.description,
        assignedTo: res.data.assignedTo?._id || "",
        priority: res.data.priority,
      });
    }

    loadTask();
  }, [id, isEdit]);

  /* ===============================
     SUBMIT
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await api.put(`/tasks/${id}`, form);
      } else {
        await api.post("/tasks", form);
      }
      navigate("/tasks");
    } catch (err) {
      alert("Task save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Task" : loading ? "Creating..." : "Create Task"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border rounded-xl"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-3 border rounded-xl"
        />

        <select
          required
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          className="w-full p-3 border rounded-xl"
        >
          <option value="">Assign to</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.email}
            </option>
          ))}
        </select>

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="w-full p-3 border rounded-xl"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-xl"
        >
          {isEdit ? "Update Task" : loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
