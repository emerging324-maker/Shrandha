"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Users, Award, Clock } from "lucide-react";
import { Knot } from "@/components/Knot";
import { Reveal, Eyebrow, SectionHeading, Card, Stat, Button } from "@/components/ui";
import { courses, testimonials } from "@/lib/data";

const benefits = [
  { icon: Sparkles, title: "Live Industry Projects", desc: "Not toy exercises — real, structured projects reviewed by mentors every week." },
  { icon: Clock, title: "3-Month Structured Track", desc: "Weekly assignments and hands-on sessions that build compounding skill, not cramming." },
  { icon: Users, title: "Mentor-Reviewed Work", desc: "Every submission gets real feedback from engineers who've shipped production code." },
  { icon: Award, title: "Recognition That Counts", desc: "Certificate, Top Performer award, Letter of Recommendation, and a consistency prize." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-20 pb-28 md:pt-28 md:pb-36">
          <Reveal>
            <Eyebrow>Applications open — 2026 batch</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display font-semibold tracking-tight text-5xl sm:text-6xl md:text-7xl leading-[1.05] max-w-4xl">
              Learn. Build. <span className="text-gradient">Achieve.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-xl">
              Join industry-ready internship programs built around live projects, weekly mentor reviews, and outcomes that actually show up on your resume.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/register">
                <Button className="text-base px-7 py-4">Register Now <ArrowUpRight className="w-4 h-4" /></Button>
              </Link>
              <Link href="/courses">
                <Button variant="ghost" className="text-base px-7 py-4">Explore Courses</Button>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl">
              <Stat value="10" label="Domain tracks" />
              <Stat value="3 mo" label="Program length" />
              <Stat value="₹150" label="Registration fee" />
              <Stat value="100%" label="Remote friendly" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Why Shrandha Labs" title="Built like a real engineering team, not a course platform." />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <Card className="h-full">
                  <b.icon className="w-6 h-6 text-cyan" />
                  <h3 className="mt-5 font-display font-semibold text-lg">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{b.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section className="relative py-24 border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <SectionHeading eyebrow="Programs" title="Ten tracks. One standard of rigor." />
            <Link href="/courses" className="hidden md:inline-flex items-center gap-1.5 text-sm text-cyan hover:gap-2.5 transition-all">
              View all courses <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.slice(0, 6).map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <Card className="h-full flex flex-col">
                  <span className="font-mono text-xs text-slate tracking-widest">{c.eyebrow}</span>
                  <h3 className="mt-3 font-display font-semibold text-xl">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted">{c.duration} · {c.skills.length} core skills</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.skills.slice(0, 2).map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-line text-muted">{s}</span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
          <Link href="/courses" className="mt-10 md:hidden inline-flex items-center gap-1.5 text-sm text-cyan">
            View all courses <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW */}
      <section className="relative py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="From past interns" title="They joined for a certificate. They stayed for the projects." align="center" />
          <div className="mt-14 grid md:grid-cols-2 gap-5">
            {testimonials.slice(0, 2).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <Card>
                  <p className="text-ink/90 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6">
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-muted mt-0.5">{t.role}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-line overflow-hidden">
        <Knot className="absolute left-1/2 -translate-x-1/2 -bottom-24 w-96 h-96 opacity-10" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight">Ready to build something real?</h2>
          <p className="mt-4 text-muted text-lg">Seats for the current batch are filling up. Registration takes under five minutes.</p>
          <div className="mt-8">
            <Link href="/register">
              <Button className="text-base px-8 py-4">Register Now <ArrowUpRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
