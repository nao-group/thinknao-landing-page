"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type BillingPeriod = "monthly" | "biannual" | "annual";

const plans = [
  {
    name: "Free",
    description: "Get started with CSCA prep at no cost",
    price: { monthly: 0, biannual: 0, annual: 0 },
    features: [
      "10 questions per day",
      "1 CSCA subject",
      "Basic progress tracking",
      "English only",
    ],
    cta: "Start free",
    popular: false,
  },
  {
    name: "Standard",
    description: "Full access for serious CSCA candidates",
    price: { monthly: 99000, biannual: 79000, annual: 69000 },
    features: [
      "Unlimited practice questions",
      "All 5 CSCA subjects",
      "AI question generation",
      "Bilingual — English & Chinese",
      "Adaptive mastery tracking",
      "Full-length mock exams",
      "Flashcards",
    ],
    cta: "Start trial",
    popular: true,
  },
  {
    name: "Premium",
    description: "Everything you need, plus AI-powered guidance",
    price: { monthly: 149000, biannual: 119000, annual: 99000 },
    features: [
      "Everything in Standard",
      "AI Study Assistant",
      "Guided hints & explanations",
      "Community & Leaderboard",
      "Discord community access",
      "Priority support",
    ],
    cta: "Get Premium",
    popular: false,
  },
];

function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const billingLabels: Record<BillingPeriod, string> = {
  monthly: "Monthly",
  biannual: "6 Months",
  annual: "Annual",
};

const billingDiscount: Record<BillingPeriod, string | null> = {
  monthly: null,
  biannual: "Save 20%",
  annual: "Save 30%",
};

export function PricingSection() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            Pricing
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Simple, transparent
            <br />
            <span className="text-stroke">pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Start free and upgrade when you&apos;re ready. Prices in Indonesian Rupiah — no hidden fees.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center gap-2 mb-16 flex-wrap">
          {(Object.keys(billingLabels) as BillingPeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setBilling(period)}
              className={`relative px-5 py-2 rounded-xl text-sm font-mono transition-all duration-200 ease-out border hover:scale-[1.05] active:scale-[0.97] ${
                billing === period
                  ? "bg-foreground text-background border-foreground shadow-[0_0_0_2px_#D4A017]"
                  : "border-foreground/20 text-muted-foreground hover:border-[#D4A017] hover:text-foreground hover:shadow-[0_0_0_1px_#D4A017,0_4px_12px_rgba(212,160,23,0.12)]"
              }`}
            >
              {billingLabels[period]}
              {billingDiscount[period] && (
                <span className={`ml-2 text-xs ${billing === period ? "text-background/70" : "text-muted-foreground"}`}>
                  {billingDiscount[period]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-8 lg:p-12 bg-background ${
                plan.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Most Popular
                </span>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl text-foreground mt-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-foreground/10">
                {plan.price[billing] === 0 ? (
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl lg:text-6xl text-foreground">Gratis</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl lg:text-5xl text-foreground">
                        {formatIDR(plan.price[billing])}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground mt-1 block">/bulan</span>
                    {billing !== "monthly" && (
                      <span className="text-xs font-mono text-muted-foreground mt-1 block">
                        ditagih {formatIDR(plan.price[billing] * (billing === "biannual" ? 6 : 12))} {billing === "biannual" ? "per 6 bulan" : "per tahun"}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 ease-out group hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_0_2px_#D4A017,0_6px_20px_rgba(212,160,23,0.18)] ${
                  plan.popular
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-[#D4A017] hover:bg-[#FFFCF4]"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Semua paket termasuk pembaruan otomatis dan enkripsi penuh.{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">
            Bandingkan semua fitur
          </a>
        </p>
      </div>
    </section>
  );
}
