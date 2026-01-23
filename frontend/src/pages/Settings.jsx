import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { updateProfile } from "../api/profileApi";

export default function Settings() {
  const { user, setUser } = useAuthStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = await updateProfile(formData);
      updateUser(updatedUser);

      setUser(updatedUser);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full name"
          className="w-full px-4 py-3 rounded-xl border"
          required
        />

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          className="w-full px-4 py-3 rounded-xl border"
          required
        />

        <button
          type="submit" disabled={loading}
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
