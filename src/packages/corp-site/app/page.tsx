"use client";

import HeroSection from "./home/hero-section.component";
import CTASection from "./home/cta-section.component";
import NewsSection from "./home/news-section.component";

export default function Page() {
  return (
    <>
      <section>
        <HeroSection />
      </section>

      <section className="container mx-auto p-8">
        <CTASection />
      </section>

      <section>
        <NewsSection />
      </section>
    </>
  );
}
