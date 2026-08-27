import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Eyebrow, SectionHeading, Card, Button } from "@/components/ui";
import {
  GraduationCap, Globe, Receipt, HeartPulse, Layers, Cloud, Cpu, School,
  ArrowUpRight, CheckCircle2, Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Shrandha Labs builds websites, billing systems, healthcare software, custom business applications, cloud infrastructure, AI-powered tools, and institutional platforms.",
};

const solutions = [
  {
    id: "website-development",
    icon: Globe,
    name: "Website Development",
    desc: "Fast, modern websites and web applications built to represent your organization properly.",
    points: ["Business & corporate websites", "College & institutional websites", "Healthcare websites", "E-commerce websites", "Custom web applications"],
  },
  {
    id: "billing",
    icon: Receipt,
    name: "Billing & Business Software",
    desc: "Custom billing and operations software that fits how your business actually runs.",
    points: ["Billing & invoicing software", "Inventory management", "Customer management", "Business dashboards", "Reporting"],
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    name: "Healthcare & Patient Management",
    desc: "Secure, structured systems for clinics and healthcare providers to digitize patient workflows.",
    points: ["Patient record management", "Patient registration", "Appointment management", "Doctor & staff management", "Billing & healthcare dashboards"],
  },
  {
    id: "custom-software",
    icon: Layers,
    name: "Custom Software Development",
    desc: "Internal tools and business applications designed around your specific process.",
    points: ["Custom business applications", "Internal management systems", "Workflow automation", "Admin dashboards", "API integrations"],
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    name: "Cloud & DevOps",
    desc: "Reliable infrastructure and deployment pipelines for software that needs to stay up.",
    points: ["Cloud deployment", "Infrastructure setup", "CI/CD pipelines", "Application deployment", "Monitoring"],
  },
  {
    id: "ai-data",
    icon: Cpu,
    name: "AI & Data Solutions",
    desc: "Practical AI and data tools that solve specific operational problems, not novelty features.",
    points: ["AI-powered applications", "Data analytics", "Automation", "Intelligent dashboards", "AI integrations"],
  },
  {
    id: "institutional",
    icon: School,
    name: "College & Institutional Solutions",
    desc: "Structured platforms for colleges and institutions to manage students, staff, and placements.",
    points: ["Student management systems", "Attendance systems", "Placement management", "Internship management", "Faculty & admin portals"],
  },
];

export default function Services() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>Solutions</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">Software built around how you actually work.</h1>
        <p className="mt-6 text-lg text-muted max-w-2xl">Seven areas where we build practical, working software for businesses and institutions.</p>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 gap-6">
        {solutions.map((s, i) => (
          <Reveal key={s.id} delay={(i % 4) * 0.05}>
            <div id={s.id} className="scroll-mt-28 h-full">
              <Card className="h-full flex flex-col">
                <s.icon className="w-7 h-7 text-cyan" />
                <h3 className="mt-4 font-display font-semibold text-xl">{s.name}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted">
                      <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" /> {p}
                    </li>
                  ))}
                </ul>
                <Link href="/start-project" className="mt-6 inline-flex items-center gap-1.5 text-sm text-cyan hover:gap-2.5 transition-all">
                  Discuss your requirement <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Card>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Flagship internship callout */}
      <Reveal delay={0.15}>
        <div className="mt-16 rounded-2xl glass p-8 md:p-10 border border-cyan/20">
          <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-cyan" />
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-semibold text-2xl">Internship Programs</h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan/10 text-cyan flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Major Focus
                </span>
              </div>
              <p className="mt-2 text-muted max-w-xl">Every solution area above also feeds our internship tracks — students work on the same kinds of practical projects our clients need built.</p>
              <Link href="/internship" className="mt-4 inline-flex items-center gap-1.5 text-sm text-cyan hover:gap-2.5 transition-all">
                Explore the Internship Program <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-20 rounded-2xl glass p-8 md:p-10 text-center">
          <h2 className="font-display font-semibold text-2xl md:text-3xl">Have a project in mind?</h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">Tell us what you're building — we'll get back to you with a straightforward plan.</p>
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
