"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TARGET_SELECTOR = [
  "main section",
  "main .faq-intro",
  "main .home-service-card",
  "main .home-services-header",
  "main .home-services-overlap-inner",
  "main .home-different-header",
  "main .home-different-card",
  "main .home-different-media",
  "main .home-different-cta",
  "main .contact-copy",
  "main .contact-card",
  "main .contact-page-form-card",
  "main .contact-info-card",
  "main .about-content",
  "main .about-banner",
  "main .about-statements > *",
  "main .legal-page > section",
  "main .legal-page article",
].join(", ");

const SKIP_SELECTOR = [
  ".home-hero",
  ".service-hero",
  ".services-index-hero",
  ".contact-hero",
  "[data-no-reveal]",
].join(", ");

function shouldSkip(el: Element) {
  if (!(el instanceof HTMLElement)) return true;
  if (el.closest(SKIP_SELECTOR)) return true;
  // Reveal.tsx already owns this node
  if (el.classList.contains("reveal")) return true;
  // Nested under an existing reveal wrapper
  if (el.parentElement?.closest(".reveal")) return true;
  // Section / block that already has manual reveal children
  if (el.querySelector(":scope .reveal")) return true;
  return false;
}

export default function AutoScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observed = new WeakSet<Element>();

    const observer = reduce
      ? null
      : new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              const el = entry.target as HTMLElement;
              el.classList.add("is-revealed");
              observer?.unobserve(el);
            }
          },
          { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
        );

    const scan = () => {
      const main = document.querySelector("main");
      if (!main) return;

      const nodes = Array.from(main.querySelectorAll(TARGET_SELECTOR));

      // Prefer leaf targets (cards/items) over ancestor sections
      const leaves = nodes.filter(
        (el) => !nodes.some((other) => other !== el && el.contains(other)),
      );

      let i = 0;
      leaves.forEach((node) => {
        if (shouldSkip(node) || observed.has(node)) return;
        const el = node as HTMLElement;

        el.classList.add("reveal");
        const delay = (i % 5) * 50;
        if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
        i += 1;

        observed.add(el);

        if (reduce) {
          el.classList.add("is-revealed");
          return;
        }

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        if (rect.top < vh * 0.92 && rect.bottom > 40) {
          requestAnimationFrame(() => el.classList.add("is-revealed"));
          return;
        }

        observer?.observe(el);
      });
    };

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const scheduleScan = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(scan, 60);
    };

    const t0 = window.setTimeout(scan, 50);
    const t1 = window.setTimeout(scan, 400);

    const mo = new MutationObserver(scheduleScan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      if (debounceTimer) clearTimeout(debounceTimer);
      mo.disconnect();
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
