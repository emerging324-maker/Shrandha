import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { SiteBackground } from "@/components/SiteBackground";
import { Toaster } from "react-hot-toast";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700", "800"] });
const body = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

const siteUrl = "https://www.shrandhalabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shrandha Labs — Technology Solutions & Industry Internship Programs",
    template: "%s | Shrandha Labs",
  },
  description:
    "Shrandha Labs builds practical software solutions — websites, billing systems, healthcare platforms, and custom business software — for organizations, while running industry-focused internship programs for students across 10 technology tracks.",
  keywords: [
    "Shrandha Labs", "software development company", "custom software development",
    "website development", "billing software", "healthcare software", "patient management software",
    "business automation", "AI solutions", "cloud solutions",
    "student internships", "technology internships", "internship program India",
  ],
  openGraph: {
    title: "Shrandha Labs — Technology Solutions & Industry Internship Programs",
    description: "Practical software solutions for businesses and institutions, alongside industry-focused internship programs for students.",
    url: siteUrl,
    siteName: "Shrandha Labs",
    images: ["/images/logo.png"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shrandha Labs — Technology Solutions & Industry Internship Programs",
    description: "Practical software solutions for businesses and institutions, alongside industry-focused internship programs for students.",
    images: ["/images/logo.png"],
  },
  // favicon / apple-icon are auto-detected from src/app/favicon.ico,
  // src/app/icon.png, and src/app/apple-icon.png — no manual config needed.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased bg-base text-ink selection:bg-cyan">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Shrandha Labs",
              url: siteUrl,
              logo: `${siteUrl}/images/logo.png`,
              description: "Technology company building practical software solutions for businesses and institutions, alongside industry-focused internship programs for students.",
              slogan: "Learn. Build. Achieve.",
            }),
          }}
        />
        <Loader />
        <SiteBackground />
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ style: { background: "#0D0D12", color: "#F4F4F6", border: "1px solid rgba(255,255,255,0.08)" } }} />
      </body>
    </html>
  );
}
