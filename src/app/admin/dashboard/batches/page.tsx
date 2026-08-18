"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Layers, LoaderCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { courses } from "@/lib/data";

type Batch = { batchId: string; name: string; domain: string; createdDate: string };

export default function BatchesAdmin() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState(courses[0]?.name ?? "");

  async function loadBatches() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/batches", { cache: "no-store" });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        setBatches([]);
      } else {
        setBatches(data.batches || []);
      }
    } catch {
      toast.error("Could not load batches.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBatches();
  }, []);

  async function createBatch(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !domain) return;
    setCreating(true);
    try {
      const res = await fetch("/api/admin/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), domain }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      toast.success(`Batch created: ${data.batch.batchId}`);
      setName("");
      loadBatches();
    } catch {
      toast.error("Could not create batch");
    } finally {
      setCreating(false);
    }
  }

  // Group existing batches by domain so it's obvious which one is
  // "current" (newest) for each domain — that's the one new registrants
  // for that domain get auto-assigned into.
  const byDomain: Record<string, Batch[]> = {};
  batches.forEach((b) => {
    if (!byDomain[b.domain]) byDomain[b.domain] = [];
    byDomain[b.domain].push(b);
  });

  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8 py-10">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-3">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-semibold text-3xl">Batches</h1>
          <p className="text-sm text-muted mt-1">Every new registration for a domain is auto-assigned to that domain&apos;s most recently created batch.</p>
        </div>
        <button onClick={loadBatches} className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2.5 text-sm hover:border-cyan/40 focus-ring">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Create batch */}
      <form onSubmit={createBatch} className="mt-8 rounded-2xl glass p-6 flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 w-full">
          <label className="text-xs text-muted font-mono uppercase tracking-widest">Batch Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. DevOps — Feb 2026"
            className="mt-1.5 w-full rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50"
          />
        </div>
        <div className="w-full sm:w-64">
          <label className="text-xs text-muted font-mono uppercase tracking-widest">Domain</label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50"
          >
            {courses.map((c) => (
              <option key={c.slug} value={c.name} className="bg-surface">{c.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={creating || !name.trim()}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink text-base px-6 py-2.5 text-sm font-medium hover:bg-cyan transition-colors disabled:opacity-60 w-full sm:w-auto"
        >
          {creating ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Create Batch
        </button>
      </form>

      {/* Batches by domain */}
      <div className="mt-10">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted">
            <LoaderCircle className="w-5 h-5 animate-spin" />
          </div>
        ) : Object.keys(byDomain).length === 0 ? (
          <p className="text-sm text-muted text-center py-16">No batches created yet — create one above to start grouping registrations.</p>
        ) : (
          <div className="space-y-8">
            {Object.entries(byDomain).map(([d, list]) => (
              <div key={d}>
                <h2 className="font-display font-semibold text-lg mb-3">{d}</h2>
                <div className="space-y-2">
                  {list.map((b, i) => (
                    <div key={b.batchId} className="flex items-center justify-between rounded-xl glass px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Layers className="w-4 h-4 text-cyan shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{b.name}</p>
                          <p className="text-xs text-muted font-mono">{b.batchId}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {i === 0 && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan/10 text-cyan">Current — new signups go here</span>
                        )}
                        <span className="text-xs text-muted">{new Date(b.createdDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
