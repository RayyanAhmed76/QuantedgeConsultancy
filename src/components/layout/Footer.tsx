"use client";

import type { ReactNode } from "react";
import Logo from "@/components/layout/Logo";
import TransitionLink from "@/components/layout/TransitionLink";
import { openCookieConsent } from "@/lib/cookie-consent";
import { BRAND, FOOTER_COLS } from "@/data/site";

function InstagramIcon() {
  return (
    <svg
      className="social-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS: { label: string; icon: ReactNode; href?: string }[] = [
  { label: "Twitter", icon: "𝕏" },
  {
    label: "LinkedIn",
    icon: "in",
    href: "https://www.linkedin.com/company/quantedge-data-solutions-ltd/",
  },
  {
    label: "Facebook",
    icon: "f",
    href: "https://www.facebook.com/people/Quantedge-Data-Solutions-Ltd/61594403847083/",
  },
  {
    label: "Instagram",
    icon: <InstagramIcon />,
    href: "https://www.instagram.com/quantedge_/",
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo size={34} />
          <p className="footer-tag">
            <span className="accent">Build. Analyze. Grow.</span>
          </p>
          <div className="socials">
            {SOCIALS.map(({ label, icon, href }) =>
              href ? (
                <a
                  className="social"
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                >
                  {icon}
                </a>
              ) : (
                <span
                  className="social social--disabled"
                  key={label}
                  aria-label={`${label} (coming soon)`}
                  title={`${label} (coming soon)`}
                >
                  {icon}
                </span>
              ),
            )}
          </div>
          <p className="copyright">© {BRAND} 2026</p>
          <button
            type="button"
            className="footer-cookie-btn"
            onClick={openCookieConsent}
          >
            Cookie settings
          </button>
        </div>
        <div className="footer-cols">
          {Object.entries(FOOTER_COLS).map(([head, items]) => (
            <div className="footer-col" key={head}>
              <h4>{head}</h4>
              <ul>
                {items.map((item) => (
                  <li key={item.to}>
                    <TransitionLink href={item.to}>{item.label}</TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
