"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ChevronDown, ChevronRight, BookOpen, Target, Lightbulb,
  ClipboardList, Rocket, Bot, CheckCircle2, Lock,
} from "lucide-react";
import { curriculumTracks } from "@/lib/curriculum";

// Admin-only view of the full weekly curriculum, organized by domain. This
// is intentionally NOT linked anywhere on the public site or in the public
// navigation — it's reached only via a direct link from the admin dashboard,
// and sits under /admin/dashboard/ so the existing session middleware
// protects it the same way it protects the rest of the admin panel.

export default function CurriculumAdmin() {
  const [activeSlug, setActiveSlug] = useState(curriculumTracks[0]?.slug ?? "");
  const [openWeek, setOpenWeek] = useState<number | null>(1);

  const active = curriculumTracks.find((t) => t.slug === activeSlug);
  const writtenCount = active?.weeks.filter((w) => w.detail).length ?? 0;

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-3">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="font-display font-semibold text-3xl">Weekly Curriculum</h1>
          <p className="text-sm text-muted mt-1">Internal reference — not visible to students or on the public site.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted rounded-full glass px-3 py-1.5">
          <Lock className="w-3.5 h-3.5" /> Admin only
        </span>
      </div>

      <div className="mt-8 grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Domain list */}
        <div className="rounded-2xl glass p-3 h-fit lg:sticky lg:top-24">
          {curriculumTracks.map((t) => {
            const done = t.weeks.filter((w) => w.detail).length;
            const isActive = t.slug === activeSlug;
            return (
              <button
                key={t.slug}
                onClick={() => { setActiveSlug(t.slug); setOpenWeek(null); }}
                className={`w-full text-left rounded-xl px-4 py-3 mb-1 transition-colors ${
                  isActive ? "bg-white/10 text-ink" : "text-muted hover:bg-white/5 hover:text-ink"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t.name}</span>
                  {isActive && <ChevronRight className="w-4 h-4 shrink-0" />}
                </div>
                <span className="text-xs text-muted">{done}/{t.weeks.length} weeks written</span>
              </button>
            );
          })}
        </div>

        {/* Weeks for the selected domain */}
        <div>
          {active && (
            <>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <h2 className="font-display font-semibold text-2xl">{active.name}</h2>
                <span className="text-xs text-muted font-mono">{writtenCount}/{active.weeks.length} weeks with full content</span>
              </div>

              <div className="space-y-3">
                {active.weeks.map((week) => {
                  const isOpen = openWeek === week.number;
                  return (
                    <div key={week.number} className="rounded-2xl glass overflow-hidden">
                      <button
                        onClick={() => setOpenWeek(isOpen ? null : week.number)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs text-cyan shrink-0 w-16">WEEK {week.number}</span>
                          <span className="text-sm font-medium truncate">{week.topic}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {week.detail
                            ? <span className="text-xs text-cyan flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Written</span>
                            : <span className="text-xs text-muted">Topic only</span>}
                          <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="border-t border-line px-5 py-5">
                          {!week.detail ? (
                            <p className="text-sm text-muted">Full weekly breakdown (task, activity, AI task) hasn&apos;t been written for this week yet — only the topic is set.</p>
                          ) : (
                            <WeekDetailView detail={week.detail} />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function WeekDetailView({ detail }: { detail: NonNullable<import("@/lib/curriculum").Week["detail"]> }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted leading-relaxed">{detail.intro}</p>

      <Section icon={BookOpen} title="This week you are expected to learn">
        <BulletList items={detail.learn} />
      </Section>

      <Section icon={Lightbulb} title="Learning Approach">
        <p className="text-sm text-muted leading-relaxed">{detail.approach}</p>
        <p className="text-xs text-slate font-mono uppercase tracking-widest mt-4 mb-2">Keep these points in mind</p>
        <BulletList items={detail.keepInMind} symbol="check" />
      </Section>

      <Section icon={ClipboardList} title="Weekly Task">
        <BulletList items={detail.task} />
        <p className="text-xs text-slate font-mono uppercase tracking-widest mt-4 mb-2">Task Submission</p>
        <BulletList items={detail.taskSubmission} symbol="check" />
        <p className="mt-3 text-xs font-semibold text-coral">Deadline: Wednesday (EOD)</p>
      </Section>

      <Section icon={Target} title="Hands-on Activity">
        <p className="text-sm font-medium mb-2">Scenario</p>
        <p className="text-sm text-muted leading-relaxed mb-4">{detail.activityScenario}</p>
        <BulletList items={detail.activity} />
        <p className="text-xs text-slate font-mono uppercase tracking-widest mt-4 mb-2">Activity Submission</p>
        <BulletList items={detail.activitySubmission} symbol="check" />
        <p className="mt-3 text-xs font-semibold text-coral">Deadline: Friday (EOD)</p>
      </Section>

      <Section icon={Bot} title="AI Assistant Task">
        <BulletList items={detail.aiTask} />
      </Section>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-cyan mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-semibold text-ink">{title}</span>
      </div>
      {children}
    </div>
  );
}

function BulletList({ items, symbol = "arrow" }: { items: string[]; symbol?: "arrow" | "check" }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted">
          <span className="text-cyan shrink-0 mt-0.5">{symbol === "check" ? "✓" : "➤"}</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
