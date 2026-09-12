"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { BRAND } from "@/data/site";

gsap.registerPlugin(CustomEase, SplitText);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const ROWS = 4;

type TransitionContextValue = {
  transitionTo: (to: string) => Promise<void>;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within TransitionProvider");
  }
  return ctx;
}

function resolveTo(to: string) {
  return new URL(to, window.location.origin);
}

export default function TransitionProvider({ children }: { children: ReactNode }) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLSpanElement | null>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const wordsRef = useRef<Element[]>([]);
  const splitRef = useRef<SplitText | null>(null);
  const busyRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const locationRef = useRef({ pathname, search: "" });

  useEffect(() => {
    locationRef.current = {
      pathname,
      search: typeof window !== "undefined" ? window.location.search : "",
    };
  }, [pathname]);

  useEffect(() => {
    if (!headingRef.current) return;

    splitRef.current = new SplitText(headingRef.current, {
      type: "words",
      wordsClass: "word",
      mask: "words",
    });

    wordsRef.current = splitRef.current.words;
    gsap.set(wordsRef.current, { y: "100%" });
    if (logoRef.current) {
      gsap.set(logoRef.current, { autoAlpha: 0, y: 18, scale: 0.88 });
    }

    return () => {
      splitRef.current?.revert();
      splitRef.current = null;
    };
  }, []);

  const animateIn = useCallback((onComplete: () => void) => {
    const blocks = blocksRef.current.filter(Boolean);
    const words = wordsRef.current;
    const logo = logoRef.current;
    const tl = gsap.timeline({ onComplete });

    tl.set(gridRef.current, { pointerEvents: "all" });
    tl.set(textRef.current, { autoAlpha: 1 });
    tl.set(blocks, { transformOrigin: "left center", scaleX: 0 });
    if (words?.length) tl.set(words, { y: "100%" });
    if (logo) tl.set(logo, { autoAlpha: 0, y: 18, scale: 0.88 });

    tl.to(blocks, {
      scaleX: 1,
      duration: 1,
      ease: "hop",
      stagger: 0.075,
    });

    if (logo) {
      tl.to(
        logo,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power4.out",
        },
        "-=0.7",
      );
    }

    if (words?.length) {
      tl.to(
        words,
        {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
        },
        logo ? "-=0.55" : "-=0.6",
      );
    }

    return tl;
  }, []);

  const animateOut = useCallback((onComplete?: () => void) => {
    const blocks = blocksRef.current.filter(Boolean);
    const words = wordsRef.current;
    const logo = logoRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(gridRef.current, { pointerEvents: "none" });
        gsap.set(textRef.current, { autoAlpha: 0 });
        onComplete?.();
      },
    });

    tl.set(blocks, { transformOrigin: "right center", scaleX: 1 });

    if (logo) {
      tl.to(logo, {
        autoAlpha: 0,
        y: 14,
        scale: 0.92,
        duration: 0.55,
        ease: "power3.in",
      });
    }

    if (words?.length) {
      tl.to(
        words,
        {
          y: "100%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
        },
        logo ? "-=0.35" : 0,
      );
    }

    tl.to(
      blocks,
      {
        scaleX: 0,
        duration: 1,
        ease: "hop",
        stagger: 0.075,
      },
      words?.length || logo ? "-=1" : 0,
    );

    return tl;
  }, []);

  const transitionTo = useCallback(
    async (to: string) => {
      if (busyRef.current) return;

      const url = resolveTo(to);
      const nextPath = url.pathname + url.search;
      const current = locationRef.current;
      const currentSearch = current.search || "";

      if (url.pathname === current.pathname && url.search === currentSearch) {
        if (url.hash) {
          document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      busyRef.current = true;

      try {
        // Remember where we left from so legal Back uses the same animated transition.
        sessionStorage.setItem(
          "qe-return-to",
          current.pathname + currentSearch,
        );

        await new Promise<void>((resolve) => animateIn(resolve));
        router.push(nextPath + url.hash);
        window.scrollTo(0, 0);
        await new Promise<void>((r) =>
          requestAnimationFrame(() => requestAnimationFrame(() => r())),
        );
        if (url.hash) {
          document.querySelector(url.hash)?.scrollIntoView();
        }
        await new Promise<void>((resolve) => animateOut(resolve));
      } finally {
        busyRef.current = false;
      }
    },
    [router, animateIn, animateOut],
  );

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      <div ref={gridRef} className="transition-grid" aria-hidden="true">
        {Array.from({ length: ROWS }).map((_, i) => (
          <div
            key={i}
            className="transition-block"
            ref={(el) => {
              blocksRef.current[i] = el;
            }}
          />
        ))}
      </div>

      <div ref={textRef} className="transition-text" aria-hidden="true">
        <div className="transition-brand">
          <span className="transition-logo-anchor">
            <span ref={logoRef} className="transition-logo" />
          </span>
          <h1 ref={headingRef}>{BRAND}.</h1>
        </div>
      </div>

      {children}
    </TransitionContext.Provider>
  );
}
