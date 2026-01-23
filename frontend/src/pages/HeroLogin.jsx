import { Link } from "react-router-dom";
import ExpensoLikeBackground from "../components/ExpensoLikeBackground";

export default function HeroLogin() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]">
      <ExpensoLikeBackground />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-[#0f172a]">
          <div className="h-8 w-8 rounded-md bg-[#0ea5e9]" />
          DoneIt
        </div>

        <button className="rounded-xl bg-[#0ea5e9] px-6 py-3 text-sm font-medium text-white hover:bg-[#0284c7] transition">
          Sign in with Google
        </button>
      </header>

      {/* Hero content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 text-center mt-20">
        <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-[#0f172a]">
          Work in. Work out.
          <br />
          <span className="text-[#0ea5e9]">We organize it all</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-[#475569]">
          Track tasks, manage teams, and stay on top of your workflow with a
          clean, enterprise-ready task management system built for speed and clarity.
        </p>

        {/* Feature pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Feature label="Role-based Access" />
          <Feature label="Smart Task Assignment" />
          <Feature label="Audit Logs & Insights" />
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="rounded-xl bg-[#0ea5e9] px-8 py-4 font-semibold text-white hover:bg-[#0284c7] transition"
          >
            Sign In & Start Managing →
          </Link>

          <Link
            to="/signup"
            className="rounded-xl border border-[#0ea5e9] px-8 py-4 font-semibold text-[#0ea5e9] hover:bg-[#e0f2fe] transition"
          >
            Create Account
          </Link>
        </div>
      </main>
    </div>
  );
}

function Feature({ label }) {
  return (
    <div className="rounded-full bg-white/90 px-5 py-2 text-sm font-medium text-[#0f172a] shadow-sm border">
      • {label}
    </div>
  );
}
