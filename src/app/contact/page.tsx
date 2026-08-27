import type { Metadata } from "next";
import { Reveal, Eyebrow, Card } from "@/components/ui";
import { Phone, Mail, MapPin, Instagram, Linkedin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shrandha Labs — phone, email, WhatsApp, and social.",
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
      <Reveal>
        <Eyebrow>Get In Touch</Eyebrow>
        <h1 className="mt-4 font-display font-semibold text-4xl md:text-6xl tracking-tight max-w-3xl">Contact Us</h1>
        <p className="mt-6 text-lg text-muted max-w-2xl">Questions about a track, your application, or the program in general — reach us any of these ways.</p>
      </Reveal>

      <div className="mt-16 grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Reveal>
            <a href="https://wa.me/91" target="_blank" rel="noopener noreferrer">
              <Card className="flex items-center gap-4 hover:border-cyan/40">
                <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center"><MessageCircle className="w-5 h-5 text-cyan" /></div>
                <div><p className="font-medium">WhatsApp</p><p className="text-sm text-muted">93423 11900</p></div>
              </Card>
            </a>
          </Reveal>
          <Reveal delay={0.05}>
            <a href="tel:+919342311900">
              <Card className="flex items-center gap-4 hover:border-cyan/40">
                <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center"><Phone className="w-5 h-5 text-cyan" /></div>
                <div><p className="font-medium">Call Us</p><p className="text-sm text-muted">+91 93423 11900</p></div>
              </Card>
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="mailto:admin@shrandhalabs.com">
              <Card className="flex items-center gap-4 hover:border-cyan/40">
                <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center"><Mail className="w-5 h-5 text-cyan" /></div>
                <div><p className="font-medium">Email</p><p className="text-sm text-muted">admin@shrandhalabs.com</p></div>
              </Card>
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <Card className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center"><MapPin className="w-5 h-5 text-cyan" /></div>
              <div><p className="font-medium">Location</p><p className="text-sm text-muted">Bangalore, India</p></div>
            </Card>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-cyan focus-ring" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/shrandha-labs-5a24ba428/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-cyan focus-ring" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-3">
          <div className="rounded-2xl overflow-hidden glass h-full min-h-[380px]">
            <iframe
              title="Shrandha Labs location"
              src="https://www.google.com/maps?q=Bangalore,India&output=embed"
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
