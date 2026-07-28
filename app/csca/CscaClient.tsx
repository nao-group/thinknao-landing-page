"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

const subjects = [
  { name: "Chinese (Liberal Arts)", lang: "Chinese only",    duration: "90 min", questions: "80 MCQ", score: "0–100", color: "#EDE9FE", accent: "#7C3AED", icon: "文" },
  { name: "Chinese (Science)",      lang: "Chinese only",    duration: "90 min", questions: "80 MCQ", score: "0–100", color: "#EDE9FE", accent: "#7C3AED", icon: "理" },
  { name: "Mathematics",            lang: "Chinese / English", duration: "60 min", questions: "48 MCQ", score: "0–100", color: "#F7E7D3", accent: "#D4A017", icon: "fx" },
  { name: "Physics",                lang: "Chinese / English", duration: "60 min", questions: "48 MCQ", score: "0–100", color: "#ECEDF8", accent: "#6670B0", icon: "⚛" },
  { name: "Chemistry",              lang: "Chinese / English", duration: "60 min", questions: "48 MCQ", score: "0–100", color: "#FDEEE9", accent: "#C65D2E", icon: "⌬" },
];

const schedule = [
  { label: "Next Exam",               value: "TBA — December 2026 sitting expected" },
  { label: "Registration Period",     value: "Announced with exam date on csca.cn" },
  { label: "Regular Schedule (2026+)", value: "5 times per year: Jan, Mar, Apr, Jun, Dec" },
  { label: "Results Release",         value: "7 business days (online), 14 days (paper)" },
];

const format = [
  { label: "Test Format",   value: "Home-based, computer-based, or paper-based" },
  { label: "Availability",  value: "Varies by exam session and region" },
  { label: "Scoring",       value: "0–100 points per subject" },
];

const fees = [
  { label: "1 Subject",  value: "¥450 CNY" },
  { label: "2+ Subjects", value: "¥700 CNY" },
  { label: "Payment",    value: "Alipay, WeChat Pay, or bank transfer" },
];

