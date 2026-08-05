"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase text-cyan">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold tracking-tight text-ink">{title}</h2>
      {subtitle && <p className="mt-4 text-muted text-base md:text-lg">{subtitle}</p>}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("card-glow relative rounded-2xl glass p-6 md:p-8", className)}>
      {children}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl md:text-4xl font-semibold text-gradient">{value}</p>
      <p className="mt-1 text-xs md:text-sm text-muted">{label}</p>
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-medium transition-all focus-ring disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && "bg-ink text-base hover:bg-cyan",
        variant === "ghost" && "glass text-ink hover:border-cyan/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
