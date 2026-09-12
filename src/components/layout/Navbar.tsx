"use client";

import { useEffect, useRef, useState } from "react";
import TransitionLink from "@/components/layout/TransitionLink";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/Logo";
import { NAV } from "@/data/site";

const SERVICE_ICONS = {
  advisory: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path
        d="M8.5 14.5c-2.2 0-4-1.6-4-3.5S6.3 7.5 8.5 7.5c.6 0 1.1.1 1.6.3"
        strokeLinecap="round"
      />
      <path
        d="M15.5 14.5c2.2 0 4-1.6 4-3.5s-1.8-3.5-4-3.5c-.6 0-1.1.1-1.6.3"
        strokeLinecap="round"
      />
      <path
        d="M9 15.2c.7 1.6 2.1 2.6 3.5 2.6s2.8-1 3.5-2.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="9.5" r="2.2" />
    </svg>
  ),
  process: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  market: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="3" />
      <circle cx="16" cy="14.5" r="2.5" />
      <path
        d="M4.5 18.5c.8-2.2 2.7-3.5 4.5-3.5s3.7 1.3 4.5 3.5"
        strokeLinecap="round"
      />
      <path
        d="M13.2 18.5c.5-1.5 1.7-2.4 2.8-2.4s2.3.9 2.8 2.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  bi: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path
        d="M8 4h8a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2z"
        strokeLinejoin="round"
      />
      <path d="M9 9h6M9 12h6M9 15h3" strokeLinecap="round" />
    </svg>
  ),
  compliance: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path
        d="M12 3.5 5.5 6v5.2c0 4.2 2.8 7.4 6.5 8.8 3.7-1.4 6.5-4.6 6.5-8.8V6L12 3.5Z"
        strokeLinejoin="round"
      />
      <path
        d="m9.2 12.2 1.9 1.9 3.7-3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

