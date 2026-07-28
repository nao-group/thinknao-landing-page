"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Unlimited, Verified-Correct Practice",
    description: "Start with a curated bank of questions matched to real CSCA question types. Once you've worked through them, ThinkNAO's AI generates new questions in the same style — so you always have something new to practice. Every question passes an automated mathematical verification check before it reaches you.",
    visual: "practice",
  },
  {
    number: "02",
    title: "Full CSCA Subject Coverage",
    description: "Maths, Physics, Chemistry, Liberal Art Chinese, and Science Chinese — practice questions built around the actual structure and difficulty of the CSCA exam.",
    visual: "subjects",
  },
  {
    number: "03",
    title: "Bilingual by Design",
    description: "Study seamlessly in English or Chinese, built specifically for Indonesian students navigating a Chinese-language entrance exam — not adapted from a mainland Chinese product.",
    visual: "bilingual",
  },
  {
    number: "04",
    title: "Adaptive Mastery Tracking",
    description: "ThinkNAO learns where you're strong and where you're not, adjusting what you practice next based on your real performance — so your study time goes where it matters most.",
    visual: "adaptive",
  },
  {
    number: "05",
    title: "Full-Length Mock Exams",
    description: "Simulate real exam conditions with timed, structured mock tests that mirror the actual CSCA format.",
    visual: "mockexam",
  },
  {
    number: "06",
    title: "Flashcards",
    description: "Quick-review flashcards for formulas, vocabulary, and key concepts — built for fast recall, not just recognition.",
    visual: "flashcards",
  },
  {
    number: "07",
    title: "AI Study Assistant",
    description: "Get help exactly when you need it — grounded in verified answer keys, with guided hints instead of instant answers, so you build understanding instead of just copying solutions.",
    visual: "aiassistant",
    badge: "Coming Soon",
  },
  {
    number: "08",
    title: "Community & Leaderboard",
    description: "Compete with peers, track your ranking, and connect with other students preparing for the same universities in a dedicated Discord community.",
    visual: "community",
    badge: "Coming Soon",
  },
];

// Pre-calculated clock tick positions to avoid SSR/client floating-point mismatch
const clockTicks = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * 30 - 90) * (Math.PI / 180);
  const inner = i % 3 === 0 ? 38 : 42;
  return {
    x1: parseFloat((100 + Math.cos(angle) * inner).toFixed(2)),
    y1: parseFloat((75 + Math.sin(angle) * inner).toFixed(2)),
    x2: parseFloat((100 + Math.cos(angle) * 46).toFixed(2)),
    y2: parseFloat((75 + Math.sin(angle) * 46).toFixed(2)),
    thick: i % 3 === 0,
  };
});

// 01 — Infinity ∞ symbol + animated checkmarks
function PracticeVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Infinity ghost */}
      <path
        d="M 58,80 C 58,52 80,52 100,80 C 120,108 142,108 142,80 C 142,52 120,52 100,80 C 80,108 58,108 58,80"
        fill="none" stroke="currentColor" strokeWidth="3" opacity="0.12"
      />
      {/* Infinity drawing */}
      <path
        d="M 58,80 C 58,52 80,52 100,80 C 120,108 142,108 142,80 C 142,52 120,52 100,80 C 80,108 58,108 58,80"
        fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
      >
        <animate attributeName="stroke-dasharray" values="0 320;320 0;320 0" dur="3s" repeatCount="indefinite" />
        <animate attributeName="stroke-dashoffset" values="0;0;-320" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Verified check badges */}
      {[
        { cx: 62, cy: 42, delay: "0.6s" },
        { cx: 138, cy: 42, delay: "1.6s" },
        { cx: 100, cy: 132, delay: "2.6s" },
      ].map(({ cx, cy, delay }, i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="13" fill="none" stroke="currentColor" strokeWidth="1.5">
            <animate attributeName="opacity" values="0;0.5;0.5;0" dur="3s" begin={delay} repeatCount="indefinite" />
          </circle>
          <path
            d={`M ${cx - 6},${cy} L ${cx - 1},${cy + 5} L ${cx + 7},${cy - 6}`}
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <animate attributeName="stroke-dasharray" values="0 22;22 0;22 0" dur="3s" begin={delay} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" dur="3s" begin={delay} repeatCount="indefinite" />
          </path>
        </g>
      ))}
    </svg>
  );
}

