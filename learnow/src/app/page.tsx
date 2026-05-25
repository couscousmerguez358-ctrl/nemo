import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import StatsSection from "@/components/landing/StatsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col pt-20">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
