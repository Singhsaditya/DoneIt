import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { Eye, EyeOff, X } from "lucide-react";

export default function LoginModal({ open, onClose }) {
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      onClose();
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-3xl
                      bg-white/90/70 backdrop-blur-xl
                      shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                      border border-white/40 p-10">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#0f172a]">
          Welcome back
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full rounded-xl border bg-white/90/80 px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full rounded-xl border bg-white/90/80 px-4 py-3 pr-12
                         focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0ea5e9] py-3
                       font-semibold text-white hover:bg-[#0284c7] transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
