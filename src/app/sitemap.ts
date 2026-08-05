import { MetadataRoute } from "next";

const routes = [
  "", "about", "courses", "internship", "testimonials", "faq", "register",
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
