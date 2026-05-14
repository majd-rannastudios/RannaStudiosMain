"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export default function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    const el = curtainRef.current;
    if (!el) return;

    if (isFirst.current) {
      isFirst.current = false;
      // Preloader handles the first reveal — park curtain off-screen immediately
      gsap.set(el, { yPercent: -100 });
      return;
    }

    // Subsequent navigations: snap to cover, then lift to reveal
    gsap.timeline()
      .set(el, { yPercent: 0, pointerEvents: "all" })
      .to(el, {
        yPercent: -100,
        duration: 0.88,
        ease: "power4.inOut",
        delay: 0.06,
        onComplete: () => {
          gsap.set(el, { pointerEvents: "none" });
        },
      });
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9989,
        background:
          "linear-gradient(160deg, var(--ember-dawn) 0%, var(--burnt-horizon) 28%, var(--crimson-bloom) 58%, var(--veil-becoming) 100%)",
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
