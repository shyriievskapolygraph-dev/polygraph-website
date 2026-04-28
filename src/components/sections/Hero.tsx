"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { PHONE, PHONE_DISPLAY } from "@/lib/seo";
import { pushEvent } from "@/lib/gtm";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();
  const h = t.hero;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const anim = (delay: string): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
  });

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen"
      style={{
        backgroundColor: "#2A2A2A",
        backgroundImage: isMobile ? "url('/hero-mobile.png')" : "url('/bg-hero-n.png')",
        backgroundSize: isMobile ? "cover" : "contain",
        backgroundPosition: isMobile ? "center top" : "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ── MOBILE gradient veil — image visible top, text readable bottom ── */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(42,42,42,0.05) 0%, rgba(42,42,42,0.15) 35%, rgba(42,42,42,0.72) 58%, rgba(42,42,42,0.94) 74%, #2A2A2A 88%)",
        }}
      />

      {/* ── LAYOUT ── */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">

        {/* Desktop photo spacer */}
        <div className="hidden lg:block lg:w-[42%] xl:w-[38%] lg:min-h-screen flex-shrink-0" />

        {/* Text column */}
        <div
          className="flex-1 flex flex-col
            px-5 pb-24
            sm:px-8 sm:pb-12
            lg:px-12 lg:py-0 lg:justify-center
            xl:px-20"
        >
          {/* Mobile: flex spacer pushes content to bottom */}
          <div className="flex-1 lg:hidden" />

          <div className="relative w-full max-w-xl lg:max-w-none">

            {/* Label */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6" style={anim("0.1s")}>
              <span className="inline-block w-8 sm:w-10 h-px bg-[#C9A96E] shrink-0" />
              <span
                className="text-[11px] sm:text-[12px] tracking-[0.3em] text-[#C9A96E] uppercase font-light"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {h.label}
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-light text-[#F5F0EB] mb-4 sm:mb-5"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(40px, 7vw, 88px)",
                lineHeight: 1.0,
                ...anim("0.2s"),
              }}
            >
              {h.h1Line1}
              <br />
              <em className="not-italic" style={{ color: "#C9A96E" }}>{h.h1Line2}</em>
              <br />
              <span style={{ fontSize: "clamp(26px, 4.8vw, 56px)", fontWeight: 300 }}>
                {h.h1Line3}
              </span>
            </h1>

            {/* Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6" style={anim("0.3s")}>
              {h.pills.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 sm:px-3 py-1 border border-[rgba(201,169,110,0.35)] text-[#C9A96E] text-[11px] sm:text-[12px] tracking-[0.18em] sm:tracking-[0.2em] uppercase font-light"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div
              className="w-10 sm:w-12 h-px bg-[rgba(201,169,110,0.4)] mb-4 sm:mb-7"
              style={{
                transformOrigin: "left",
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                opacity:   visible ? 1 : 0,
                transition: "transform 0.6s ease 0.36s, opacity 0.6s ease 0.36s",
              }}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4" style={anim("0.52s")}>
              {/* Tap-to-call — mobile only */}
              <a
                href={`tel:${PHONE}`}
                onClick={() => pushEvent("phone_click", { location: "hero" })}
                className="lg:hidden group px-7 py-4 bg-[#C9A96E] hover:bg-[#B8944E] text-[#2A2A2A] text-[14px] tracking-[0.18em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 w-full relative overflow-hidden"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="absolute inset-0 rounded-none animate-ping bg-[#C9A96E] opacity-20" />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 5.55 5.55l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                </svg>
                {PHONE_DISPLAY}
              </a>

              <button
                onClick={() => scrollTo("#contact")}
                className="group px-7 sm:px-8 py-3.5 sm:py-4 bg-[#C9A96E] hover:bg-[#B8944E] text-[#2A2A2A] text-[14px] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] hidden sm:flex items-center justify-center gap-3 sm:w-fit"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {h.btn1}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>

              <button
                onClick={() => scrollTo("#services")}
                className="px-7 sm:px-8 py-3.5 sm:py-4 border border-[rgba(201,169,110,0.35)] text-[#C9A96E] text-[14px] tracking-[0.18em] uppercase font-light hover:border-[#C9A96E] hover:bg-[rgba(201,169,110,0.05)] transition-all duration-300 w-full sm:w-fit"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {h.btn2}
              </button>
            </div>

            {/* Stats */}
            <div
              className="flex gap-5 sm:gap-8 mt-7 sm:mt-12 lg:mt-14 pt-5 sm:pt-8 border-t border-[rgba(201,169,110,0.1)] justify-center sm:justify-start"
              style={anim("0.62s")}
            >
              {h.stats.map(stat => (
                <div key={stat.label} className="flex flex-col items-center sm:items-start">
                  <span
                    className="text-lg sm:text-2xl font-light text-[#C9A96E]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[11px] sm:text-[12px] tracking-[0.1em] sm:tracking-[0.12em] text-[#8A8078] uppercase mt-0.5"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div
        className="absolute bottom-6 right-10 hidden lg:flex flex-col items-center gap-2"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.9s" }}
      >
        <span
          className="text-[9px] tracking-[0.3em] text-[rgba(201,169,110,0.4)] uppercase mb-1"
          style={{ fontFamily: "var(--font-body)", writingMode: "vertical-rl" }}
        >
          {h.scroll}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[rgba(201,169,110,0.5)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
