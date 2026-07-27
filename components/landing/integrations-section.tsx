"use client";

import { useEffect, useState, useRef } from "react";

const integrations = [
  { name: "DKI Jakarta", category: "Java" },
  { name: "Jawa Barat", category: "Java" },
  { name: "Jawa Tengah", category: "Java" },
  { name: "Jawa Timur", category: "Java" },
  { name: "Banten", category: "Java" },
  { name: "DI Yogyakarta", category: "Java" },
  { name: "Sumatera Utara", category: "Sumatra" },
  { name: "Sumatera Selatan", category: "Sumatra" },
  { name: "Sulawesi Selatan", category: "Sulawesi" },
  { name: "Kalimantan Timur", category: "Kalimantan" },
  { name: "Bali", category: "Bali & Nusa Tenggara" },
  { name: "Papua", category: "Maluku & Papua" },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="integrations" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Coverage
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Reaching students
            <br />
            across Indonesia.
          </h2>
          <p className="text-xl text-muted-foreground">
            From Jakarta to Papua — ThinkNAO is built for Indonesian students, wherever you study.
          </p>
        </div>

      </div>
      
      {/* Full-width marquees outside container */}
      <div className="w-full mb-6">
        <div className="flex gap-6 marquee">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {integrations.map((integration) => (
                <div
                  key={`${integration.name}-${setIndex}`}
                  className="shrink-0 px-8 py-6 rounded-2xl border border-foreground/10 bg-card transition-all duration-300 ease-out group hover:scale-[1.06] hover:border-[#D4A017] hover:shadow-[0_0_0_1px_#D4A017,0_10px_32px_rgba(212,160,23,0.12)] hover:bg-[#FFFCF4] cursor-default"
                >
                  <div className="text-lg font-medium group-hover:translate-x-1 transition-transform">
                    {integration.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{integration.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Reverse marquee */}
      <div className="w-full">
        <div className="flex gap-6 marquee-reverse">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {[...integrations].reverse().map((integration) => (
                <div
                  key={`${integration.name}-reverse-${setIndex}`}
                  className="shrink-0 px-8 py-6 rounded-2xl border border-foreground/10 bg-card transition-all duration-300 ease-out group hover:scale-[1.06] hover:border-[#D4A017] hover:shadow-[0_0_0_1px_#D4A017,0_10px_32px_rgba(212,160,23,0.12)] hover:bg-[#FFFCF4] cursor-default"
                >
                  <div className="text-lg font-medium group-hover:translate-x-1 transition-transform">
                    {integration.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{integration.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
