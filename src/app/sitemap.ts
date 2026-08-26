import { MetadataRoute } from "next";

const routes = [
  "", "about", "services", "industries", "internship", "projects",
  "certificate", "verify-certificate", "start-project",
  "courses", "testimonials", "faq", "register",
  "contact", "privacy-policy", "terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.shrandhalabs.com";
  return routes.map((r) => ({
    url: `${base}/${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));
}
