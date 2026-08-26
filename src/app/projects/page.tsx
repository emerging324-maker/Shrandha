import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Eyebrow, SectionHeading, Card, Button } from "@/components/ui";
import {
  Globe, Receipt, HeartPulse, School, Cpu, Cloud, Layers, ArrowUpRight, Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "A look at the categories of software Shrandha Labs builds — solution concepts and demos across web, healthcare, billing, and institutional platforms.",
};

type Status = "Concept" | "Demo" | "In Development";

const statusStyle: Record<Status, string> = {
  Concept: "bg-white/5 text-slate border-line",
  Demo: "bg-cyan/10 text-cyan border-cyan/30",
  "In Development": "bg-amber/10 text-amber border-amber/30",
};

const projects: { icon: any; name: string; category: string; status: Status; desc: string }[] = [
  { icon: Layers, name: "Business Operations Platform", category: "Custom Business Software", status: "Concept", desc: "A unified dashboard concept for tracking invoices, inventory, and customer records in one place." },
  { icon: HeartPulse, name: "Healthcare Management Platform", category: "Healthcare & Patient Management", status: "In Development", desc: "Patient registration, appointment scheduling, and staff management, built as a modular system." },
  { icon: School, name: "Student & Institution Platform", category: "College & Institutional Solutions", status: "Concept", desc: "Student records, attendance, and placement tracking designed for a college's actual workflow." },
  { icon: Receipt, name: "Billing & Invoicing Platform", category: "Billing & Business Software", status: "Demo", desc: "A working demo of invoice generation, tracking, and reporting for small business billing." },
  { icon: Cpu, name: "AI-Powered Data Dashboard", category: "AI & Data Solutions", status: "Concept", desc: "A dashboard concept applying automation and AI-assisted insights to operational data." },
  { icon: Cloud, name: "Cloud Deployment Toolkit", category: "Cloud & DevOps", status: "Concept", desc: "A reference setup for deploying and monitoring applications with CI/CD in place." },
  { icon: Globe, name: "Business Website Templates", category: "Website Development", status: "Demo", desc: "A set of modern, responsive website foundations for business and institutional clients." },
];

export default function Projects() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>Projects</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">What we build, by category.</h1>
        <p className="mt-6 text-lg text-muted max-w-2xl">This page shows the categories of software we build and their current status — not client case studies. As we complete real client projects, this page will be updated with them.</p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-white/5 px-4 py-3.5 max-w-2xl">
          <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
          <p className="text-xs text-muted leading-relaxed">Each card is labeled <b className="text-ink">Concept</b>, <b className="text-cyan">Demo</b>, or <b className="text-amber">In Development</b> — none of these represent completed client engagements.</p>
        </div>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.06}>
            <Card className="h-full flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <p.icon className="w-7 h-7 text-cyan" />
                <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyle[p.status]}`}>{p.status}</span>
              </div>
              <span className="mt-4 font-mono text-xs text-slate tracking-widest uppercase">{p.category}</span>
              <h3 className="mt-2 font-display font-semibold text-lg">{p.name}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{p.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-20 rounded-2xl glass p-8 md:p-10 text-center">
          <h2 className="font-display font-semibold text-2xl md:text-3xl">Want something like this built for you?</h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">Any of these categories can become a real, scoped project for your organization.</p>
          <div className="mt-6">
            <Link href="/start-project">
              <Button className="text-base px-7 py-4">Start a Project <ArrowUpRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
