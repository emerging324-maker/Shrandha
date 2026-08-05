import type { Metadata } from "next";
import { Reveal, Eyebrow, Card } from "@/components/ui";
import { testimonials } from "@/lib/data";
import { Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What past Shrandha Labs interns say about the program.",
};

export default function Testimonials() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>From Past Interns</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">Testimonials</h1>
      </Reveal>
      <div className="mt-16 grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={(i % 2) * 0.08}>
            <Card className="h-full">
              <Quote className="w-6 h-6 text-amber" />
              <p className="mt-5 text-ink/90 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan via-slate to-coral" />
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-muted mt-0.5">{t.role}</p>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