// Reusable scroll-reveal hook
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function CscaClient() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Shared Navigation */}
      <Navigation />

      <main className="max-w-5xl mx-auto px-6 pt-24 lg:pt-36 pb-24 space-y-20">

        {/* Hero */}
        <section id="about">
          <FadeSection>
            <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
              <span className="w-6 h-px bg-[#D4A017]" />
              Chinese University Entrance Exam
            </span>
            <h1 className="font-display font-bold text-5xl lg:text-7xl tracking-tight text-[#0F172A] leading-[1] mb-6">
              What is the
              <br />
              <span className="text-[#D4A017]">CSCA Exam?</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              The <strong className="text-foreground">CSCA exam (China Scholastic Competency Assessment)</strong> is a
              standardized assessment used by Chinese universities for international undergraduate admissions. It evaluates
              academic foundations in Mathematics, Physics, Chemistry, and Professional Chinese, depending on the subjects
              required by each program.
            </p>
            <p className="text-sm text-muted-foreground mt-5 max-w-2xl border-l-2 border-[#D4A017] pl-4">
              CSCA results are accepted by hundreds of Chinese universities and scholarship pathways, but exact requirements
              vary by university, major, and application channel. Confirm final requirements on{" "}
              <a href="https://csca.cn" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors">
                csca.cn
              </a>{" "}
              and your target university website.
            </p>
          </FadeSection>
        </section>

        {/* Subjects */}
        <section id="subjects">
          <FadeSection>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
              <span className="w-8 h-px bg-foreground/30" />
              Subjects
            </span>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#0F172A] mb-2">Exam Subjects</h2>
            <p className="text-muted-foreground mb-8">Subject details, duration, and language of instruction.</p>
          </FadeSection>

          <div className="grid gap-3">
            {subjects.map((s, i) => (
              <FadeSection key={s.name} delay={i * 80}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-card border border-foreground/10 cursor-default transition-all duration-300 ease-out hover:scale-[1.02] hover:border-[#D4A017] hover:shadow-[0_0_0_1px_#D4A017,0_8px_28px_rgba(212,160,23,0.1)] hover:bg-[#FFFCF4]">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold transition-transform duration-300"
                    style={{ background: s.color, color: s.accent }}
                  >
                    {s.icon}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{s.name}</p>
                    <p className="text-sm text-muted-foreground">{s.lang}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 text-sm shrink-0">
                    <div className="text-center">
                      <p className="font-semibold text-foreground">{s.duration}</p>
                      <p className="text-muted-foreground text-xs">Duration</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground">{s.questions}</p>
                      <p className="text-muted-foreground text-xs">Format</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-[#D4A017]">{s.score}</p>
                      <p className="text-muted-foreground text-xs">Score</p>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </section>

        {/* Schedule + Fees */}
        <section id="schedule" className="grid md:grid-cols-3 gap-6">
          <FadeSection className="md:col-span-2">
            <div className="h-full bg-card rounded-2xl border border-foreground/10 p-8 hover:border-[#D4A017] hover:shadow-[0_0_0_1px_#D4A017,0_8px_28px_rgba(212,160,23,0.08)] transition-all duration-300">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
                <span className="w-8 h-px bg-foreground/30" />
                Schedule
              </span>
              <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-6">Exam Schedule</h2>
              <div className="space-y-5">
                {schedule.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1 border-b border-foreground/6 pb-5 last:border-0 last:pb-0">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{item.label}</span>
                    <span className="text-foreground font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>

          <FadeSection delay={100}>
            <div className="h-full bg-[#0F172A] rounded-2xl p-8 text-white hover:shadow-[0_0_0_2px_#D4A017,0_8px_28px_rgba(212,160,23,0.15)] transition-all duration-300 hover:scale-[1.02]">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-4">
                <span className="w-8 h-px bg-white/20" />
                Fees
              </span>
              <h2 className="font-display font-bold text-2xl mb-6">Exam Fees</h2>
              <div className="space-y-5">
                {fees.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1 border-b border-white/10 pb-5 last:border-0 last:pb-0">
                    <span className="text-xs font-mono text-white/50 uppercase tracking-widest">{item.label}</span>
                    <span className="font-semibold text-[#D4A017]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>
        </section>

        {/* Exam Format */}
        <FadeSection>
          <div className="bg-card rounded-2xl border border-foreground/10 p-8 hover:border-[#D4A017] hover:shadow-[0_0_0_1px_#D4A017,0_8px_28px_rgba(212,160,23,0.08)] transition-all duration-300">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
              <span className="w-8 h-px bg-foreground/30" />
              Format
            </span>
            <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-8">Exam Format</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {format.map((item, i) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{item.label}</span>
                  <span className="text-foreground font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* CTA */}
        <FadeSection>
          <div className="rounded-2xl bg-[#D4A017] p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#0F172A] mb-2">
                Ready to prepare?
              </h2>
              <p className="text-[#0F172A]/70 max-w-md">
                ThinkNAO is built specifically for the CSCA — bilingual practice, verified questions, and adaptive tracking across all subjects.
              </p>
            </div>
            <a
              href="https://thinknao-web.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-[#0F172A] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:bg-[#0F172A]/90 hover:scale-[1.04] hover:shadow-[0_0_0_2px_#fff,0_6px_20px_rgba(0,0,0,0.2)]"
            >
              Start studying free →
            </a>
          </div>
        </FadeSection>

        {/* Disclaimer */}
        <FadeSection>
          <p className="text-xs text-center text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            This page is an independent study resource maintained by ThinkNAO and is not affiliated with or endorsed by csca.cn.
            Always confirm exam requirements directly with{" "}
            <a href="https://csca.cn" target="_blank" rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors">
              csca.cn
            </a>{" "}
            and your target university.
          </p>
        </FadeSection>

      </main>

      <FooterSection />
    </div>
  );
}
