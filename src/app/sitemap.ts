import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const PATHS: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/services", priority: 0.85 },
  { path: "/services/business-advisory", priority: 0.7 },
  { path: "/services/process-optimization", priority: 0.7 },
  { path: "/services/market-customer-intelligence", priority: 0.7 },
  { path: "/services/bi-decision-support", priority: 0.7 },
  { path: "/services/regulation-compliance", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
  { path: "/cookie-policy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return PATHS.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
