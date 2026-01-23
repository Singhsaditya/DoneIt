import { Link } from "react-router-dom";
import { useState } from "react";
import ExpensoLikeBackground from "../components/ExpensoLikeBackground";
import LoginModal from "../components/LoginModal";

export default function Login() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen auth-bg dot-grid dot-fade-light overflow-hidden bg-[#f8fafc]">
      <ExpensoLikeBackground />
      <LoginModal open={open} onClose={() => setOpen(false)} />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-3">
          {/* SAME LOGO AS INSIDE APP */}
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center relative">
            <div className="absolute inset-2 border-2 border-white rounded-full" />
            <div className="absolute w-1.5 h-1.5 bg-white rounded-full" />
          </div>

          <span className="text-[22px] font-semibold tracking-tight text-[#0f172a]">
            Done<span className="text-[#0ea5e9] font-bold">It</span>
          </span>
        </div>

        <button
          className="rounded-xl bg-[#0ea5e9] px-6 py-3 text-sm font-medium
                     text-white hover:bg-[#0284c7] transition shadow-sm"
          onClick={() => setOpen(true)}
        >
          Sign in with Google
        </button>
      </header>

      {/* Hero */}
      <main className="relative z-10 mt-24 flex flex-col items-center px-6 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(248,250,252,0.97)_0%,rgba(248,250,252,0.9)_25%,rgba(248,250,252,0.5)_40%,rgba(248,250,252,0.0)_100%)]" />

        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-[#0f172a]">
          Work in. Work out.
          <br />
          <span className="text-[#0ea5e9]">We keep teams aligned</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-[#475569]">
          DoneIt helps teams plan, assign, and track work effortlessly with
          role-based access, audit logs, and real-time task visibility.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-[#0ea5e9] px-8 py-4
                       font-semibold text-white hover:bg-[#0284c7] transition"
          >
            Sign In & Start →
          </button>

          <Link
            to="/signup"
            className="rounded-xl border border-[#0ea5e9] px-8 py-4
                       font-semibold text-[#0ea5e9] hover:bg-[#e0f2fe] transition"
          >
            Create Account
          </Link>
        </div>
      </main>
    </div>
  );
}
