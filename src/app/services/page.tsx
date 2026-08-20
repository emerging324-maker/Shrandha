import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Eyebrow, SectionHeading, Card, Button } from "@/components/ui";
import {
  GraduationCap, Globe, Receipt, HeartPulse, ArrowUpRight,
  CheckCircle2, Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Shrandha Labs builds software for real businesses — websites, billing systems, and healthcare records platforms — while training the next generation of engineers through our internship program.",
};

const services = [
  {
    icon: Globe,
    name: "Website Development",
    tagline: "Fast, modern websites built right the first time.",
    points: [
      "Business & portfolio websites",
      "E-commerce storefronts",
      "Web applications & dashboards",
      "Ongoing maintenance & support",
    ],
  },
  {
    icon: Receipt,
    name: "Billing & Invoicing Software",
    tagline: "Custom billing systems that fit how your business actually runs.",
    points: [
      "Invoice generation & tracking",
      "Payment and expense records",
      "Multi-user access & reporting",
      "Integration with existing tools",
    ],
  },
  {
    icon: HeartPulse,
    name: "Healthcare & Patient Records",
    tagline: "Secure, structured systems for clinics and healthcare providers.",
    points: [
      "Patient records management",
      "Appointment & visit tracking",
      "Role-based access for staff",
      "Built with data privacy in mind",
    ],
  },
];

export default function Services() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>What We Build</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">
          Software, built by people who train the next generation to build it too.
        </h1>
        <p className="mt-6 text-lg text-muted max-w-2xl">
          Shrandha Labs is a software company at heart — we design and build websites, billing systems, and healthcare platforms for real businesses. Our internship program stays at the center of everything we do: interns work alongside the same standards we hold ourselves to on client work.
        </p>
      </Reveal>

      {/* Flagship: Internship Program */}
      <Reveal delay={0.1}>
        <div className="mt-14 rounded-2xl glass p-8 md:p-10 border border-cyan/20">
          <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-cyan" />
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-semibold text-2xl">Internship Programs</h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan/10 text-cyan flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Our Core Focus
                </span>
              </div>
              <p className="mt-2 text-muted max-w-xl">Industry-ready internship programs across 10 tracks — live projects, weekly mentor review, and a certificate that means something. This is the heart of Shrandha Labs.</p>
              <Link href="/internship" className="mt-4 inline-flex items-center gap-1.5 text-sm text-cyan hover:gap-2.5 transition-all">
                Explore the Internship Program <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Other services */}
      <div className="mt-20">
        <SectionHeading eyebrow="Client Work" title="Software solutions for real businesses" subtitle="Alongside our internship program, we take on select client projects across three areas." />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <Card className="h-full flex flex-col">
                <s.icon className="w-7 h-7 text-cyan" />
                <h3 className="mt-5 font-display font-semibold text-xl">{s.name}</h3>
                <p className="mt-2 text-sm text-muted">{s.tagline}</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted">
                      <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" /> {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-20 rounded-2xl glass p-8 md:p-10 text-center">
          <h2 className="font-display font-semibold text-2xl md:text-3xl">Have a project in mind?</h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">Tell us what you're building — we'll get back to you with a straightforward plan and quote.</p>
          <div className="mt-6">
            <Link href="/contact">
              <Button className="text-base px-7 py-4">Get in Touch <ArrowUpRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
