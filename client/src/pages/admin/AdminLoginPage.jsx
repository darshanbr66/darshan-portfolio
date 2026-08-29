import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useAuth from "../../features/auth/hooks/useAuth";

function AdminLoginPage() {
  const navigate = useNavigate();

  const {
    login,
    isAuthenticated,
    isLoading,
    error,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await login(email, password);

    if (result.success) {
      navigate("/admin", { replace: true });
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="
            mb-8
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-[var(--color-ink-muted)]
            transition-colors
            hover:text-[var(--color-ink)]
          "
        >
          <ArrowLeft size={15} />
          Back to portfolio
        </a>        
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Admin
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
            Welcome back.
          </h1>

          <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
            Sign in to manage your portfolio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              autoComplete="email"
              className="
                w-full
                rounded-xl
                border
                border-[var(--color-border-strong)]
                bg-transparent
                px-4
                py-3
                text-sm
                text-[var(--color-ink)]
                outline-none
                transition
                focus:border-[var(--color-ink)]
              "
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              autoComplete="current-password"
              className="
                w-full
                rounded-xl
                border
                border-[var(--color-border-strong)]
                bg-transparent
                px-4
                py-3
                text-sm
                text-[var(--color-ink)]
                outline-none
                transition
                focus:border-[var(--color-ink)]
              "
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-700
              "
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[var(--color-ink)]
              px-5
              py-3.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-[var(--color-accent)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isLoading
              ? "Signing in..."
              : "Sign in"}

            {!isLoading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLoginPage;