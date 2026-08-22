"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpenCheck,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  Flame,
  GraduationCap,
  Heart,
  Languages,
  Menu,
  MessageCircle,
  Play,
  Quote,
  Sparkles,
  Target,
  Trophy,
  ThumbsUp,
  UserRound,
  X,
  Zap,
} from "lucide-react";

const features = [
  {
    // icon: Bot,
    eyebrow: "01 · Your always-on tutor",
    title: "AI assistant that teaches, not just answers.",
    body: "Ask in English or Chinese. Get a guided hint, a clear explanation, and the next step—grounded in verified answer keys.",
    className: "feature-ai",
  },
  {
    // icon: Sparkles,
    eyebrow: "02 · Practice without limits",
    title: "Questions that grow with you.",
    body: "When the curated bank runs out, ThinkNAO generates more. Difficulty ratios adapt gradually to your real performance.",
    className: "feature-practice",
  },
  {
    // icon: Clock3,
    eyebrow: "03 · Exam-day confidence",
    title: "Full-length mock exams.",
    body: "Train with the real CSCA rhythm: timed, structured, and scored with a useful post-exam breakdown.",
    className: "feature-exam",
  },
  {
    // icon: Trophy,
    eyebrow: "04 · Friendly competition",
    title: "A leaderboard worth climbing.",
    body: "Build a study streak, climb the monthly ranks, and unlock winner advantages and community rewards.",
    className: "feature-leaderboard",
  },
];

const audiences = [
  {
    icon: BookOpenCheck,
    title: "High school students",
    body: "Start early, build strong foundations, and stay ready ahead of the curve.",
    benefits: ["Build core concepts", "Smart practice", "Track milestones"],
    image: "/images/made-for/high-school.png",
    accent: "gold",
  },
  {
    icon: Target,
    title: "Independent learners",
    body: "Self-paced learning with AI guidance every step of the way.",
    benefits: ["Flexible study", "Adaptive planner", "Progress tracking"],
    image: "/images/made-for/independent.png",
    accent: "indigo",
  },
  {
    icon: GraduationCap,
    title: "University applicants",
    body: "Target your dream university with the right exam preparation.",
    benefits: ["Accurate insights", "Mock exams", "Apply confidently"],
    image: "/images/made-for/applicant.png",
    accent: "ink",
  },
];

const testimonials = [
  {
    quote: "For the first time, I can see exactly why my answer was wrong—and what to do next.",
    name: "Nadia Putri",
    detail: "CSCA applicant · Jakarta",
    initials: "NP",
  },
  {
    quote: "The bilingual explanations make technical Chinese feel much less intimidating.",
    name: "Kevin Wijaya",
    detail: "Science track · Surabaya",
    initials: "KW",
  },
  {
    quote: "It feels like the practice sets understand when I am ready for harder questions.",
    name: "Felicia Tan",
    detail: "Independent learner · Medan",
    initials: "FT",
  },
];

const subjects = [
  {
    id: "math",
    label: "Mathematics",
    labelCn: "算数学",
    description: "Functions, calculus, algebra, and the quantitative reasoning every CSCA problem demands.",
    gradient: "linear-gradient(150deg, #1c2d52 0%, #0f172a 100%)",
    symbol: "∑",
  },
  {
    id: "physics",
    label: "Physics",
    labelCn: "物理学",
    description: "Mechanics, thermodynamics, and electromagnetism—understand the principles behind every formula.",
    gradient: "linear-gradient(150deg, #0c3a50 0%, #071b28 100%)",
    symbol: "φ",
  },
  {
    id: "chemistry",
    label: "Chemistry",
    labelCn: "化学",
    description: "Atomic structure, reactions, and organic chemistry—grounded in verified CSCA content.",
    gradient: "linear-gradient(150deg, #301065 0%, #150830 100%)",
    symbol: "⬡",
  },
  {
    id: "stem-chinese",
    label: "STEM Chinese",
    labelCn: "理科汉语",
    description: "Master the technical Mandarin vocabulary needed to communicate science fluently in Chinese.",
    gradient: "linear-gradient(150deg, #8b1c1c 0%, #480e0e 100%)",
    symbol: "理",
  },
  {
    id: "humanities-chinese",
    label: "Humanities Chinese",
    labelCn: "文科汉语",
    description: "Academic reading, writing, and critical analysis in Mandarin for the humanities track.",
    gradient: "linear-gradient(150deg, #5c3208 0%, #2a1505 100%)",
    symbol: "文",
  },
];

