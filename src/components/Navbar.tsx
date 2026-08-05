"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/internship", label: "Internship" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3" : "bg-transparent py-5 border-b border-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 focus-ring rounded-md">
          <Image src="/images/logo.png" alt="Shrandha Labs" width={34} height={34} className="rounded-md" />
          <span className="font-display font-semibold text-lg tracking-tight">Shrandha Labs</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm text-muted hover:text-ink transition-colors focus-ring rounded-md",
                pathname === l.href && "text-ink"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/register"
            className="group inline-flex items-center gap-1.5 rounded-full bg-ink text-base px-5 py-2.5 text-sm font-medium hover:bg-cyan transition-colors focus-ring"
          >
            Register Now
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          className="lg:hidden text-ink focus-ring rounded-md p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden glass border-t border-line mt-3"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="py-2.5 text-sm text-muted hover:text-ink">
                  {l.label}
                </Link>
              ))}
              <Link
                href="/register"
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink text-base px-5 py-3 text-sm font-medium"
              >
                Register Now <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
