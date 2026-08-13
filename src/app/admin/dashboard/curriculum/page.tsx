"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ChevronRight, FileText, Lock, RefreshCw, LoaderCircle, ExternalLink,
} from "lucide-react";
import { curriculumTracks } from "@/lib/curriculum";

// Admin-only weekly curriculum library. Files themselves live in Google
// Drive (uploaded manually — see the note in the UI below); this page just
// lists the 12 weeks per domain and links straight to whichever PDF has
// been uploaded so far. Nothing is hardcoded here beyond the week topics.
//
// Not linked anywhere on the public site — reached only via a direct link
// from the admin dashboard, and protected by the same login middleware
// since it lives under /admin/dashboard/.

type CurriculumFile = { url: string; fileName: string };
type DomainFiles = Record<string, CurriculumFile>; // week number (as string) -> file

export default function CurriculumAdmin() {
  const [activeSlug, setActiveSlug] = useState(curriculumTracks[0]?.slug ?? "");
  const [files, setFiles] = useState<Record<string, DomainFiles>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadFiles() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/curriculum", { cache: "no-store" });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setFiles({});
      } else {
        setFiles(data.domains || {});
      }
    } catch {
      setError("Could not load the curriculum library.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  const active = curriculumTracks.find((t) => t.slug === activeSlug);
  // Matched by exact domain name — this must match the Drive subfolder name exactly.
  const activeFiles: DomainFiles = (active && files[active.name]) || {};
  const uploadedCount = Object.keys(activeFiles).length;

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-3">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="font-display font-semibold text-3xl">Weekly Curriculum Library</h1>
          <p className="text-sm text-muted mt-1">Internal reference — not visible to students or on the public site.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadFiles} className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2.5 text-sm hover:border-cyan/40 focus-ring">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted rounded-full glass px-3 py-1.5">
            <Lock className="w-3.5 h-3.5" /> Admin only
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-line bg-white/5 px-4 py-3 text-xs text-muted">
        <b className="text-ink">How to add files:</b> in the Drive account behind the site, open the <b>&ldquo;Shrandha Labs — Weekly Curriculum&rdquo;</b> folder (it&apos;s created automatically). Inside it, open the subfolder matching the domain (e.g. <b>DevOps</b>) and upload a PDF named <b>&ldquo;Week 1.pdf&rdquo;</b>, <b>&ldquo;Week 2.pdf&rdquo;</b>, etc. It&apos;ll show up here after a refresh.
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-coral/30 bg-coral/5 px-4 py-3 text-sm text-coral">{error}</div>
      )}

      <div className="mt-6 grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Domain list */}
        <div className="rounded-2xl glass p-3 h-fit lg:sticky lg:top-24">
          {curriculumTracks.map((t) => {
            const count = Object.keys(files[t.name] || {}).length;
            const isActive = t.slug === activeSlug;
            return (
              <button
                key={t.slug}
                onClick={() => setActiveSlug(t.slug)}
                className={`w-full text-left rounded-xl px-4 py-3 mb-1 transition-colors ${
                  isActive ? "bg-white/10 text-ink" : "text-muted hover:bg-white/5 hover:text-ink"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t.name}</span>
                  {isActive && <ChevronRight className="w-4 h-4 shrink-0" />}
                </div>
                <span className="text-xs text-muted">{count}/{t.weeks.length} weeks uploaded</span>
              </button>
            );
          })}
        </div>

        {/* Weeks for the selected domain */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted">
              <LoaderCircle className="w-5 h-5 animate-spin" />
            </div>
          ) : active ? (
            <>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <h2 className="font-display font-semibold text-2xl">{active.name}</h2>
                <span className="text-xs text-muted font-mono">{uploadedCount}/{active.weeks.length} weeks uploaded</span>
              </div>

              <div className="space-y-2">
                {active.weeks.map((week) => {
                  const file = activeFiles[String(week.number)];
                  const Wrapper: any = file ? "a" : "div";
                  return (
                    <Wrapper
                      key={week.number}
                      {...(file ? { href: file.url, target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`flex items-center justify-between gap-4 rounded-2xl glass px-5 py-4 transition-colors ${
                        file ? "hover:border-cyan/40 cursor-pointer" : "opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono text-xs text-cyan shrink-0 w-16">WEEK {week.number}</span>
                        <span className="text-sm font-medium truncate">{week.topic}</span>
                      </div>
                      {file ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-cyan shrink-0">
                          <FileText className="w-3.5 h-3.5" /> Open PDF <ExternalLink className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="text-xs text-muted shrink-0">Not uploaded yet</span>
                      )}
                    </Wrapper>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
