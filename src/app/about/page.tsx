import type { Metadata } from "next";
import { Reveal, Eyebrow, SectionHeading, Card, Stat } from "@/components/ui";
import { Target, Eye, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Who Shrandha Labs is, our mission, vision, and why students choose our internship programs.",
};

const mentors = [
  { name: "Rohan Kapoor", role: "Cloud & DevOps Mentor", exp: "8+ yrs, ex-AWS partner engineer" },
  { name: "Ananya Rao", role: "Full Stack Mentor", exp: "6+ yrs, product engineering" },
  { name: "Vikram Shah", role: "Data & AI Mentor", exp: "7+ yrs, applied ML" },
];

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>About Us</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">Who We Are</h1>
        <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
          Shrandha Labs is an internship-first learning company. We don&apos;t sell video courses — we run structured, mentor-reviewed internship programs where students ship real projects across ten in-demand domains, from full stack development to DevOps and AI.
        </p>
      </Reveal>

      <div className="mt-20 grid md:grid-cols-2 gap-5">
        <Reveal>
          <Card className="h-full">
            <Target className="w-6 h-6 text-cyan" />
            <h3 className="mt-5 font-display font-semibold text-xl">Our Mission</h3>
            <p className="mt-3 text-muted leading-relaxed">To close the gap between classroom learning and industry expectation by giving every intern real projects, real deadlines, and real feedback — not simulations.</p>
          </Card>
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="h-full">
            <Eye className="w-6 h-6 text-amber" />
            <h3 className="mt-5 font-display font-semibold text-xl">Our Vision</h3>
            <p className="mt-3 text-muted leading-relaxed">A generation of graduates who walk into their first job already knowing what shipping software feels like — because they've done it here first.</p>
          </Card>
        </Reveal>
      </div>

      <div className="mt-24">
        <SectionHeading eyebrow="Track Record" title="Why students choose us" />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat value="10" label="Domain tracks" />
          <Stat value="3 mo" label="Structured duration" />
          <Stat value="Weekly" label="Mentor reviews" />
          <Stat value="100%" label="Project-based" />
        </div>
      </div>

      <div className="mt-24">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-cyan" />
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-cyan">Why Choose Us</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">Consistency is rewarded, not just attendance.</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {["Live projects reviewed weekly, not graded once at the end.", "Mentors are practicing engineers, not narrators reading slides.", "Recognition — award, recommendation letter, prize — is earned through the program, not sold with it."].map((t) => (
            <Card key={t}><p className="text-sm text-muted leading-relaxed">{t}</p></Card>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <SectionHeading eyebrow="Mentorship" title="Industry Mentors" />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {mentors.map((m) => (
            <Card key={m.name}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan via-slate to-amber" />
              <h3 className="mt-5 font-display font-semibold text-lg">{m.name}</h3>
              <p className="text-sm text-cyan mt-1">{m.role}</p>
              <p className="text-sm text-muted mt-2">{m.exp}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
