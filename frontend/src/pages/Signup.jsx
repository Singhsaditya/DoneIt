import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import ExpensoLikeBackground from "../components/ExpensoLikeBackground";

export default function Signup() {
  const navigate = useNavigate();
  const signup = useAuthStore((s) => s.signup);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");
    await signup({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    navigate("/");
  };

  return (
    <div className="relative min-h-screen auth-bg dot-grid dot-fade-light overflow-hidden bg-[#f8fafc]">
      <ExpensoLikeBackground />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="relative w-full max-w-md rounded-2xl bg-white/40 backdrop-blur-xl border p-8">

          <button onClick={() => navigate("/login")} className="absolute right-4 top-4">
            <X size={20} />
          </button>

          <h2 className="mb-6 text-center text-2xl font-bold">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Full name" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl" />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl" />

            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <input name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Confirm password" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold">
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