// 02 — Colored subject icon cards matching thinknao-web palette
function SubjectsVisual() {
  // 2×2 grid: box 54×54, centered in 200×172 viewBox
  // Row 1: y=4 → bottom y=58, labels at y=70
  // Row 2: y=88 → bottom y=142, labels at y=154
  // 18px gap between row-1 label (70) and row-2 top (88) — no overlap
  const items = [
    { bx: 40,  by: 4,  cx: 67,  cy: 31, bg: "#F7E7D3", color: "#D4A017", type: "math",      label: "Maths"   },
    { bx: 106, by: 4,  cx: 133, cy: 31, bg: "#ECEDF8", color: "#6670B0", type: "physics",   label: "Physics" },
    { bx: 40,  by: 88, cx: 67,  cy: 115, bg: "#FDEEE9", color: "#C65D2E", type: "chemistry", label: "Chem"    },
    { bx: 106, by: 88, cx: 133, cy: 115, bg: "#EDE9FE", color: "#7C3AED", type: "chinese",   label: "Chinese" },
  ];

  return (
    <svg viewBox="0 0 200 172" className="w-full h-full">
      {items.map(({ bx, by, cx, cy, bg, color, type, label }, i) => (
        <g key={type} opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.35s" begin={`${i * 0.14}s`} fill="freeze" />

          {/* Colored background card */}
          <rect x={bx} y={by} width="54" height="54" rx="12" fill={bg} />

          {/* Math: italic fx */}
          {type === "math" && (
            <text
              x={cx} y={cy + 9}
              textAnchor="middle"
              fontSize="22"
              fontStyle="italic"
              fontFamily="Georgia, 'Times New Roman', serif"
              fill={color}
            >
              fx
            </text>
          )}

          {/* Physics: rotating Bohr atom */}
          {type === "physics" && (
            <g transform={`translate(${cx}, ${cy})`}>
              <g>
                <animateTransform
                  attributeName="transform" type="rotate"
                  from="0 0 0" to="360 0 0"
                  dur="7s" repeatCount="indefinite"
                />
                <ellipse cx="0" cy="0" rx="14" ry="5" fill="none" stroke={color} strokeWidth="1.8" />
                <ellipse cx="0" cy="0" rx="14" ry="5" fill="none" stroke={color} strokeWidth="1.8" transform="rotate(60)" />
                <ellipse cx="0" cy="0" rx="14" ry="5" fill="none" stroke={color} strokeWidth="1.8" transform="rotate(-60)" />
              </g>
              <circle cx="0" cy="0" r="3.5" fill={color} />
            </g>
          )}

          {/* Chemistry: Erlenmeyer flask with liquid */}
          {type === "chemistry" && (
            <g transform={`translate(${cx}, ${cy})`}>
              {/* Flask outline */}
              <path
                d="M -4,-16 L -4,-6 L -13,11 Q -13,17 -7,17 L 7,17 Q 13,17 13,11 L 4,-6 L 4,-16 Z"
                fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round"
              />
              {/* Rim */}
              <line x1="-6" y1="-16" x2="6" y2="-16" stroke={color} strokeWidth="2" strokeLinecap="round" />
              {/* Liquid fill */}
              <path
                d="M -4,3 L -13,11 Q -13,17 -7,17 L 7,17 Q 13,17 13,11 L 4,3 Z"
                fill={color} opacity="0.35"
              />
              {/* Bubble */}
              <circle cx="2" cy="9" r="2" fill={color} opacity="0.65">
                <animate attributeName="cy" values="9;4;9" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.65;0.2;0.65" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {/* Chinese: 文 character */}
          {type === "chinese" && (
            <text
              x={cx} y={cy + 10}
              textAnchor="middle"
              fontSize="26"
              fontFamily="serif"
              fill={color}
            >
              文
            </text>
          )}

          {/* Label */}
          <text
            x={cx} y={by + 66}
            textAnchor="middle"
            fontSize="8.5"
            fontFamily="monospace"
            fill={color}
            opacity="0.7"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// 03 — EN ↔ 中 translation arrows
function BilingualVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* EN box */}
      <rect x="18" y="52" width="68" height="56" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <text x="52" y="90" textAnchor="middle" fontSize="26" fontFamily="monospace" fontWeight="bold" fill="currentColor" opacity="0.85">EN</text>

      {/* 中 box */}
      <rect x="114" y="52" width="68" height="56" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <text x="148" y="90" textAnchor="middle" fontSize="28" fontFamily="monospace" fontWeight="bold" fill="currentColor" opacity="0.85">中</text>

      {/* Arrow EN → ZH */}
      <path d="M 90,74 L 112,74" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0 24;24 0;24 0;24 0" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
      </path>
      <polygon points="112,70 120,74 112,78" fill="currentColor">
        <animate attributeName="opacity" values="0;0;1;0" dur="3s" repeatCount="indefinite" />
      </polygon>

      {/* Arrow ZH → EN */}
      <path d="M 112,94 L 90,94" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0 24;24 0;24 0;24 0" dur="3s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </path>
      <polygon points="90,90 82,94 90,98" fill="currentColor">
        <animate attributeName="opacity" values="0;0;1;0" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </polygon>

      <text x="52"  y="124" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.4">English</text>
      <text x="148" y="124" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.4">Chinese</text>
    </svg>
  );
}

// 04 — Bar chart growing with trend line (adaptive progress)
function AdaptiveVisual() {
  const baseline = 128;
  const bars = [
    { h: 28, x: 28 },
    { h: 44, x: 56 },
    { h: 36, x: 84 },
    { h: 62, x: 112 },
    { h: 82, x: 140 },
  ];

  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <line x1="18" y1={baseline} x2="182" y2={baseline} stroke="currentColor" strokeWidth="1" opacity="0.18" />

      {bars.map(({ h, x }, i) => (
        <g key={i}>
          <rect x={x} y={baseline - h} width="22" height={h} rx="3" fill="currentColor" opacity="0.12">
            <animate attributeName="height" values={`0;${h}`} dur="0.8s" begin={`${i * 0.18}s`} fill="freeze" />
            <animate attributeName="y" values={`${baseline};${baseline - h}`} dur="0.8s" begin={`${i * 0.18}s`} fill="freeze" />
            <animate attributeName="opacity" values="0.12;0.28;0.12" dur="3s" begin={`${i * 0.5 + 1}s`} repeatCount="indefinite" />
          </rect>
        </g>
      ))}

      {/* Trend line */}
      <polyline
        points={bars.map(({ h, x }) => `${x + 11},${baseline - h}`).join(" ")}
        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"
      >
        <animate attributeName="stroke-dasharray" values="0 300;300 0" dur="1.2s" begin="0.4s" fill="freeze" />
      </polyline>

      {/* Pulsing dot on latest bar */}
      <circle cx="151" cy={baseline - 82} r="5" fill="currentColor">
        <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Up arrow */}
      <path d="M 172,55 L 172,34 M 165,42 L 172,34 L 179,42"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0">
        <animate attributeName="opacity" values="0;0.6" dur="0.4s" begin="1.2s" fill="freeze" />
        <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" begin="1.6s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

// 05 — Clock/timer for mock exam
function MockExamVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Clock face */}
      <circle cx="100" cy="75" r="50" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.18" />
      {/* Progress ring */}
      <circle
        cx="100" cy="75" r="50"
        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="314" strokeDashoffset="314"
        transform="rotate(-90 100 75)"
        opacity="0.7"
      >
        <animate attributeName="stroke-dashoffset" values="314;0" dur="5s" repeatCount="indefinite" />
      </circle>

      {/* Tick marks (pre-calculated to avoid hydration mismatch) */}
      {clockTicks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke="currentColor" strokeWidth={t.thick ? 2 : 1} opacity={t.thick ? 0.45 : 0.2} />
      ))}

      {/* Minute hand — fast */}
      <line x1="100" y1="75" x2="100" y2="33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.65">
        <animateTransform attributeName="transform" type="rotate" from="0 100 75" to="360 100 75" dur="5s" repeatCount="indefinite" />
      </line>

      {/* Hour hand — slow */}
      <line x1="100" y1="75" x2="100" y2="50" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 100 75" to="360 100 75" dur="60s" repeatCount="indefinite" />
      </line>

      <circle cx="100" cy="75" r="4" fill="currentColor" />
      <text x="100" y="148" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.45">MOCK EXAM</text>
    </svg>
  );
}

