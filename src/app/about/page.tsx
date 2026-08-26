import type { Metadata } from "next";
import { Reveal, Eyebrow, SectionHeading, Card, Stat } from "@/components/ui";
import { Hammer, Sparkles, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Shrandha Labs is a technology company building practical software solutions for businesses and institutions, alongside industry-focused internship programs for students.",
};

const pillars = [
  { icon: Hammer, title: "Build", desc: "Technology solutions for organizations — websites, business software, and custom systems built around how you actually work." },
  { icon: Sparkles, title: "Innovate", desc: "Modern software practices: cloud infrastructure, automation, and AI-assisted tools applied where they genuinely help." },
  { icon: GraduationCap, title: "Empower", desc: "Industry-focused internships and practical learning that give students real technology experience, not simulations." },
];

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>About Us</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">Who We Are</h1>
        <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
          Shrandha Labs is a technology company building practical software solutions, digital products, and industry-focused learning programs. We work with businesses and institutions on real software — and we bring students into that same process through structured internship tracks.
        </p>
      </Reveal>

      <div className="mt-20 grid md:grid-cols-3 gap-5">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <Card className="h-full">
              <p.icon className="w-6 h-6 text-cyan" />
              <h3 className="mt-5 font-display font-semibold text-xl">{p.title}</h3>
              <p className="mt-3 text-muted leading-relaxed text-sm">{p.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-24">
        <SectionHeading eyebrow="What We Believe" title="Why we exist" />
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <Card>
            <h3 className="font-display font-semibold text-lg">For organizations</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">Most businesses and institutions need software that fits their actual workflow — not a generic template. We build websites, billing systems, healthcare platforms, and custom internal tools with that in mind.</p>
          </Card>
          <Card>
            <h3 className="font-display font-semibold text-lg">For students</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">The gap between classroom learning and industry expectation is real. Our internship programs close it by putting students through the same structured process — live tasks, review cycles, and accountability — that our own project work follows.</p>
          </Card>
        </div>
      </div>

      <div className="mt-24">
        <SectionHeading eyebrow="At a Glance" title="Where we stand today" />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat value="7" label="Solution categories" />
          <Stat value="10" label="Internship tracks" />
          <Stat value="3 mo" label="Program duration" />
          <Stat value="100%" label="Remote friendly" />
        </div>
      </div>
    </div>
  );
}
