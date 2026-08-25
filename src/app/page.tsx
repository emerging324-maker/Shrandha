"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight, Globe, Receipt, HeartPulse, Cpu, Cloud, BrainCircuit, GraduationCap,
  Layers, Users, Award, Code2, Rocket,
} from "lucide-react";
import { Knot } from "@/components/Knot";
import { Reveal, Eyebrow, SectionHeading, Card, Stat, Button } from "@/components/ui";
import { courses, testimonials } from "@/lib/data";

const whatWeDo = [
  { icon: Code2, title: "Build Software", desc: "Web applications, business systems, and digital products for organizations." },
  { icon: BrainCircuit, title: "Apply Technology", desc: "Cloud infrastructure, automation, and data-driven tools that solve real operational problems." },
  { icon: GraduationCap, title: "Develop Talent", desc: "Structured internship programs where students build on real technology workflows, not simulations." },
];

const solutions = [
  { icon: Globe, name: "Website Development", desc: "Business, corporate, and institutional websites, plus custom web applications." },
  { icon: Receipt, name: "Billing & Business Software", desc: "Invoicing, inventory, customer management, and reporting dashboards." },
  { icon: HeartPulse, name: "Healthcare Software", desc: "Patient records, appointments, and staff management systems." },
  { icon: Layers, name: "Custom Software Development", desc: "Internal tools, workflow automation, and admin dashboards built around your process." },
  { icon: Cloud, name: "Cloud & DevOps", desc: "Deployment, infrastructure setup, and CI/CD for reliable software delivery." },
  { icon: Cpu, name: "AI & Data Solutions", desc: "Data analytics, automation, and AI-powered dashboards and integrations." },
];

const industries = ["Healthcare", "Education", "Retail", "SMBs", "Professional Services", "Startups", "Institutions"];

const howWeBuild = [
  { step: "01", title: "Understand", desc: "We start by understanding your workflow, not assuming it." },
  { step: "02", title: "Design", desc: "Clear architecture and interface design before a line of production code is written." },
  { step: "03", title: "Build & Review", desc: "Iterative development with regular check-ins, not a black box until launch." },
  { step: "04", title: "Deploy & Support", desc: "Cloud deployment, monitoring, and ongoing support after launch." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
          <Reveal>
            <Eyebrow>Shrandha Labs</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display font-semibold tracking-tight text-5xl sm:text-6xl md:text-7xl leading-[1.05] max-w-4xl">
              Building Digital Solutions. <span className="text-gradient">Developing Future Talent.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl">
              Shrandha Labs builds practical software solutions for businesses and institutions, while creating industry-focused opportunities for students to learn, build, and gain real-world experience.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/start-project">
                <Button className="text-base px-7 py-4">Start a Project <ArrowUpRight className="w-4 h-4" /></Button>
              </Link>
              <Link href="/internship">
                <Button variant="ghost" className="text-base px-7 py-4">Explore Internships</Button>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl">
              <Stat value="7" label="Solution areas" />
              <Stat value="10" label="Internship tracks" />
              <Stat value="100%" label="Remote friendly" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="relative py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="What We Do" title="A technology company with two connected halves." subtitle="We build real software for real organizations — and we bring students into that same process." />
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {whatWeDo.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <Card className="h-full">
                  <w.icon className="w-6 h-6 text-cyan" />
                  <h3 className="mt-5 font-display font-semibold text-lg">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{w.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="relative py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <SectionHeading eyebrow="Solutions" title="Software built around how you actually work." />
            <Link href="/services" className="hidden md:inline-flex items-center gap-1.5 text-sm text-cyan hover:gap-2.5 transition-all">
              View all solutions <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <Card className="h-full">
                  <s.icon className="w-6 h-6 text-cyan" />
                  <h3 className="mt-4 font-display font-semibold text-lg">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{s.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Link href="/services" className="mt-10 md:hidden inline-flex items-center gap-1.5 text-sm text-cyan">
            View all solutions <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="relative py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Industries We Serve" title="Built for the organizations that need it most." align="center" />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <span key={ind} className="text-sm px-5 py-2.5 rounded-full border border-line text-muted hover:text-ink hover:border-cyan/40 transition-colors">{ind}</span>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm text-cyan hover:gap-2.5 transition-all">
              See industry-specific solutions <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW WE BUILD */}
      <section className="relative py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="How We Build" title="A straightforward process, every time." />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {howWeBuild.map((h, i) => (
              <Reveal key={h.step} delay={i * 0.06}>
                <Card className="h-full">
                  <span className="font-mono text-xs text-cyan tracking-widest">{h.step}</span>
                  <h3 className="mt-3 font-display font-semibold text-lg">{h.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{h.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNSHIP & INDUSTRY PROGRAMS */}
      <section className="relative py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>Internship & Industry Programs</Eyebrow>
            <h2 className="mt-4 font-display font-semibold text-3xl md:text-5xl tracking-tight">Industry experience starts with building.</h2>
            <p className="mt-5 text-muted text-base md:text-lg leading-relaxed">
              Our internship programs connect students to the same practical technology workflows we use on real projects — structured tracks, weekly reviews, and outcomes that hold up.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {courses.slice(0, 6).map((c) => (
                <span key={c.slug} className="text-xs px-3 py-1.5 rounded-full border border-line text-muted">{c.name}</span>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/internship" className="inline-flex items-center gap-1.5 text-sm text-cyan hover:gap-2.5 transition-all">
                Explore the Internship Program <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl glass p-8 grid grid-cols-2 gap-8">
              <Stat value="3 mo" label="Program length" />
              <Stat value="10" label="Technology tracks" />
              <Stat value="Weekly" label="Mentor reviews" />
              <Stat value="100%" label="Project-based" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS SHOWCASE TEASER */}
      <section className="relative py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Solutions Showcase" title="What we build, in practice." align="center" />
          <div className="mt-12 text-center">
            <Link href="/projects">
              <Button variant="ghost" className="text-base px-7 py-4">View Project Categories <ArrowUpRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY SHRANDHA LABS */}
      <section className="relative py-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Why Shrandha Labs" title="Built like a real engineering team." align="center" />
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            <Card><Rocket className="w-6 h-6 text-cyan" /><h3 className="mt-5 font-display font-semibold text-lg">Practical, Not Theoretical</h3><p className="mt-2 text-sm text-muted leading-relaxed">Every solution and every internship track is grounded in real workflows, not simulations.</p></Card>
            <Card><Users className="w-6 h-6 text-cyan" /><h3 className="mt-5 font-display font-semibold text-lg">Reviewed, Not Rushed</h3><p className="mt-2 text-sm text-muted leading-relaxed">Client work and student work both go through structured review before anything ships.</p></Card>
            <Card><Award className="w-6 h-6 text-cyan" /><h3 className="mt-5 font-display font-semibold text-lg">Transparent by Default</h3><p className="mt-2 text-sm text-muted leading-relaxed">Clear process, honest scoping, and no claims we can't back up.</p></Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-line overflow-hidden">
        <Knot className="absolute left-1/2 -translate-x-1/2 -bottom-24 w-96 h-96 opacity-10" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight">Have a project or a team to build?</h2>
          <p className="mt-4 text-muted text-lg">Tell us what you're working on, or explore how our internship programs can support your team or organization.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/start-project">
              <Button className="text-base px-8 py-4">Start a Project <ArrowUpRight className="w-4 h-4" /></Button>
            </Link>
            <Link href="/internship">
              <Button variant="ghost" className="text-base px-8 py-4">Explore Internships</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