const faqs = [
  {
    question: "What is the CSCA?",
    answer:
      "The CSCA is an entrance assessment used in the Chinese university application journey. ThinkNAO helps Indonesian students prepare across Maths, Physics, Chemistry, and Academic Chinese.",
  },
  {
    question: "How does unlimited practice work?",
    answer:
      "You begin with a curated question bank matched to CSCA-style topics. After you finish those questions, ThinkNAO can generate new, verified practice in the same style so your learning does not stop.",
  },
  {
    question: "Will the difficulty change automatically?",
    answer:
      "Yes. ThinkNAO gradually adjusts the ratio of easy, medium, and hard questions in each set based on your performance—without sudden difficulty spikes.",
  },
  {
    question: "Can I study in English and Chinese?",
    answer:
      "Yes. The experience is bilingual by design, so you can build subject mastery and the academic language confidence needed for the exam.",
  },
];

function ProductDashboard() {
  return (
    <div className="product-window" aria-label="ThinkNAO product preview">
      <div className="window-bar">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <span>app.thinknao.com</span>
        <div className="window-avatar">A</div>
      </div>
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <Image src="/logo/thinknao_o.svg" alt="" width={34} height={34} />
          <div className="sidebar-nav active"><BookOpenCheck size={16} /><span>Learn</span></div>
          <div className="sidebar-nav"><Target size={16} /><span>Practice</span></div>
          <div className="sidebar-nav"><Trophy size={16} /><span>Ranks</span></div>
          <div className="sidebar-nav"><UserRound size={16} /><span>Profile</span></div>
        </aside>
        <div className="dashboard-main">
          <header className="dashboard-header">
            <div>
              <span className="dashboard-kicker">GOOD MORNING, ALEX</span>
              <h3>Ready for today&apos;s climb?</h3>
            </div>
            <div className="streak-pill"><Flame size={15} fill="currentColor" /> 12 day streak</div>
          </header>
          <div className="dashboard-grid">
            <section className="continue-card">
              <div className="subject-icon"><Zap size={20} /></div>
              <div className="continue-copy">
                <span>CONTINUE LEARNING</span>
                <h4>Physics · Mechanics</h4>
                <div className="progress-track"><i /></div>
                <small>7 of 10 questions complete</small>
              </div>
              <button aria-label="Continue physics practice"><Play size={16} fill="currentColor" /></button>
            </section>
            <section className="mastery-card">
              <span>WEEKLY MASTERY</span>
              <div className="mastery-score"><strong>84</strong><small>/100</small></div>
              <div className="mini-bars" aria-hidden="true">
                {[34, 50, 42, 67, 58, 78, 84].map((height, index) => (
                  <i key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
            </section>
            <section className="topic-card">
              <div><Languages size={18} /><span>Academic Chinese</span></div>
              <strong>8 min review</strong>
              <small>Vocabulary · Set 04</small>
            </section>
            <section className="topic-card muted-topic">
              <div><Target size={18} /><span>Maths</span></div>
              <strong>Adaptive set</strong>
              <small>Functions · Medium</small>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureVisual({ type }: { type: string }) {
  if (type === "feature-ai") {
    return (
      <div className="ai-visual" aria-hidden="true">
        <div className="chat-message user-message">Why does acceleration stay constant here?</div>
        <div className="chat-message nao-message">
          <div className="nao-mark"><Bot size={15} /></div>
          <p>Look at the net force first. If the force and mass stay constant, what does <strong>a = F / m</strong> tell you?</p>
        </div>
        <div className="answer-options"><i>Force</i><i className="selected">Acceleration</i><i>Velocity</i></div>
      </div>
    );
  }

  if (type === "feature-practice") {
    return (
      <div className="practice-visual" aria-hidden="true">
        <div className="difficulty-row"><span>Adaptive difficulty</span><strong>Level 06</strong></div>
        <div className="difficulty-track"><i /><i /><i /><i /><i /><i className="current" /><i /><i /></div>
        <div className="ratio-card"><span>Current set mix</span><div><b className="easy">30% easy</b><b className="medium">50% medium</b><b className="hard">20% hard</b></div></div>
        <div className="generated-pill"><Sparkles size={14} /> New verified set generated</div>
      </div>
    );
  }

  if (type === "feature-exam") {
    return (
      <div className="exam-visual" aria-hidden="true">
        <div className="exam-top"><span>MOCK EXAM · 01</span><div><Clock3 size={14} /> 01:28:43</div></div>
        <div className="exam-question"><small>QUESTION 18 OF 40</small><p>Which expression represents the total mechanical energy?</p></div>
        <div className="exam-progress"><i /></div>
      </div>
    );
  }

  return (
    <div className="leaderboard-visual" aria-hidden="true">
      {[
        ["1", "NA", "Nadia A.", "9,840"],
        ["2", "KW", "Kevin W.", "9,620"],
        ["3", "FT", "Felicia T.", "9,410"],
      ].map(([rank, initials, name, score], index) => (
        <div className={`rank-row rank-${index + 1}`} key={rank}>
          <strong>{rank}</strong><i>{initials}</i><span>{name}</span><b>{score} XP</b>
        </div>
      ))}
    </div>
  );
}

export function ThinkNaoLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSubject, setActiveSubject] = useState<string>("math");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.08, rootMargin: "-7% 0px -7%" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => revealObserver.observe(element));

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      hero.style.setProperty("--hero-scroll", progress.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="main-content" className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="ThinkNAO home">
          <Image src="/logo/thinknao_full.svg" alt="ThinkNAO" width={130} height={30} priority />
        </a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#features" onClick={closeMenu}>Features</a>
          <a href="#community" onClick={closeMenu}>Community</a>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a className="nav-login mobile-only" href="#pricing" onClick={closeMenu}>Log in</a>
          <a className="button button-small mobile-only" href="#pricing" onClick={closeMenu}>Start learning <ArrowRight size={15} /></a>
        </div>
        <div className="nav-actions">
          <a className="nav-login" href="#pricing">Log in</a>
          <a className="button button-small" href="#pricing">Start learning <ArrowRight size={15} /></a>
        </div>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-sticky">
          <Image className="hero-background" src="/images/hero/china-background.webp" alt="Illustrated Chinese mountains, the Temple of Heaven, the Great Wall, and a distant skyline" fill sizes="100vw" priority />
          <div className="hero-wash" aria-hidden="true" />
          <div className="hero-copy">
            <h1>From today&apos;s practice<br />to <span>tomorrow&apos;s campus.</span></h1>
            <p>Master the CSCA with bilingual, verified practice that adapts to you—across Maths, Physics, Chemistry, and Academic Chinese.</p>
            <div className="hero-actions">
              <a className="button" href="#pricing">Start learning free <ArrowRight size={18} /></a>
              <a className="text-link" href="#features"><Play size={16} fill="currentColor" /> See how it works</a>
            </div>
          </div>
          <div className="dashboard-stage">
            <div className="floating-chip floating-chip-left"><div><Target size={18} /></div><span><small>Accuracy</small><strong>+18% this week</strong></span></div>
            <ProductDashboard />
            <div className="floating-chip floating-chip-right"><div><Award size={18} /></div><span><small>New achievement</small><strong>Physics climber</strong></span></div>
          </div>
          <Image className="great-wall" src="/images/hero/great-wall-layer.png" alt="" fill sizes="100vw" priority aria-hidden="true" />
          <a className="scroll-cue" href="#trust" aria-label="Scroll to reveal the ThinkNAO dashboard"><span>Scroll to reveal</span><i><ChevronDown size={15} /></i></a>
        </div>
      </section>

      <section className="trust-strip" id="trust" aria-label="Platform highlights">
        <p>ONE SMARTER PATH TO THE CSCA</p>
        <div className="trust-items">
          <span><Check /> Verified questions</span>
          <span><Languages /> English + Chinese</span>
          <span><Sparkles /> Unlimited practice</span>
          <span><Target /> Adaptive difficulty</span>
        </div>
      </section>

      <section className="section features-section" id="features">
        <div className="section-heading split-heading" data-reveal>
          <div><span className="section-number">01</span><p>CORE FEATURES</p></div>
          <h2>Everything you need.<br /><em>Nothing you don&apos;t.</em></h2>
          <p>ThinkNAO turns a complicated exam journey into one focused, personal learning loop.</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => {
            // const Icon = feature.icon;
            return (
              <article className={`feature-card ${feature.className}`} key={feature.title} data-reveal style={{ "--delay": `${index * 45}ms` } as React.CSSProperties}>
                <div className="feature-copy">
                  {/* <div className="feature-icon"><Icon size={22} /></div> */}
                  <span>{feature.eyebrow}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
                <FeatureVisual type={feature.className} />
              </article>
            );
          })}
        </div>
      </section>

      <section className="section subjects-section" id="subjects">
        <div className="subjects-header split-heading" data-reveal>
          <div><span className="section-number">✦</span><p>COVERED SUBJECTS</p></div>
          <h2>Five subjects.<br /><em>One platform.</em></h2>
          <p>Everything you need for the CSCA—organised into focused, adaptive learning paths across science and language.</p>
        </div>
        <div
          className="subjects-strip"
          data-reveal
          onMouseLeave={() => setActiveSubject("math")}
        >
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className={`subject-card${activeSubject === subject.id ? " is-active" : ""}`}
              style={{ "--subject-gradient": subject.gradient } as React.CSSProperties}
              onMouseEnter={() => setActiveSubject(subject.id)}
              onFocus={() => setActiveSubject(subject.id)}
              tabIndex={0}
              role="button"
              aria-label={subject.label}
            >
              <div className="subject-bg" aria-hidden="true" />
              <span className="subject-symbol" aria-hidden="true">{subject.symbol}</span>

              <div className="subject-collapsed" aria-hidden={activeSubject === subject.id}>
                <span className="subject-label-vertical">{subject.label}</span>
              </div>

              <div className="subject-expanded" aria-hidden={activeSubject !== subject.id}>
                <div className="subject-arrow"><ArrowUpRight size={16} /></div>
                <div className="subject-expanded-copy">
                  <span className="subject-cn">{subject.labelCn}</span>
                  <h3>{subject.label}</h3>
                  <p>{subject.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="community-section section" id="community" data-reveal>
        <div className="community-banner">
          <div className="community-illustration">
            <Image src="/images/community/discord-group.png" alt="Five ThinkNAO learners studying and talking together" width={1719} height={915} sizes="(max-width: 820px) 90vw, 340px" />
            <span className="social-bubble bubble-heart"><Heart size={15} fill="currentColor" /></span>
            <span className="social-bubble bubble-like"><ThumbsUp size={15} fill="currentColor" /></span>
            <span className="social-bubble bubble-chat"><MessageCircle size={15} /></span>
          </div>
          <div className="community-copy">
            <div className="discord-mark"><Image src="/images/community/discord.svg" alt="Discord Logo" width={40} height={40} /></div>
            <div>
              <div className="section-label"><span>02</span> COMMUNITY</div>
              <h2>Join the ThinkNAO Discord Community</h2>
              <p>Connect with peers, join study discussions, ask questions, share your progress, and stay motivated together.</p>
            </div>
          </div>
          <div className="community-actions">
            <div className="community-avatars" aria-label="Community members"><i>NA</i><i>KW</i><i>FT</i><i>RA</i></div>
            <span className="online-pill"><span className="live-dot" /> 2.6k online</span>
            <a className="button discord-button" href="https://discord.com" target="_blank" rel="noreferrer">Join Discord <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>

      <section className="section made-for-section" id="made-for">
        <div className="made-for-intro" data-reveal>
          <div className="section-label"><span>03</span> MADE FOR</div>
          <h2>Built for every<br /><em>CSCA aspirant.</em></h2>
          <p>Whether you&apos;re in high school or already learning independently, ThinkNAO adapts to your journey.</p>
          <div className="path-doodle" aria-hidden="true"><span>Simple steps,<br />real progress.</span><i /></div>
        </div>
        <div className="audience-grid">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <article className={`audience-card audience-${audience.accent}`} key={audience.title} data-reveal style={{ "--delay": `${index * 50}ms` } as React.CSSProperties}>
                <div className="audience-copy">
                  <div className="audience-title"><span><Icon size={22} /></span><h3>{audience.title}</h3></div>
                  <p>{audience.body}</p>
                  <ul>{audience.benefits.map((benefit) => <li key={benefit}><Check size={14} /> {benefit}</li>)}</ul>
                </div>
                <Image className="audience-image" src={audience.image} alt={`${audience.title} using ThinkNAO`} width={1363} height={1402} sizes="(max-width: 820px) 80vw, 290px" />
              </article>
            );
          })}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="testimonials-landscape" aria-hidden="true" />
        <div className="section testimonials-inner">
          <div className="section-heading split-heading testimonials-heading" data-reveal>
            <div><span className="section-number">04</span><p>LEARNER STORIES</p></div>
            <h2>Small wins.<br /><em>Big destinations.</em></h2>
            <div className="rating-block"><strong>4.9</strong><span>★★★★★</span><small>Early learner rating</small></div>
          </div>
          <div className="testimonial-marquee" data-reveal>
            <div className="testimonial-track">
              {[0, 1].map((groupIndex) => (
                <div className="testimonial-group" key={groupIndex} aria-hidden={groupIndex === 1 ? "true" : undefined}>
                  {testimonials.map((testimonial) => (
                    <figure key={`${groupIndex}-${testimonial.name}`}>
                      <Quote size={24} />
                      <blockquote>“{testimonial.quote}”</blockquote>
                      <figcaption><i>{testimonial.initials}</i><div><strong>{testimonial.name}</strong><span>{testimonial.detail}</span></div></figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="section-heading centered-heading" data-reveal>
          <div className="section-label"><span>05</span> SIMPLE PRICING</div>
          <h2>Invest in the destination.<br /><em>Start for free.</em></h2>
          <p>No complicated plans. Begin with the essentials, then unlock the complete ThinkNAO journey when you are ready.</p>
        </div>
        <div className="pricing-grid">
          <article className="price-card" data-reveal>
            <div className="price-head"><span>Explorer</span><p>Build your first consistent study habit.</p></div>
            <div className="price"><strong>Free</strong><span>forever</span></div>
            <a className="button button-outline" href="#top">Start exploring</a>
            <ul><li><Check /> Daily practice set</li><li><Check /> Progress overview</li><li><Check /> Community access</li><li><Check /> English + Chinese</li></ul>
          </article>
          <article className="price-card price-featured" data-reveal>
            <div className="popular-label"><Sparkles size={14} /> MOST POPULAR</div>
            <div className="price-head"><span>Climber</span><p>Everything you need to master the CSCA.</p></div>
            <div className="price"><small>Rp</small><strong>149k</strong><span>/ month</span></div>
            <a className="button button-cream" href="#top">Start 7-day free trial <ArrowRight size={17} /></a>
            <ul><li><Check /> Unlimited adaptive practice</li><li><Check /> AI study assistant</li><li><Check /> Full mock exams</li><li><Check /> Detailed explanations</li><li><Check /> Monthly leaderboard rewards</li></ul>
          </article>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-intro" data-reveal><div className="section-label"><span>06</span> FAQ</div><h2>Still curious?</h2><p>Here are the answers students ask us most. Need more help? Say hello in the community.</p><a className="text-link" href="mailto:hello@thinknao.com">Ask us anything <ArrowRight size={16} /></a></div>
        <div className="faq-list" data-reveal>
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={faq.question}>
                <button
                  className="faq-question"
                  id={`faq-question-${index}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span><strong>{faq.question}</strong><ChevronDown size={19} />
                </button>
                <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!isOpen}>
                  <div><p>{faq.answer}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="site-footer">
        <Image className="footer-landscape" src="/images/hero/china-background.webp" alt="" fill sizes="100vw" aria-hidden="true" />
        <div className="footer-overlay" aria-hidden="true" />
        <div className="footer-content">
          <div className="footer-cta" data-reveal><span>YOUR CAMPUS IS CLOSER THAN IT FEELS.</span><h2>Ready to make<br />the first move?</h2><a className="button button-cream" href="#pricing">Start learning free <ArrowRight size={18} /></a></div>
          <div className="footer-bottom">
            <Image src="/logo/thinknao_full_light.svg" alt="ThinkNAO" width={156} height={40} />
            <div><a href="#features">Features</a><a href="#community">Community</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div>
            <span>© {new Date().getFullYear()} ThinkNAO. Built for ambitious learners.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
