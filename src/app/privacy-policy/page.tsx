import type { Metadata } from "next";
import { Reveal, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Shrandha Labs collects, uses, and protects your data." };

const sections = [
  { h: "1. Information We Collect", p: "When you register for a program, we collect your name, email, phone number, college, degree, department, year of study, city, state, course preference, resume, LinkedIn/GitHub profiles, and payment screenshot." },
  { h: "2. How We Use Your Information", p: "We use this information to process your registration, verify payment, communicate program updates, issue certificates, and improve our programs. We do not sell your data to third parties." },
  { h: "3. Data Storage", p: "Registration data is stored securely in our internal systems. Uploaded resumes and payment screenshots are stored in access-controlled cloud storage linked to your registration record." },
  { h: "4. Data Sharing", p: "We do not share your personal information with third parties except as required to operate the program (e.g. mentors reviewing your submissions) or as required by law." },
  { h: "5. Your Rights", p: "You may request access to, correction of, or deletion of your personal data by contacting us at hello@shrandhalabs.com." },
  { h: "6. Cookies", p: "Our website may use cookies to improve your browsing experience and understand site usage. You can disable cookies in your browser settings." },
  { h: "7. Changes to This Policy", p: "We may update this policy from time to time. Continued use of our services after changes constitutes acceptance of the updated policy." },
  { h: "8. Contact", p: "For privacy-related questions, reach us at hello@shrandhalabs.com." },
];

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-5xl tracking-tight">Privacy Policy</h1>
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
