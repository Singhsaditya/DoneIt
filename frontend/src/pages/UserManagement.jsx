import { useEffect, useState } from "react";
import { fetchUsers } from "../api/userApi";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading users...</p>;
  if (!users.length) return <p className="p-6">No users found</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Management</h1>

      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-4 rounded-xl border flex justify-between"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <span className="text-sm capitalize">{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
