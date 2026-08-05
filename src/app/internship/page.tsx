import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Eyebrow, SectionHeading, Card, Button } from "@/components/ui";
import { Rocket, ClipboardCheck, Users2, FileCheck2, Award, Star, FileText, Trophy, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Internship",
  description: "3-month industry-ready internship program — live projects, weekly assignments, mentor reviews, certificate, and recognition for consistency.",
};

const includes = [
  { icon: Rocket, title: "Live Industry Projects", desc: "Real project briefs modeled on actual client and product work." },
  { icon: ClipboardCheck, title: "Weekly Assignments", desc: "Structured deliverables every week to build skill in layers." },
  { icon: Users2, title: "Hands-on Sessions", desc: "Guided live sessions with mentors, not pre-recorded lectures only." },
  { icon: FileCheck2, title: "Project Reviews", desc: "Mentor feedback on every submission before you move to the next module." },
  { icon: Award, title: "Internship Certificate", desc: "Awarded on successful completion of your track." },
  { icon: Star, title: "Top Performer Award", desc: "Recognition for the strongest performers each batch." },
  { icon: FileText, title: "Letter of Recommendation", desc: "For interns who complete the program with strong performance." },
  { icon: Trophy, title: "Prize for Consistency", desc: "A reward for interns who show up and submit, week after week." },
];

export default function Internship() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>Duration — 3 Months</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">The Internship Program</h1>
        <p className="mt-6 text-lg text-muted max-w-2xl">One structured, 3-month track across your chosen domain — designed to feel like your first real job, not an extended course.</p>
        <div className="mt-8">
          <Link href="/register"><Button className="text-base px-7 py-4">Register Now <ArrowUpRight className="w-4 h-4" /></Button></Link>
        </div>
      </Reveal>

      <div className="mt-20">
        <SectionHeading eyebrow="What's Included" title="Everything you need to walk away with proof of work." />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {includes.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.05}>
              <Card className="h-full">
                <f.icon className="w-6 h-6 text-cyan" />
                <h3 className="mt-5 font-display font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{f.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <SectionHeading eyebrow="Program Flow" title="How the 3 months break down" />
        <div className="mt-12 space-y-4">
          {[
            { phase: "Weeks 1–2", title: "Foundations", desc: "Core concepts for your track, environment setup, first small assignment." },
            { phase: "Weeks 3–8", title: "Build Phase", desc: "Weekly assignments and the main live project, with mentor review cycles." },
            { phase: "Weeks 9–11", title: "Project Depth", desc: "Extend the project, handle edge cases, polish for a portfolio-ready result." },
            { phase: "Week 12", title: "Wrap-up", desc: "Final review, certificate issuance, and recognition for top and consistent performers." },
          ].map((s, i) => (
            <Reveal key={s.phase} delay={i * 0.06}>
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 rounded-2xl glass p-6">
                <span className="font-mono text-xs text-cyan tracking-widest md:w-28 shrink-0">{s.phase}</span>
                <div>
                  <h3 className="font-display font-semibold text-lg">{s.title}</h3>
                  <p className="text-sm text-muted mt-1">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
