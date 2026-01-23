import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // backend wiring later
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md glass-card-strong rounded-3xl p-10 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Forgot Password
          </h1>
          <p className="text-muted-foreground">
            We’ll help you reset it
          </p>
        </div>

        {sent ? (
          <p className="text-center text-muted-foreground">
            If an account exists for <strong>{email}</strong>, reset instructions
            have been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/90/70 border border-white/60
                         focus:outline-none focus:ring-2 focus:ring-primary/30"
            />

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white
                         py-3 rounded-xl font-semibold transition-all"
            >
              Send reset link
            </button>
          </form>
        )}

        <p className="text-sm text-center mt-6 text-muted-foreground">
          Remembered your password?{' '}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
