"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, LoaderCircle, Briefcase, Mail, Phone, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

type Lead = {
  timestamp: string; leadId: string; name: string; company: string; email: string; phone: string;
  industry: string; projectType: string; budget: string; description: string; website: string;
  preferredContact: string; status: string;
};

const STATUSES = ["New", "Contacted", "In Discussion", "Proposal Sent", "Won", "Lost"];
const statusColor: Record<string, string> = {
  New: "bg-cyan/10 text-cyan",
  Contacted: "bg-amber/10 text-amber",
  "In Discussion": "bg-amber/10 text-amber",
  "Proposal Sent": "bg-cyan/10 text-cyan",
  Won: "bg-cyan/10 text-cyan",
  Lost: "bg-coral/10 text-coral",
};

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [busyId, setBusyId] = useState<string | null>(null);

  async function loadLeads() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        setLeads([]);
      } else {
        setLeads(data.leads || []);
      }
    } catch {
      toast.error("Could not load project enquiries.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function updateStatus(lead: Lead, status: string) {
    setBusyId(lead.leadId);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: lead.leadId, status }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setLeads((prev) => prev.map((l) => (l.leadId === lead.leadId ? { ...l, status } : l)));
      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setBusyId(null);
    }
  }

  const filtered = useMemo(
    () => leads.filter((l) => statusFilter === "All" || l.status === statusFilter),
    [leads, statusFilter]
  );

  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8 py-10">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-3">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-semibold text-3xl">Project Enquiries</h1>
          <p className="text-sm text-muted mt-1">Leads submitted via the &ldquo;Start a Project&rdquo; form — separate from student registrations.</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none">
            {["All", ...STATUSES].map((s) => <option key={s} value={s} className="bg-surface">{s}</option>)}
          </select>
          <button onClick={loadLeads} className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2.5 text-sm hover:border-cyan/40 focus-ring">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted"><LoaderCircle className="w-5 h-5 animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-muted text-center py-16">No project enquiries {statusFilter !== "All" ? `with status "${statusFilter}"` : "yet"}.</p>
        ) : (
          filtered.map((lead) => (
            <div key={lead.leadId} className="rounded-2xl glass p-5 md:p-6">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4 text-cyan" />
                  </div>
                  <div>
                    <p className="font-medium">{lead.name} <span className="text-muted font-normal">· {lead.company}</span></p>
                    <p className="text-xs text-muted mt-0.5">{lead.industry} · {lead.projectType} {lead.budget && `· ${lead.budget}`}</p>
                  </div>
                </div>
                <select
                  value={lead.status}
                  disabled={busyId === lead.leadId}
                  onChange={(e) => updateStatus(lead, e.target.value)}
                  className={`text-xs px-3 py-1.5 rounded-full border-none outline-none ${statusColor[lead.status] || "bg-white/5 text-muted"}`}
                >
                  {STATUSES.map((s) => <option key={s} value={s} className="bg-surface text-ink">{s}</option>)}
                </select>
              </div>
              <p className="mt-4 text-sm text-muted leading-relaxed">{lead.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted">
                <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 hover:text-cyan"><Mail className="w-3.5 h-3.5" /> {lead.email}</a>
                {lead.phone && <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 hover:text-cyan"><Phone className="w-3.5 h-3.5" /> {lead.phone}</a>}
                {lead.website && <a href={`https://${lead.website.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan"><ExternalLink className="w-3.5 h-3.5" /> {lead.website}</a>}
                <span>Preferred: {lead.preferredContact || "—"}</span>
                <span>{new Date(lead.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
