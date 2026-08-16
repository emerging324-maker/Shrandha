"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldX, LoaderCircle, Search, Award, CalendarCheck2 } from "lucide-react";
import { Eyebrow, Card } from "@/components/ui";

type Result =
  | { valid: true; name: string; course: string; certificateId: string; issuedDate: string }
  | { valid: false };

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (!certificateId.trim()) return;
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
    if (!scriptUrl) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${scriptUrl}?action=verifyCertificate&certificateId=${encodeURIComponent(certificateId.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ valid: false });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-5 md:px-8 py-20">
      <Eyebrow>Certificate Verification</Eyebrow>
      <h1 className="mt-4 font-display font-semibold text-3xl md:text-5xl tracking-tight">Verify a Certificate</h1>
      <p className="mt-5 text-muted">Enter the Certificate ID printed on a Shrandha Labs internship completion certificate to confirm it's genuine.</p>

      <form onSubmit={verify} className="mt-10 flex flex-col sm:flex-row gap-3">
        <input
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          placeholder="e.g. SL-INT-2026-0042"
          className="flex-1 rounded-xl border border-line bg-white/5 px-4 py-3 text-sm outline-none focus:border-cyan/50 font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink text-base px-6 py-3 text-sm font-medium hover:bg-cyan transition-colors focus-ring disabled:opacity-60"
        >
          {loading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Verify
        </button>
      </form>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.valid ? "valid" : "invalid"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            {result.valid ? (
              <Card className="border-cyan/30">
                <div className="flex items-center gap-2 text-cyan">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-semibold">Certificate Verified</span>
                </div>
                <div className="mt-5 space-y-3">
                  <Row icon={Award} label="Name" value={result.name} />
                  <Row icon={Award} label="Track" value={result.course} />
                  <Row icon={CalendarCheck2} label="Issued" value={result.issuedDate ? new Date(result.issuedDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—"} />
                  <Row icon={ShieldCheck} label="Certificate ID" value={result.certificateId} mono />
                </div>
              </Card>
            ) : (
              <Card className="border-coral/30">
                <div className="flex items-center gap-2 text-coral">
                  <ShieldX className="w-5 h-5" />
                  <span className="text-sm font-semibold">Not Found</span>
                </div>
                <p className="mt-3 text-sm text-muted">No certificate matches that ID. Double-check it against the certificate exactly, or contact us if you believe this is an error.</p>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ icon: Icon, label, value, mono = false }: { icon: any; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-line/60 pb-2.5">
      <span className="flex items-center gap-1.5 text-xs text-muted font-mono uppercase tracking-widest">
        <Icon className="w-3.5 h-3.5" /> {label}
      </span>
      <span className={`text-sm text-right ${mono ? "font-mono text-cyan" : ""}`}>{value}</span>
    </div>
  );
}
