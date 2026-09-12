"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { usePageTransition } from "@/providers/TransitionProvider";

function isModifiedClick(event: MouseEvent) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  children?: ReactNode;
};

export default function TransitionLink({
  href,
  onClick,
  children = null,
  ...rest
}: TransitionLinkProps) {
  const { transitionTo } = usePageTransition();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          isModifiedClick(event) ||
          rest.target === "_blank"
        )
          return;
        event.preventDefault();
        event.stopPropagation();
        void transitionTo(href);
      }}
    >
      {children}
    </Link>
  );
}
