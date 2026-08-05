import type { Metadata } from "next";
import { Reveal, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Terms of Service", description: "Terms governing use of Shrandha Labs' website and internship programs." };

const sections = [
  { h: "1. Acceptance of Terms", p: "By registering for or using Shrandha Labs' programs and website, you agree to these Terms of Service." },
  { h: "2. Registration & Fees", p: "A one-time registration fee of ₹150 is required to confirm your seat in the internship program. Fees are non-refundable once your seat is confirmed, except where required by law." },
  { h: "3. Program Conduct", p: "Interns are expected to submit weekly assignments on time, participate in review sessions, and maintain professional conduct throughout the program." },
  { h: "4. Certificates & Awards", p: "Certificates, Top Performer awards, Letters of Recommendation, and consistency prizes are issued at Shrandha Labs' discretion, based on program performance and completion criteria." },
  { h: "5. Intellectual Property", p: "Project work completed during the internship remains the intern's own portfolio work, unless otherwise agreed in writing for specific client-facing projects." },
  { h: "6. Limitation of Liability", p: "Shrandha Labs is not liable for indirect, incidental, or consequential damages arising from use of the program or website." },
  { h: "7. Changes to Terms", p: "We may update these terms periodically. Continued use of our services after changes constitutes acceptance." },
  { h: "8. Governing Law", p: "These terms are governed by the laws of India, with jurisdiction in Bangalore, Karnataka." },
];

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-5xl tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-sm text-muted">Last updated: August 2026</p>
      </Reveal>
      <div className="mt-12 space-y-8">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="font-display font-semibold text-lg">{s.h}</h2>
            <p className="mt-2 text-muted leading-relaxed text-sm">{s.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
