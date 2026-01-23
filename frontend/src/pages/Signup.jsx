import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import ExpensoLikeBackground from "../components/ExpensoLikeBackground";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative min-h-screen auth-bg dot-grid dot-fade-light overflow-hidden bg-[#f8fafc]">
      <ExpensoLikeBackground />

      {/* MODAL OVERLAY (same as login) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="relative w-full max-w-md rounded-2xl
                        bg-white/40 backdrop-blur-xl
                        border border-white/40
                        p-8 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">

          {/* Close */}
          <button
            onClick={() => navigate("/login")}
            className="absolute right-4 top-4 text-slate-500 hover:text-slate-700"
          >
            <X size={20} />
          </button>

          <h2 className="mb-6 text-center text-2xl font-bold text-[#0f172a]">
            Create Account
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              className="w-full rounded-xl bg-white/80
                         border border-white/60
                         px-4 py-3 focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl bg-white/80
                         border border-white/60
                         px-4 py-3 focus:outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-xl bg-white/80
                           border border-white/60
                           px-4 py-3 pr-10 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full rounded-xl bg-white/80
                           border border-white/60
                           px-4 py-3 pr-10 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#0ea5e9] py-3
                         font-semibold text-white hover:bg-[#0284c7] transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#475569]">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#0ea5e9]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
