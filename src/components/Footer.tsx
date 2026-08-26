import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/industries", label: "Industries" },
      { href: "/projects", label: "Projects" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/services", label: "All Solutions" },
      { href: "/services#website-development", label: "Website Development" },
      { href: "/services#healthcare", label: "Healthcare Software" },
      { href: "/services#billing", label: "Billing & Business Software" },
      { href: "/start-project", label: "Start a Project" },
    ],
  },
  {
    title: "Internships",
    links: [
      { href: "/internship", label: "Internship Program" },
      { href: "/courses", label: "All Tracks" },
      { href: "/certificate", label: "Certificate" },
      { href: "/verify-certificate", label: "Verify Certificate" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid grid-cols-2 md:grid-cols-6 gap-10">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image src="/images/logo-mark.png" alt="Shrandha Labs" width={38} height={38} className="shrink-0" />
            <span className="font-display font-semibold text-lg">Shrandha Labs</span>
          </Link>
          <p className="text-muted text-sm max-w-xs">Technology and software solutions for businesses and institutions, alongside industry-focused internship programs for students.</p>
          <div className="flex items-center gap-3 mt-5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-cyan transition-colors focus-ring" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-cyan transition-colors focus-ring" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
            <a href="mailto:hello@shrandhalabs.com" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-cyan transition-colors focus-ring" aria-label="Email"><Mail className="w-4 h-4" /></a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-slate mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted hover:text-ink transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} Shrandha Labs. All rights reserved.</p>
          <p className="font-mono">Learn. Build. Achieve.</p>
        </div>
      </div>
    </footer>
  );
}
