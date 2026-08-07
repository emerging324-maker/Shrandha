"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }
      router.push("/admin/dashboard");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Image src="/images/logo-mark.png" alt="Shrandha Labs" width={56} height={56} className="shrink-0" />
          <h1 className="mt-4 font-display font-semibold text-2xl">Admin Login</h1>
          <p className="text-sm text-muted mt-1">Sign in to manage registrations</p>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl glass p-6 space-y-4">
          <div>
            <label className="text-xs text-muted font-mono uppercase tracking-widest">Email</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-line bg-white/5 px-3.5 py-2.5">
              <Mail className="w-4 h-4 text-slate shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
                placeholder="admin@shrandhalabs.com"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted font-mono uppercase tracking-widest">Password</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-line bg-white/5 px-3.5 py-2.5">
              <Lock className="w-4 h-4 text-slate shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-base px-6 py-3 text-sm font-medium hover:bg-cyan transition-colors disabled:opacity-60"
          >
            {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
