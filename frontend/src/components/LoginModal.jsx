import { forgotPassword } from "../api/auth";
import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

export default function LoginModal({ open, onClose }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white/60 backdrop-blur-xl p-8 shadow-xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500">
          <X />
        </button>

        {mode === "login" && (
          <>
            <h2 className="mb-6 text-center text-2xl font-bold">Welcome back</h2>

            <input className="mb-4 w-full rounded-xl px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-xl px-4 py-3 pr-10"
                placeholder="Password"
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button className="w-full rounded-xl bg-[#0ea5e9] py-3 font-semibold text-white">
              Sign In
            </button>

            <button
              className="mt-4 w-full text-sm text-[#0ea5e9]"
              onClick={() => setMode("forgot")}
            >
              Forgot password?
            </button>
          </>
        )}

        {mode === "forgot" && (
          <>
            <h2 className="mb-6 text-center text-2xl font-bold">Reset password</h2>

            <input className="mb-4 w-full rounded-xl px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <button
              disabled={loading}
              className={`w-full rounded-xl py-3 font-semibold text-white ${
                loading ? "bg-gray-400" : "bg-[#0ea5e9]"
              }`}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setSent(true);
                }, 1200);
              }}
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>

            {sent && (
              <p className="mt-4 text-center text-sm text-green-600">
                Reset link sent. Check your email.
              </p>
            )}

            <button
              className="mt-4 w-full text-sm text-[#0ea5e9]"
              onClick={() => {
                setMode("login");
                setSent(false);
                setLoading(false);
              }}
            >
              ← Back to login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
