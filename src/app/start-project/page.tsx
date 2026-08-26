"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, LoaderCircle, PartyPopper } from "lucide-react";
import { Eyebrow } from "@/components/ui";

const industries = ["Healthcare", "Education", "Retail", "Small & Medium Business", "Professional Services", "Startup", "Institution", "Other"];
const projectTypes = ["Website Development", "Billing & Business Software", "Healthcare Software", "Custom Software Development", "Cloud & DevOps", "AI & Data Solutions", "College & Institutional Solutions", "Not Sure Yet"];
const budgetRanges = ["Under ₹50,000", "₹50,000 – ₹2,00,000", "₹2,00,000 – ₹5,00,000", "Above ₹5,00,000", "Prefer to discuss"];

type FormState = {
  name: string; company: string; email: string; phone: string;
  industry: string; projectType: string; budget: string; description: string;
  website: string; preferredContact: string;
};

export default function StartProject() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "", company: "", email: "", phone: "",
    industry: "", projectType: "", budget: "", description: "",
    website: "", preferredContact: "Email",
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.company || !form.email || !form.industry || !form.projectType || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Enter a valid email.");
      return;
    }

    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      toast.error("This form isn't connected yet. Please email us directly.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "submitLead", ...form }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center">
        <PartyPopper className="w-12 h-12 text-amber mx-auto" />
        <h1 className="mt-6 font-display font-semibold text-3xl md:text-4xl">Thanks — we&apos;ve got it.</h1>
        <p className="mt-4 text-muted">Your project details have been sent to our team. We typically respond within a couple of business days with next steps.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 md:px-8 py-16">
      <Eyebrow>Start a Project</Eyebrow>
      <h1 className="mt-4 font-display font-semibold text-3xl md:text-5xl tracking-tight">Tell us what you&apos;re building</h1>
      <p className="mt-4 text-muted">A few details help us understand your project before we reach out.</p>

      <form onSubmit={submit} className="mt-10 rounded-2xl glass p-6 md:p-8 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Full Name *" value={form.name} onChange={(v) => update("name", v)} placeholder="Your name" />
          <Field label="Company / Organization *" value={form.company} onChange={(v) => update("company", v)} placeholder="Your company" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Work Email *" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@company.com" />
          <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} placeholder="Optional" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Select label="Industry *" value={form.industry} onChange={(v) => update("industry", v)} options={industries} />
          <Select label="Project Type *" value={form.projectType} onChange={(v) => update("projectType", v)} options={projectTypes} />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <Select label="Budget Range" value={form.budget} onChange={(v) => update("budget", v)} options={budgetRanges} />
          <Field label="Website (optional)" value={form.website} onChange={(v) => update("website", v)} placeholder="yourcompany.com" />
        </div>
        <div>
          <label className="text-xs text-muted font-mono uppercase tracking-widest">Project Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={5}
            placeholder="Tell us what you need built, and any constraints or timeline."
            className="mt-1.5 w-full rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50 placeholder:text-muted/50 resize-none"
          />
        </div>
        <div>
          <label className="text-xs text-muted font-mono uppercase tracking-widest">Preferred Contact Method</label>
          <div className="mt-1.5 flex gap-2">
            {["Email", "Phone", "WhatsApp"].map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => update("preferredContact", m)}
                className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                  form.preferredContact === m ? "bg-ink text-base border-ink" : "border-line text-muted hover:text-ink"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-base px-6 py-3.5 text-sm font-medium hover:bg-cyan transition-colors disabled:opacity-60"
        >
          {submitting ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
          {submitting ? "Sending…" : "Submit Project Details"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="text-xs text-muted font-mono uppercase tracking-widest">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50 placeholder:text-muted/50"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="text-xs text-muted font-mono uppercase tracking-widest">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50"
      >
        <option value="" className="bg-surface">Select an option</option>
        {options.map((o) => <option key={o} value={o} className="bg-surface">{o}</option>)}
      </select>
    </div>
  );
}
