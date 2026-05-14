"use client";
import { useEffect, useRef } from "react";

export function Lz({ color, className = "" }: { color?: string; className?: string }) {
  return (
    <span
      className={`lz ${className}`}
      style={color ? { background: color } : undefined}
    />
  );
}

export function MetaLabel({
  num,
  children,
  color,
  className = "",
}: {
  num?: string;
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`meta-label ${className}`}
      style={color ? { color } : undefined}
    >
      {num && (
        <span style={{ fontVariantNumeric: "tabular-nums", opacity: 0.7 }}>{num}</span>
      )}
      <span>{children}</span>
    </span>
  );
}

export function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Reveal({
  children,
  as: As = "div",
  delay = 0,
  className = "",
  style = {},
  ...rest
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const ref = useReveal();
  return (
    <As
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </As>
  );
}
