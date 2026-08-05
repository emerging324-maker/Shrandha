import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Eyebrow, Card } from "@/components/ui";
import { courses } from "@/lib/data";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Courses",
  description: "Ten industry-ready internship tracks — Python, Java, Full Stack, Data Analytics, AI & ML, AWS, Azure, DevOps, Cybersecurity, Digital Marketing.",
};

export default function Courses() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>Programs</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">Courses</h1>
        <p className="mt-6 text-lg text-muted max-w-2xl">Ten tracks, each built around live projects and a real skills checklist — not a syllabus PDF.</p>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 gap-6">
        {courses.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 4) * 0.05}>
            <Card className="h-full flex flex-col">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate tracking-widest">{c.eyebrow}</span>
                <span className="text-xs px-3 py-1 rounded-full border border-line text-muted">{c.duration}</span>
              </div>
              <h3 className="mt-4 font-display font-semibold text-2xl">{c.name}</h3>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-widest text-slate font-mono mb-2">Skills</p>
                <ul className="space-y-1.5">
                  {c.skills.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-muted">
                      <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-widest text-slate font-mono mb-2">Projects</p>
                <ul className="space-y-1.5">
                  {c.projects.map((p) => (
                    <li key={p} className="text-sm text-muted">— {p}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-widest text-slate font-mono mb-2">Career Paths</p>
                <div className="flex flex-wrap gap-2">
                  {c.careers.map((car) => (
                    <span key={car} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate">{car}</span>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-xs text-muted">Includes: {c.certificate}</p>

              <Link href={`/register?course=${encodeURIComponent(c.name)}`} className="mt-6 inline-flex items-center gap-1.5 text-sm text-cyan hover:gap-2.5 transition-all">
                Register for this track <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