// 06 — Flipping flashcard (formula → answer)
function FlashcardsVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Shadow card */}
      <rect x="47" y="26" width="118" height="78" rx="6" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.18"
        transform="rotate(4 106 65)" />

      {/* Card body */}
      <rect x="40" y="30" width="120" height="78" rx="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />

      {/* Front: question (visible, then hides) */}
      <g>
        <text x="100" y="62" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.45">Question</text>
        <text x="100" y="80" textAnchor="middle" fontSize="16" fontFamily="monospace" fill="currentColor">
          ∫ x dx = ?
          <animate attributeName="opacity" values="0.9;0.9;0;0;0.9" dur="4s" repeatCount="indefinite" />
        </text>
      </g>

      {/* Back: answer (hidden, then reveals) */}
      <g>
        <text x="100" y="62" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">
          Answer
          <animate attributeName="opacity" values="0;0;0.45;0.45;0" dur="4s" repeatCount="indefinite" />
        </text>
        <text x="100" y="80" textAnchor="middle" fontSize="16" fontFamily="monospace" fontWeight="600" fill="currentColor">
          x² / 2 + C
          <animate attributeName="opacity" values="0;0;0.9;0.9;0" dur="4s" repeatCount="indefinite" />
        </text>
      </g>

      {/* Divider line */}
      <line x1="55" y1="68" x2="145" y2="68" stroke="currentColor" strokeWidth="0.8" opacity="0.18" />

      {/* Flip arrow */}
      <path d="M 118,120 Q 136,114 148,120 Q 136,126 118,120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
      </path>
      <text x="100" y="143" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.35">tap to flip</text>
    </svg>
  );
}

