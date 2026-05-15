"use client";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ScrollIndicator() {
  const diamondRef  = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const rotationRef = useRef(45);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = (e: Event) => {
      const { scrollY, progress } = (e as CustomEvent<{ scrollY: number; progress: number }>).detail;
      if (scrollY > 40 && !visible) setVisible(true);
      if (scrollY <= 40 && visible)  setVisible(false);

      const delta = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;
      rotationRef.current += delta * 0.18;

      if (diamondRef.current) {
        diamondRef.current.style.top = `${4 + progress * 92}%`;
        diamondRef.current.style.transform = `translate(-50%, -50%) rotate(${rotationRef.current}deg)`;
      }
    };

    window.addEventListener("lenis:scroll", onScroll);
    return () => window.removeEventListener("lenis:scroll", onScroll);
  }, [visible]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        right: 12,
        top: 0,
        bottom: 0,
        width: 20,
        zIndex: 90,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 400ms ease",
      }}
    >
      {/* Vertical track line — desktop only */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "4%",
            bottom: "4%",
            width: 1,
            background: "rgba(255,255,255,0.1)",
            transform: "translateX(-50%)",
          }}
        />
      )}
      <div
        ref={diamondRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "4%",
          transform: "translate(-50%, -50%) rotate(45deg)",
          width: 9,
          height: 9,
          background: "var(--burnt-horizon)",
          willChange: "transform, top",
        }}
      />
    </div>
  );
}
