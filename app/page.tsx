"use client";

import Preloader from "@/components/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import CredibilitySection from "@/components/sections/CredibilitySection";
import RotatingStatementSection from "@/components/sections/RotatingStatementSection";
import WorkPortalSection from "@/components/sections/WorkPortalSection";
import StudiosPortalSection from "@/components/sections/StudiosPortalSection";
import RegionalSection from "@/components/sections/RegionalSection";
import PreFooterCTASection from "@/components/sections/PreFooterCTASection";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <HeroSection />
        <CredibilitySection />
        <WorkPortalSection />
        <RotatingStatementSection />
        <StudiosPortalSection />
        <RegionalSection />
        <PreFooterCTASection />
      </main>
    </>
  );
}
