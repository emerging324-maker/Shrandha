"use client";
import { Reveal, Eyebrow } from "@/components/ui";
import { faqs } from "@/lib/data";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-4xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>Questions</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight">FAQ</h1>
      </Reveal>
      <div className="mt-14 divide-y divide-line rounded-2xl glass">
        {faqs.map((f, i) => (
          <div key={f.q} className="px-6">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left focus-ring rounded-md"
              aria-expanded={openIdx === i}
            >
              <span className="font-medium pr-4">{f.q}</span>
              <ChevronDown className={`w-5 h-5 shrink-0 text-cyan transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {openIdx === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm text-muted leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
