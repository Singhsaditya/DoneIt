import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuthStore } from "../stores/authStore";

export default function UserManagement() {
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data || []));
  }, []);

  const updateRole = async (userId, role) => {
    setLoadingId(userId);
    try {
      const res = await api.put(`/users/${userId}/role`, { role });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? res.data : u))
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update role");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="page-transition">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          User Management
        </h1>
        <p className="text-muted-foreground">
          Manage user roles and access
        </p>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="px-6 py-4 font-medium">{u.name}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {u.email}
                </td>
                <td className="px-6 py-4">
                  {u._id === currentUser._id ? (
                    <span className="text-muted-foreground">
                      {u.role} (you)
                    </span>
                  ) : (
                    <select
                      value={u.role}
                      disabled={loadingId === u._id}
                      onChange={(e) =>
                        updateRole(u._id, e.target.value)
                      }
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-muted-foreground p-6">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
}
