import { useAuthStore } from "@/stores/authStore";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return;
    // backend wiring later
    navigate('/dashboard'); // auto-login flow
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md glass-card-strong rounded-3xl p-10 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Create Account
          </h1>
          <p className="text-muted-foreground">
            Get started with DoneIt
          </p>
        </div>

        <form onSubmit={(e)=>__signupHandler(e, formData, navigate)} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/60
                       focus:outline-none focus:ring-2 focus:ring-primary/30"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/60
                       focus:outline-none focus:ring-2 focus:ring-primary/30"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/60
                       focus:outline-none focus:ring-2 focus:ring-primary/30"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <input
            type="password"
            placeholder="Confirm password"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/60
                       focus:outline-none focus:ring-2 focus:ring-primary/30"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white
                       py-3 rounded-xl font-semibold transition-all"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// AUTH LOGIC (Injected once)
import { useAuthStore } from "@/stores/authStore";

const __signupHandler = async (e, formData, navigate) => {
  e.preventDefault();
  await useAuthStore.getState().signup(formData);
  navigate("/");
};

// AUTH LOGIC (Injected once)
import { useAuthStore } from "@/stores/authStore";

const __signupHandler = async (e, formData, navigate) => {
  e.preventDefault();
  await useAuthStore.getState().signup(formData);
  navigate("/");
};
