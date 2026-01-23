import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8fbff]">

      {/* DOT GRID (FULL VISIBILITY LIKE LANDING) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(#2fa4ff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.5,
        }}
      />

      {/* GLASS CARD */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_25px_60px_rgba(0,120,255,0.15)] p-10">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-8">
          Create Account
        </h1>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-5 py-3 rounded-xl bg-white/80 text-slate-900 placeholder-slate-500 border border-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-5 py-3 rounded-xl bg-white/80 text-slate-900 placeholder-slate-500 border border-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-slate-900 placeholder-slate-500 border border-white pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600"
            >
              Ì±Å
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-slate-900 placeholder-slate-500 border border-white pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600"
            >
              Ì±Å
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-sky-500 text-white font-semibold text-lg hover:bg-sky-600 transition shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-slate-700 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
