import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Eyebrow, SectionHeading, Card, Button } from "@/components/ui";
import { Rocket, ClipboardCheck, Users2, FileCheck2, Award, Star, FileText, Trophy, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Internships",
  description: "Flexible 1 to 3-month industry-focused internship program — live projects, weekly task and activity cycles, mentor reviews, certificate, and recognition for consistency.",
};

const includes = [
  { icon: Rocket, title: "Live Industry Projects", desc: "Project briefs modeled on the same practical work Shrandha Labs builds for real clients." },
  { icon: ClipboardCheck, title: "Weekly Task + Activity", desc: "Every Monday: a topic and task. Task due Wednesday, a hands-on activity follows, due Friday." },
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
        <Eyebrow>Flexible Duration — 1 to 3 Months</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">Industry Experience Starts With Building.</h1>
        <p className="mt-6 text-lg text-muted max-w-2xl">A structured internship across your chosen domain — pick a 1, 2, or 3-month track built around the same practical technology workflows we use on real projects, not a simulation of them.</p>
        <div className="mt-8">
          <Link href="/register"><Button className="text-base px-7 py-4">Apply for Internship <ArrowUpRight className="w-4 h-4" /></Button></Link>
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
        <SectionHeading eyebrow="Weekly Rhythm" title="How each week actually runs" />
        <p className="mt-4 text-muted max-w-2xl">Same structure, every week, for the full internship — so you always know what's due and when.</p>
        <div className="mt-12 grid md:grid-cols-4 gap-5">
          {[
            { day: "Monday", title: "Topic + Task", desc: "You get the week's learning topic along with a task based on it." },
            { day: "Wednesday (EOD)", title: "Task Submission", desc: "Submit your task by end of day Wednesday." },
            { day: "Wednesday–Friday", title: "Practical Activity", desc: "After your task, you get a hands-on activity based on the same topic." },
            { day: "Friday (EOD)", title: "Activity Submission", desc: "Submit your activity by end of day Friday to close out the week." },
          ].map((s, i) => (
            <Reveal key={s.day} delay={i * 0.06}>
              <Card className="h-full">
                <span className="font-mono text-xs text-cyan tracking-widest">{s.day}</span>
                <h3 className="mt-3 font-display font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{s.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-6 text-sm text-muted">This cycle repeats every week for your chosen duration — 1, 2, or 3 months. All topics, resources, and submission instructions are shared in your batch&apos;s WhatsApp group — that&apos;s your main channel for updates throughout the program.</p>
        </Reveal>
      </div>

      <div className="mt-24">
        <SectionHeading eyebrow="Choose Your Duration" title="1, 2, or 3 months — your pace." />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { phase: "1 Month", title: "Foundations", desc: "Core concepts for your track, environment setup, and a first weekly build cycle." },
            { phase: "2 Months", title: "Foundations + Build", desc: "Everything in the 1-month track, plus deeper weekly topic → task → activity cycles with mentor review." },
            { phase: "3 Months", title: "Full Track", desc: "The complete program — foundations, build phase, project depth, and a final wrap-up with certificate issuance." },
          ].map((s, i) => (
            <Reveal key={s.phase} delay={i * 0.06}>
              <Card className="h-full">
                <span className="font-mono text-xs text-cyan tracking-widest">{s.phase}</span>
                <h3 className="mt-3 font-display font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{s.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