function pathMatches(pathname: string, to: string) {
  if (!to) return false;
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  const servicesActive =
    pathname === "/services" || pathname.startsWith("/services/");
  const contactActive = pathMatches(pathname, "/contact");

  useEffect(() => {
    function onScroll() {
      if (mobileOpen) {
        setHidden(false);
        return;
      }
      const y = window.scrollY;
      const direction =
        y > lastScrollY.current ? 1 : y < lastScrollY.current ? -1 : 0;
      lastScrollY.current = y;
      if (y < 48) {
        setHidden(false);
        return;
      }
      if (direction === 1) setHidden(true);
      if (direction === -1) setHidden(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!openMenu) return undefined;
    function onPointerDown(event: PointerEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    document.documentElement.classList.add("nav-drawer-open");
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.classList.remove("nav-drawer-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (servicesActive) setMobileServicesOpen(true);
  }, [servicesActive]);

  function closeMobile() {
    setMobileOpen(false);
    setMobileServicesOpen(servicesActive);
  }

  return (
    <>
      <header
        className={`nav-wrap${hidden ? " is-hidden" : ""}${mobileOpen ? " is-drawer-open" : ""}`}
      >
        <nav className="nav">
          <TransitionLink href="/" className="logo-link" onClick={closeMobile}>
            <Logo />
          </TransitionLink>
          <ul className="nav-links">
            {NAV.map((item) =>
              "children" in item && item.children ? (
                <li
                  key={item.label}
                  ref={openMenu === item.label ? dropdownRef : null}
                  className={`nav-item has-dropdown${openMenu === item.label ? " is-open" : ""}${
                    servicesActive ? " is-active" : ""
                  }`}
                  onMouseEnter={() => {
                    if (leaveTimerRef.current) {
                      clearTimeout(leaveTimerRef.current);
                      leaveTimerRef.current = null;
                    }
                    setOpenMenu(item.label);
                  }}
                  onMouseLeave={() => {
                    if (leaveTimerRef.current) {
                      clearTimeout(leaveTimerRef.current);
                    }
                    leaveTimerRef.current = setTimeout(() => {
                      setOpenMenu(null);
                      leaveTimerRef.current = null;
                    }, 160);
                  }}
                >
                  <div className="nav-parent-row">
                    <TransitionLink
                      href={item.to ?? "/services"}
                      className={`nav-parent${servicesActive ? " is-active" : ""}`}
                      aria-current={
                        pathname === "/services" ? "page" : undefined
                      }
                      onClick={() => setOpenMenu(null)}
                    >
                      {item.label}
                    </TransitionLink>
                    <button
                      type="button"
                      className={`nav-parent-toggle${openMenu === item.label ? " is-open" : ""}${
                        servicesActive ? " is-active" : ""
                      }`}
                      aria-label={`${item.label} menu`}
                      aria-haspopup="menu"
                      aria-expanded={openMenu === item.label}
                      onClick={(event) => {
                        event.preventDefault();
                        setOpenMenu((current) =>
                          current === item.label ? null : item.label,
                        );
                      }}
                    >
                      <span className="nav-caret" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none">
                          <path
                            d="M4 6.25 8 10.25 12 6.25"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                  <ul className="nav-dropdown" role="menu">
                    {item.children.map((child) => {
                      const active = pathMatches(pathname, child.to);
                      return (
                        <li key={child.to} role="none">
                          <TransitionLink
                            href={child.to}
                            role="menuitem"
                            className={`nav-dropdown-link${active ? " is-active" : ""}`}
                            aria-current={active ? "page" : undefined}
                            onClick={() => setOpenMenu(null)}
                          >
                            {child.icon && SERVICE_ICONS[child.icon] ? (
                              <span className="nav-dropdown-icon">
                                {SERVICE_ICONS[child.icon]}
                              </span>
                            ) : null}
                            <span className="nav-dropdown-text">
                              <span className="nav-dropdown-title">
                                {child.label}
                              </span>
                              {child.description ? (
                                <span className="nav-dropdown-desc">
                                  {child.description}
                                </span>
                              ) : null}
                            </span>
                          </TransitionLink>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ) : (
                <li key={item.label}>
                  <TransitionLink
                    href={item.to!}
                    className={
                      item.to !== "/" && pathMatches(pathname, item.to!)
                        ? "is-active"
                        : undefined
                    }
                    aria-current={
                      item.to !== "/" && pathMatches(pathname, item.to!)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ),
            )}
          </ul>
          <div className="nav-right">
            <TransitionLink
              href="/contact"
              className={`btn-nav${contactActive ? " is-active" : ""}`}
              aria-current={contactActive ? "page" : undefined}
            >
              Contact Us
            </TransitionLink>
            <button
              type="button"
              className={`nav-burger${mobileOpen ? " is-open" : ""}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="nav-mobile-drawer"
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>
      <div className="nav-spacer" aria-hidden="true" />

      <div
        className={`nav-drawer-backdrop${mobileOpen ? " is-open" : ""}`}
        onClick={closeMobile}
        aria-hidden="true"
      />
      <aside
        id="nav-mobile-drawer"
        className={`nav-drawer${mobileOpen ? " is-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="nav-drawer-head">
          <span className="nav-drawer-title">Menu</span>
          <button
            type="button"
            className="nav-drawer-close"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <ul className="nav-drawer-links">
          {NAV.map((item) =>
            "children" in item && item.children ? (
              <li key={item.label} className="nav-drawer-item">
                <button
                  type="button"
                  className={`nav-drawer-parent${mobileServicesOpen ? " is-open" : ""}${
                    servicesActive ? " is-active" : ""
                  }`}
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((open) => !open)}
                >
                  {item.label}
                  <span className="nav-drawer-caret" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 6.25 8 10.25 12 6.25"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <ul
                  className={`nav-drawer-sub${mobileServicesOpen ? " is-open" : ""}`}
                >
                  {item.to ? (
                    <li>
                      <TransitionLink
                        href={item.to}
                        className={
                          pathname === item.to ? "is-active" : undefined
                        }
                        aria-current={
                          pathname === item.to ? "page" : undefined
                        }
                        onClick={closeMobile}
                      >
                        <span className="nav-drawer-sub-text">
                          <span className="nav-drawer-sub-title">
                            All Services
                          </span>
                          <span className="nav-drawer-sub-desc">
                            Overview of how we help leadership decide
                          </span>
                        </span>
                      </TransitionLink>
                    </li>
                  ) : null}
                  {item.children.map((child) => {
                    const active = pathMatches(pathname, child.to);
                    return (
                      <li key={child.to}>
                        <TransitionLink
                          href={child.to}
                          className={active ? "is-active" : undefined}
                          aria-current={active ? "page" : undefined}
                          onClick={closeMobile}
                        >
                          {child.icon && SERVICE_ICONS[child.icon] ? (
                            <span className="nav-drawer-sub-icon">
                              {SERVICE_ICONS[child.icon]}
                            </span>
                          ) : null}
                          <span className="nav-drawer-sub-text">
                            <span className="nav-drawer-sub-title">
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className="nav-drawer-sub-desc">
                                {child.description}
                              </span>
                            ) : null}
                          </span>
                        </TransitionLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ) : (
              <li key={item.label} className="nav-drawer-item">
                <TransitionLink
                  href={item.to!}
                  className={
                    item.to !== "/" && pathMatches(pathname, item.to!)
                      ? "is-active"
                      : undefined
                  }
                  aria-current={
                    item.to !== "/" && pathMatches(pathname, item.to!)
                      ? "page"
                      : undefined
                  }
                  onClick={closeMobile}
                >
                  {item.label}
                </TransitionLink>
              </li>
            ),
          )}
          <li className="nav-drawer-item nav-drawer-cta">
            <TransitionLink
              href="/contact"
              className="btn btn-primary"
              onClick={closeMobile}
            >
              Contact Us
            </TransitionLink>
          </li>
        </ul>
      </aside>
    </>
  );
}
