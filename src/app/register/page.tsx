"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  ChevronLeft, ChevronRight, UploadCloud, CheckCircle2, LoaderCircle,
  User, GraduationCap, Rocket, PartyPopper, FileText, Clock, ArrowLeft, IdCard,
} from "lucide-react";
import { courses } from "@/lib/data";
import { Eyebrow } from "@/components/ui";

// Flip this to true to re-open registration — no other changes needed.
const REGISTRATION_OPEN = true;

const STEPS = ["Personal", "Academic", "Program", "Review"];

type FormState = {
  name: string; email: string; phone: string;
  college: string; degree: string; department: string; year: string; city: string; state: string;
  course: string; linkedin: string; github: string;
  resumeFile: File | null;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function RegisterForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");
  const [done, setDone] = useState<{ studentId: string } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "",
    college: "", degree: "", department: "", year: "", city: "", state: "",
    course: params.get("course") || "", linkedin: "", github: "",
    resumeFile: null,
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validateStep(): boolean {
    if (step === 0) {
      if (!form.name || !form.email || !form.phone) { toast.error("Please fill in name, email, and phone."); return false; }
      if (!/^\S+@\S+\.\S+$/.test(form.email)) { toast.error("Enter a valid email."); return false; }
      if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) { toast.error("Enter a valid 10-digit phone number."); return false; }
    }
    if (step === 1) {
      if (!form.college || !form.degree || !form.department || !form.year || !form.city || !form.state) {
        toast.error("Please complete all academic details."); return false;
      }
    }
    if (step === 2) {
      if (!form.course) { toast.error("Select a course."); return false; }
      if (!form.resumeFile) { toast.error("Please upload your resume (PDF)."); return false; }
    }
    return true;
  }

  function next() {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function openConfirm() {
    if (!validateStep()) return;
    setShowConfirm(true);
  }

  async function submit() {
    setShowConfirm(false);
    setSubmitting(true);
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      toast.error("Registration backend is not configured yet. Please contact us directly.");
      setSubmitting(false);
      return;
    }
    try {
      setProgressMsg("Uploading resume…");
      const resumeBase64 = form.resumeFile ? await fileToBase64(form.resumeFile) : "";

      setProgressMsg("Saving your registration…");
      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids CORS preflight against Apps Script
        body: JSON.stringify({
          action: "register",
          name: form.name, email: form.email, phone: form.phone,
          college: form.college, degree: form.degree, department: form.department,
          year: form.year, city: form.city, state: form.state,
          course: form.course, linkedin: form.linkedin, github: form.github,
          resumeFileName: form.resumeFile?.name, resumeBase64, resumeMimeType: form.resumeFile?.type,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setDone({ studentId: data.studentId || "—" });
    } catch (err) {
      toast.error("Registration failed. Please try again or contact us.");
    } finally {
      setSubmitting(false);
      setProgressMsg("");
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center">
        <PartyPopper className="w-12 h-12 text-amber mx-auto" />
        <h1 className="mt-6 font-display font-semibold text-3xl md:text-4xl">You&apos;re registered!</h1>
        <p className="mt-4 text-muted">Your Student ID is <span className="text-cyan font-mono">{done.studentId}</span>. We&apos;ve sent a confirmation to your email — our team will review your application and get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 md:px-8 py-16">
      <Eyebrow>Registration</Eyebrow>
      <h1 className="mt-4 font-display font-semibold text-3xl md:text-5xl tracking-tight">Register for the Internship</h1>

      {/* Stepper */}
      <div className="mt-10 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-mono transition-colors ${
              i < step ? "bg-cyan text-base" : i === step ? "border-2 border-cyan text-cyan" : "border border-line text-muted"
            }`}>
              {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && <div className={`h-px flex-1 mx-1.5 ${i < step ? "bg-cyan" : "bg-line"}`} />}
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted font-mono uppercase tracking-widest">{STEPS[step]}</p>

      <div className="mt-8 rounded-2xl glass p-6 md:p-8 min-h-[380px]">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan mb-2"><User className="w-5 h-5" /><span className="text-sm font-medium">Personal Details</span></div>
                <Field label="Full Name" value={form.name} onChange={(v) => update("name", v)} placeholder="Your full name" />
                <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@example.com" />
                <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} placeholder="10-digit mobile number" />
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan mb-2"><GraduationCap className="w-5 h-5" /><span className="text-sm font-medium">Academic Details</span></div>
                <Field label="College" value={form.college} onChange={(v) => update("college", v)} placeholder="Your college name" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Degree" value={form.degree} onChange={(v) => update("degree", v)} placeholder="B.Tech, B.Sc…" />
                  <Field label="Department" value={form.department} onChange={(v) => update("department", v)} placeholder="CSE, ECE…" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Year" value={form.year} onChange={(v) => update("year", v)} placeholder="2nd, 3rd, Final…" />
                  <Field label="City" value={form.city} onChange={(v) => update("city", v)} placeholder="Your city" />
                </div>
                <Field label="State" value={form.state} onChange={(v) => update("state", v)} placeholder="Your state" />
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan mb-2"><Rocket className="w-5 h-5" /><span className="text-sm font-medium">Program Details</span></div>
                <div>
                  <label className="text-xs text-muted font-mono uppercase tracking-widest">Interested Course</label>
                  <select
                    value={form.course}
                    onChange={(e) => update("course", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-line bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-cyan/50"
                  >
                    <option value="" className="bg-surface">Select a course</option>
                    {courses.map((c) => <option key={c.slug} value={c.name} className="bg-surface">{c.name}</option>)}
                  </select>
                </div>
                <Field label="LinkedIn (optional)" value={form.linkedin} onChange={(v) => update("linkedin", v)} placeholder="linkedin.com/in/you" />
                <Field label="GitHub (optional)" value={form.github} onChange={(v) => update("github", v)} placeholder="github.com/you" />
                <FileField label="Resume (PDF)" icon={FileText} file={form.resumeFile} accept="application/pdf" onChange={(f) => update("resumeFile", f)} />
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan mb-2"><CheckCircle2 className="w-5 h-5" /><span className="text-sm font-medium">Review &amp; Submit</span></div>
                <ReviewRow label="Name" value={form.name} />
                <ReviewRow label="Email" value={form.email} />
                <ReviewRow label="Phone" value={form.phone} />
                <ReviewRow label="College" value={form.college} />
                <ReviewRow label="Course" value={form.course} />
                <ReviewRow label="Resume" value={form.resumeFile?.name || "—"} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 rounded-full glass px-5 py-2.5 text-sm disabled:opacity-40 focus-ring"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        {step < STEPS.length - 1 ? (
          <button onClick={next} className="inline-flex items-center gap-1.5 rounded-full bg-ink text-base px-6 py-2.5 text-sm font-medium hover:bg-cyan transition-colors focus-ring">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={openConfirm}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink text-base px-6 py-2.5 text-sm font-medium hover:bg-cyan transition-colors focus-ring disabled:opacity-60"
          >
            {submitting && <LoaderCircle className="w-4 h-4 animate-spin" />}
            {submitting ? "Submitting…" : "Register"}
          </button>
        )}
      </div>
      {submitting && progressMsg && (
        <p className="mt-3 text-xs text-muted text-right font-mono">{progressMsg}</p>
      )}

      {/* Confirmation popup — shown right before the actual submission fires */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="w-full max-w-sm rounded-2xl glass p-7 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center mx-auto">
                <IdCard className="w-6 h-6 text-amber" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-lg">One Last Thing</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                A one-time fee of <span className="text-ink font-semibold">₹150</span> applies for your ID card processing and internship certificate — payable once your application is reviewed. No payment is needed right now.
              </p>
              <p className="mt-3 text-sm text-cyan font-medium">Thank you for registering with Shrandha Labs!</p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setShowConfirm(false)} className="flex-1 rounded-full glass px-4 py-2.5 text-sm">Back</button>
                <button onClick={submit} className="flex-1 rounded-full bg-ink text-base px-4 py-2.5 text-sm font-medium hover:bg-cyan transition-colors">
                  Confirm &amp; Register
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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

function FileField({ label, icon: Icon, file, accept, onChange }: { label: string; icon: any; file: File | null; accept: string; onChange: (f: File | null) => void }) {
  return (
    <div>
      <label className="text-xs text-muted font-mono uppercase tracking-widest">{label}</label>
      <label className="mt-1.5 flex items-center gap-3 rounded-xl border border-dashed border-line bg-white/5 px-4 py-4 cursor-pointer hover:border-cyan/40 transition-colors">
        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
          {file ? <Icon className="w-4 h-4 text-cyan" /> : <UploadCloud className="w-4 h-4 text-slate" />}
        </div>
        <span className="text-sm text-muted truncate">{file ? file.name : "Click to upload"}</span>
        <input type="file" accept={accept} className="hidden" onChange={(e) => onChange(e.target.files?.[0] || null)} />
      </label>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line/60 pb-2.5">
      <span className="text-xs text-muted font-mono uppercase tracking-widest">{label}</span>
      <span className="text-sm text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}

function ComingSoon() {
  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center">
      <Clock className="w-12 h-12 text-cyan mx-auto" />
      <h1 className="mt-6 font-display font-semibold text-3xl md:text-4xl">Registrations Opening Soon</h1>
      <p className="mt-4 text-muted">We&apos;re putting the finishing touches on the next batch. Check back shortly, or follow our socials for the announcement.</p>
      <div className="mt-8">
        <Link href="/" className="inline-flex items-center gap-1.5 rounded-full glass px-6 py-3 text-sm hover:border-cyan/40 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function Register() {
  if (!REGISTRATION_OPEN) return <ComingSoon />;
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
