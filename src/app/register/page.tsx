"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  ChevronLeft, ChevronRight, UploadCloud, CheckCircle2, LoaderCircle,
  User, GraduationCap, Rocket, CreditCard, PartyPopper, FileText, ShieldCheck,
} from "lucide-react";
import { courses } from "@/lib/data";
import { Eyebrow } from "@/components/ui";

const STEPS = ["Personal", "Academic", "Program", "Review", "Payment"];
const PENDING_KEY = "sl_pending_registration";

type FormState = {
  name: string; email: string; phone: string;
  college: string; degree: string; department: string; year: string; city: string; state: string;
  course: string; linkedin: string; github: string;
  resumeFile: File | null;
};

// What actually gets stashed in sessionStorage across the redirect to
// Instamojo and back — File objects can't survive that, so the resume is
// already base64 by the time we save this.
type PendingRegistration = Omit<FormState, "resumeFile"> & {
  resumeFileName: string;
  resumeMimeType: string;
  resumeBase64: string;
};

function fileToBase64(file: File | Blob): Promise<string> {
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
  const [verifying, setVerifying] = useState(false);
  const [progressMsg, setProgressMsg] = useState("");
  const [done, setDone] = useState<{ studentId: string } | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "",
    college: "", degree: "", department: "", year: "", city: "", state: "",
    course: params.get("course") || "", linkedin: "", github: "",
    resumeFile: null,
  });

  // On return from Instamojo, the redirect URL carries these three params.
  // Re-verify server-side against Instamojo directly — never trust this
  // query string alone, it's just a hint for the UI, not proof of payment.
  useEffect(() => {
    const paymentId = params.get("payment_id");
    const paymentRequestId = params.get("payment_request_id");
    if (!paymentId || !paymentRequestId) return;

    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) {
      toast.error("Your session expired. Please fill the form again.");
      return;
    }
    const pending: PendingRegistration = JSON.parse(raw);

    // Restore the visible form too, in case verification fails and the
    // person needs to see/retry from the Payment step rather than starting over.
    setForm({
      name: pending.name, email: pending.email, phone: pending.phone,
      college: pending.college, degree: pending.degree, department: pending.department,
      year: pending.year, city: pending.city, state: pending.state,
      course: pending.course, linkedin: pending.linkedin, github: pending.github,
      resumeFile: null,
    });
    setStep(STEPS.length - 1);

    (async () => {
      setVerifying(true);
      try {
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentRequestId, paymentId }),
        });
        const verifyData = await verifyRes.json();
        if (!verifyData.verified) {
          toast.error("We couldn't confirm your payment. Please try again.");
          return;
        }

        const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
        if (!scriptUrl) {
          toast.error("Registration backend is not configured. Please contact us — your payment was received.");
          return;
        }

        const res = await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            action: "register",
            ...pending,
            paymentId,
            paymentRequestId,
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        sessionStorage.removeItem(PENDING_KEY);
        setDone({ studentId: data.studentId || "—" });
      } catch {
        toast.error("Payment succeeded, but saving your registration failed. Please contact us with your payment details.");
      } finally {
        setVerifying(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  async function payAndRegister() {
    if (!form.resumeFile) { toast.error("Please go back and upload your resume."); return; }
    setSubmitting(true);
    try {
      setProgressMsg("Preparing your registration…");
      const resumeBase64 = await fileToBase64(form.resumeFile);

      const pending: PendingRegistration = {
        name: form.name, email: form.email, phone: form.phone,
        college: form.college, degree: form.degree, department: form.department,
        year: form.year, city: form.city, state: form.state,
        course: form.course, linkedin: form.linkedin, github: form.github,
        resumeFileName: form.resumeFile.name,
        resumeMimeType: form.resumeFile.type,
        resumeBase64,
      };
      sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));

      setProgressMsg("Redirecting to payment…");
      const redirectUrl = `${window.location.origin}/register`;
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, redirectUrl }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      window.location.href = data.longurl;
    } catch (err) {
      toast.error("Couldn't start payment. Please try again.");
      setSubmitting(false);
      setProgressMsg("");
    }
  }

  if (verifying) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center">
        <LoaderCircle className="w-10 h-10 text-cyan mx-auto animate-spin" />
        <h1 className="mt-6 font-display font-semibold text-2xl md:text-3xl">Confirming your payment…</h1>
        <p className="mt-4 text-muted">This only takes a moment — don&apos;t close this tab.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center">
        <PartyPopper className="w-12 h-12 text-amber mx-auto" />
        <h1 className="mt-6 font-display font-semibold text-3xl md:text-4xl">You&apos;re registered!</h1>
        <p className="mt-4 text-muted">Your Student ID is <span className="text-cyan font-mono">{done.studentId}</span>. Your payment is confirmed and we&apos;ve sent a receipt to your email — our team will review your application and confirm your seat shortly.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 md:px-8 py-16">
      <Eyebrow>Registration · ₹150</Eyebrow>
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
                <div className="flex items-center gap-2 text-cyan mb-2"><CheckCircle2 className="w-5 h-5" /><span className="text-sm font-medium">Review</span></div>
                <ReviewRow label="Name" value={form.name} />
                <ReviewRow label="Email" value={form.email} />
                <ReviewRow label="Phone" value={form.phone} />
                <ReviewRow label="College" value={form.college} />
                <ReviewRow label="Course" value={form.course} />
                <ReviewRow label="Resume" value={form.resumeFile?.name || "—"} />
                <p className="pt-2 text-xs text-muted">Next step: pay the ₹150 registration fee to complete your application.</p>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-cyan mb-2"><CreditCard className="w-5 h-5" /><span className="text-sm font-medium">Payment</span></div>
                <div className="rounded-xl border border-line bg-white/5 p-5 text-center">
                  <p className="text-xs text-muted">Registration Fee</p>
                  <p className="mt-1 font-display text-3xl font-semibold text-gradient">₹150</p>
                  <p className="mt-3 text-xs text-muted">You&apos;ll be taken to our secure payment page to complete this via UPI, card, or netbanking. Your registration is saved automatically the moment payment is confirmed.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan shrink-0" />
                  Secured by Instamojo — we never see or store your card/UPI details.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={back}
          disabled={step === 0 || submitting}
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
            onClick={payAndRegister}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink text-base px-6 py-2.5 text-sm font-medium hover:bg-cyan transition-colors focus-ring disabled:opacity-60"
          >
            {submitting && <LoaderCircle className="w-4 h-4 animate-spin" />}
            {submitting ? "Redirecting…" : "Pay ₹150 & Register"}
          </button>
        )}
      </div>
      {submitting && progressMsg && (
        <p className="mt-3 text-xs text-muted text-right font-mono">{progressMsg}</p>
      )}
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

export default function Register() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
