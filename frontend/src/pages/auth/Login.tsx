import React, { useState } from 'react';
import workspaceHero from "../../assets/workspace _1.svg";
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { useToast } from '../../hooks/useToast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const validateForm = () => {
    if (!email.trim()) {
      toast.error('Validation Error', 'Please enter your email address');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Invalid Email', 'Please enter a valid email address');
      return false;
    }
    if (!password) {
      toast.error('Validation Error', 'Please enter your password');
      return false;
    }
    if (password.length < 6) {
      toast.error('Invalid Password', 'Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Signing in...');


    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })

      const data = await res.json();
      
      

      if (!res.ok) {
        toast.dismiss(loadingToast);
        toast.error('Login Failed', data.message || 'Invalid email or password');
        return;
      }

      setUser(data.user);
      toast.dismiss(loadingToast);
      toast.success('Welcome!', `Login successful, ${data.user?.name || 'user'}`);

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

    } catch (error: any) {
      toast.dismiss(loadingToast);
      const errorMessage = error?.message || 'Network error. Please check your connection';
      toast.error('Connection Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-violet-50 flex items-center">
      <div className="mx-auto my-2 w-[95%] max-w-6xl overflow-hidden rounded-2xl shadow-2xl">
        <div className="grid md:grid-cols-2 min-h-[60vh]">
          {/* Left - Illustration */}
          {/* Left - Hero Section */}
          <div className="relative min-h-[45vh] overflow-hidden bg-linear-to-br from-violet-100 via-violet-50 to-violet-100 lg:min-h-screen">

            {/* SVG */}
            <img
              src={workspaceHero}
              alt="Workspace Hero"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Glow Effects */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(167,139,250,0.10),transparent_35%)]" />

            {/* Content */}
            <div className="absolute inset-0 z-10 flex items-center mb-55">
              <div className="max-w-lg px-8 lg:px-14">

                {/* Badge */}
                {/* <div className="inline-flex items-center rounded-full border border-violet-200 bg-white/80 px-4 py-2 backdrop-blur-sm shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-violet-700">
          Workspace Collaboration
        </span>
      </div> */}

                {/* Heading */}
                <h1 className="mt-6 text-3xl font-bold leading-tight text-slate-900 lg:text-5xl">
                  Work
                  <span className="block text-violet-600">
                    Together
                  </span>
                  Smarter
                </h1>

                {/* Description */}
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Organize projects, manage tasks, collaborate with your
                  team and keep everything in one secure workspace.
                </p>

                {/* CTA
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700"
        >
          Get Started
        </button>

        <button
          type="button"
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Learn More
        </button>
      </div> */}

                {/* Stats
      <div className="mt-10 flex flex-wrap gap-4">

        <div className="rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-sm">
          <div className="text-2xl font-bold text-slate-900">
            10K+
          </div>
          <div className="text-sm text-slate-500">
            Active Users
          </div>
        </div>

        <div className="rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-sm">
          <div className="text-2xl font-bold text-slate-900">
            500+
          </div>
          <div className="text-sm text-slate-500">
            Teams
          </div>
        </div>

        <div className="rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-sm">
          <div className="text-2xl font-bold text-slate-900">
            99.9%
          </div>
          <div className="text-sm text-slate-500">
            Uptime
          </div>
        </div>

      </div> */}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex items-center justify-center bg-white p-10">
            <div className="w-full max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">Welcome back</p>
              <h3 className="mt-2 text-3xl font-semibold text-slate-900">Sign in to continue</h3>
              {/* <p className="mt-3 text-sm leading-6 text-slate-600">
                Access your workspace, pick up where you left off, and keep everything in sync.
              </p> */}

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full cursor-pointer justify-center rounded-xl bg-linear-to-r from-violet-600 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:from-violet-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="mt-5">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-3 text-slate-500">or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M11.4 24H4.6C2 24 0 22 0 19.4V4.6C0 2 2 0 4.6 0h14.8C22 0 24 2 24 4.6v14.8c0 2.6-2 4.6-4.6 4.6h-5.2v-8.7h2.9l.4-3.4h-3.3V9c0-1 .3-1.6 1.7-1.6h1.8V4.4c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6v2.5H9.2v3.4h2.2V24z" fill="#0078D4" />
                    </svg>
                    Microsoft
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center text-sm text-slate-600">
                <span>Don't have an account? </span>
                <a href="/signup" className="font-semibold text-violet-600 transition hover:text-violet-700">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