// 07 — AI Study Assistant: chat bubbles with hint
function AIAssistantVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* User bubble */}
      <rect x="16" y="18" width="112" height="42" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <animate attributeName="opacity" values="0;0.5;0.5;0.5;0.5" dur="5s" repeatCount="indefinite" />
      </rect>
      <line x1="30" y1="33" x2="90" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <animate attributeName="opacity" values="0;0;0.4;0.4;0.4" dur="5s" repeatCount="indefinite" />
      </line>
      <line x1="30" y1="44" x2="112" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <animate attributeName="opacity" values="0;0;0.28;0.28;0.28" dur="5s" repeatCount="indefinite" />
      </line>

      {/* Thinking dots */}
      {[72, 86, 100].map((cx, i) => (
        <circle key={i} cx={cx} cy="86" r="4" fill="currentColor" opacity="0">
          <animate attributeName="opacity" values="0;0;0.7;0;0" dur="5s" begin={`${1.2 + i * 0.25}s`} repeatCount="indefinite" />
          <animate attributeName="r" values="3;5;3" dur="0.7s" begin={`${1.2 + i * 0.25}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* AI reply bubble */}
      <rect x="72" y="100" width="112" height="46" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <animate attributeName="opacity" values="0;0;0;0.5;0.5" dur="5s" repeatCount="indefinite" />
      </rect>
      <text x="88" y="119" fontSize="8" fontFamily="monospace" fill="currentColor">
        Hint: Try substitution
        <animate attributeName="opacity" values="0;0;0;0.55;0.55" dur="5s" repeatCount="indefinite" />
      </text>
      <line x1="88" y1="128" x2="170" y2="128" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <animate attributeName="opacity" values="0;0;0;0.28;0.28" dur="5s" repeatCount="indefinite" />
      </line>
      <line x1="88" y1="136" x2="152" y2="136" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <animate attributeName="opacity" values="0;0;0;0.22;0.22" dur="5s" repeatCount="indefinite" />
      </line>

      {/* Sparkle */}
      <path d="M 158,26 L 160,20 L 162,26 L 168,28 L 162,30 L 160,36 L 158,30 L 152,28 Z"
        fill="currentColor" opacity="0.55">
        <animate attributeName="opacity" values="0.55;0.9;0.55" dur="2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

// 08 — Community leaderboard podium
function CommunityVisual() {
  const baseline = 138;
  const podiums = [
    { rank: "2nd", x: 26,  w: 48, h: 54, delay: "0.25s", opacity: "0.18" },
    { rank: "1st", x: 76,  w: 48, h: 78, delay: "0s",    opacity: "0.28" },
    { rank: "3rd", x: 126, w: 48, h: 36, delay: "0.45s", opacity: "0.12" },
  ];

  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Baseline */}
      <line x1="18" y1={baseline} x2="182" y2={baseline} stroke="currentColor" strokeWidth="1.5" opacity="0.28" />

      {podiums.map(({ rank, x, w, h, delay, opacity }) => (
        <g key={rank}>
          <rect x={x} y={baseline - h} width={w} height={h} rx="3" fill="currentColor" opacity={0}>
            <animate attributeName="height" values={`0;${h}`} dur="0.7s" begin={delay} fill="freeze" />
            <animate attributeName="y" values={`${baseline};${baseline - h}`} dur="0.7s" begin={delay} fill="freeze" />
            <animate attributeName="opacity" values={`0;${opacity}`} dur="0.7s" begin={delay} fill="freeze" />
          </rect>
          <text x={x + w / 2} y={baseline - h - 8} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0">
            {rank}
            <animate attributeName="opacity" values="0;0.5" dur="0.4s" begin={delay} fill="freeze" />
          </text>
        </g>
      ))}

      {/* Trophy on 1st */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;1" dur="0.4s" begin="0.8s" fill="freeze" />
        <path d="M 90,32 Q 90,48 100,52 Q 110,48 110,32"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="87" y1="40" x2="90" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="110" y1="40" x2="113" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="100" y1="52" x2="100" y2="57" stroke="currentColor" strokeWidth="2" />
        <line x1="93" y1="57" x2="107" y2="57" stroke="currentColor" strokeWidth="2" />
      </g>

      {/* Stars */}
      {[{ x: 74, y: 22, delay: "1s" }, { x: 100, y: 15, delay: "1.15s" }, { x: 126, y: 22, delay: "1.3s" }].map(({ x, y, delay }, i) => (
        <text key={i} x={x} y={y} textAnchor="middle" fontSize="11" fill="currentColor" opacity="0">
          ★
          <animate attributeName="opacity" values="0;0.65" dur="0.4s" begin={delay} fill="freeze" />
          <animate attributeName="opacity" values="0.65;0.9;0.65" dur="2s" begin="1.5s" repeatCount="indefinite" />
        </text>
      ))}
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "practice":    return <PracticeVisual />;
    case "subjects":    return <SubjectsVisual />;
    case "bilingual":   return <BilingualVisual />;
    case "adaptive":    return <AdaptiveVisual />;
    case "mockexam":    return <MockExamVisual />;
    case "flashcards":  return <FlashcardsVisual />;
    case "aiassistant": return <AIAssistantVisual />;
    case "community":   return <CommunityVisual />;
    default:            return <PracticeVisual />;
  }
}

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  return (
    <div className="group shrink-0 w-72 flex flex-col rounded-2xl border border-foreground/10 bg-card overflow-hidden cursor-default transition-all duration-300 ease-out hover:scale-[1.04] hover:border-[#D4A017] hover:shadow-[0_0_0_1px_#D4A017,0_10px_32px_rgba(212,160,23,0.12)] hover:bg-[#FFFCF4]">
      {/* Visual area */}
      <div className="h-44 flex items-center justify-center p-4 bg-foreground/[0.03] border-b border-foreground/10 text-foreground">
        <div className="w-36 h-32">
          <AnimatedVisual type={feature.visual} />
        </div>
      </div>

      {/* Text area */}
      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground">{feature.number}</span>
          {"badge" in feature && feature.badge && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 border border-foreground/20 text-muted-foreground rounded">
              {feature.badge}
            </span>
          )}
        </div>
        <h3 className="text-base font-display leading-snug group-hover:translate-x-0.5 transition-transform duration-300">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef  = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>(0);
  const pausedRef   = useRef(false);

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

  // Auto-scroll: 0.6 px/frame (~36 px/s at 60 fps), loops seamlessly
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const SPEED = 0.6;

    const tick = () => {
      if (!pausedRef.current && el) {
        el.scrollLeft += SPEED;
        // Loop: when we reach the end, jump back to start
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const pause  = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend",   resume);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend",   resume);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Features
            </span>
            <h2
              className={`text-4xl lg:text-6xl font-display font-bold tracking-tight text-[#0F172A] transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Everything you need.
              <br />
              <span className="text-[#D4A017]">Built for the CSCA.</span>
            </h2>
          </div>

          {/* Scroll arrows */}
          <div className="flex items-center gap-2 shrink-0 pb-1">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-xl border border-foreground/20 flex items-center justify-center text-muted-foreground transition-all duration-200 hover:border-[#D4A017] hover:text-foreground hover:shadow-[0_0_0_1px_#D4A017] hover:scale-105 active:scale-95"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-xl border border-foreground/20 flex items-center justify-center text-muted-foreground transition-all duration-200 hover:border-[#D4A017] hover:text-foreground hover:shadow-[0_0_0_1px_#D4A017] hover:scale-105 active:scale-95"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Full-width horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-6 lg:px-12 pt-4 pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature) => (
          <FeatureCard key={feature.number} feature={feature} />
        ))}
        {/* Trailing spacer */}
        <div className="shrink-0 w-6 lg:w-12" />
      </div>
    </section>
  );
}
