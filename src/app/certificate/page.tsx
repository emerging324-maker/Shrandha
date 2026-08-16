import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal, Eyebrow, SectionHeading, Card, Button } from "@/components/ui";
import { Award, CalendarClock, ShieldCheck, Star, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Certificate",
  description: "The internship completion certificate you earn at Shrandha Labs — what it includes and how to earn it.",
};

const details = [
  { icon: CalendarClock, title: "Issued on Completion", desc: "Awarded once you finish your track's full 12-week program and submit every required task and activity." },
  { icon: ShieldCheck, title: "Verifiable", desc: "Every certificate carries a unique Certificate ID so it can be verified as genuine." },
  { icon: Star, title: "Performance Recognition", desc: "Top performers and consistent submitters also receive a Top Performer badge, Letter of Recommendation, and consistency prize." },
];

export default function Certificate() {
  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>What You Earn</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">Certificate of Internship Completion</h1>
        <p className="mt-6 text-lg text-muted max-w-2xl">A certificate that actually means something — tied to 12 weeks of real weekly tasks, hands-on activities, and mentor review, not a form you filled out once.</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 rounded-2xl overflow-hidden border border-line glass p-2 md:p-3">
          <div className="relative w-full aspect-[1492/1054] rounded-xl overflow-hidden">
            <Image src="/images/sample-certificate.jpg" alt="Sample Shrandha Labs internship completion certificate" fill style={{ objectFit: "contain" }} priority />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted text-center">Sample certificate — name, track, and dates are personalized to each intern.</p>
      </Reveal>

      <div className="mt-20">
        <SectionHeading eyebrow="Details" title="What's on your certificate" />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {details.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08}>
              <Card className="h-full">
                <d.icon className="w-6 h-6 text-cyan" />
                <h3 className="mt-5 font-display font-semibold text-lg">{d.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{d.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-20 rounded-2xl glass p-8 md:p-10 text-center">
          <Award className="w-8 h-8 text-amber mx-auto" />
          <h2 className="mt-4 font-display font-semibold text-2xl md:text-3xl">Ready to earn yours?</h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">Registration takes under five minutes. Your certificate is issued after you complete your track's full 12-week program.</p>
          <div className="mt-6">
            <Link href="/register">
              <Button className="text-base px-7 py-4">Register Now <ArrowUpRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
