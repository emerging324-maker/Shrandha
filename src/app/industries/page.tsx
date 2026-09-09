import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Eyebrow, SectionHeading, Card, Button } from "@/components/ui";
import { HeartPulse, GraduationCap, ShoppingBag, Briefcase, Building2, Rocket, Landmark, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries",
  description: "Shrandha Labs builds software for healthcare, education, retail, small and medium businesses, professional services, startups, and institutions.",
};

const industries = [
  { icon: HeartPulse, name: "Healthcare", desc: "Patient record management, appointment systems, and healthcare dashboards for clinics and providers." },
  { icon: GraduationCap, name: "Education", desc: "Student management, attendance, placement, and institutional platforms for colleges and schools." },
  { icon: ShoppingBag, name: "Retail", desc: "Billing, inventory, and customer management systems for retail operations." },
  { icon: Building2, name: "Small & Medium Businesses", desc: "Custom business software — invoicing, dashboards, and workflow tools sized for how SMBs actually operate." },
  { icon: Briefcase, name: "Professional Services", desc: "Client management, billing, and internal tools for firms that run on process and documentation." },
  { icon: Rocket, name: "Startups", desc: "Web applications and custom software to get an early-stage product built and shipped." },
  { icon: Landmark, name: "Institutions", desc: "Structured platforms for organizations managing staff, records, and internal operations at scale." },
];

export default function Industries() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>Industries We Serve</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">Software for the organizations that need it most.</h1>
        <p className="mt-6 text-lg text-muted max-w-2xl">We adapt our solution areas — websites, billing, healthcare systems, custom software — to fit each industry's actual constraints.</p>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind, i) => (
          <Reveal key={ind.name} delay={(i % 3) * 0.06}>
            <Card className="h-full">
              <ind.icon className="w-7 h-7 text-cyan" />
              <h3 className="mt-4 font-display font-semibold text-lg">{ind.name}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{ind.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-20 rounded-2xl glass p-8 md:p-10 text-center">
          <h2 className="font-display font-semibold text-2xl md:text-3xl">Don't see your industry listed?</h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">These are the areas we work in most often — reach out and we'll tell you honestly whether we're a fit for what you need.</p>
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
