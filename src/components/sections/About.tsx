"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function About() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();
  const a = t.about;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const anim = (delay: string): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
  });

  return (
    <section
      id="about"
      className="relative overflow-hidden min-h-screen"
      style={{
        backgroundColor: "#2A2A2A",
        backgroundImage: isMobile ? "url('/hero-mobile.png')" : "url('/bg-hero-n.png')",
        backgroundSize: isMobile ? "cover" : "contain",
        backgroundPosition: isMobile ? "center top" : "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Mobile gradient veil */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(42,42,42,0.05) 0%, rgba(42,42,42,0.15) 30%, rgba(42,42,42,0.72) 45%, rgba(42,42,42,0.95) 65%, #2A2A2A 78%)",
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">

        {/* Desktop photo spacer */}
        <div className="hidden lg:block relative lg:w-[42%] xl:w-[38%] lg:min-h-screen flex-shrink-0">
          <div className="absolute bottom-8 right-8 w-12 h-12 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-full h-px bg-[#C9A96E] opacity-30" />
            <div className="absolute bottom-0 right-0 h-full w-px bg-[#C9A96E] opacity-30" />
          </div>
        </div>

        {/* Text column */}
        <div
          className="flex-1 flex flex-col
            px-5 pb-10
            sm:px-10 sm:pb-12
            lg:px-12 lg:py-0 lg:justify-center
            xl:px-20
            z-10"
        >
          {/* Mobile: spacer pushes content to bottom */}
          <div className="flex-1 lg:hidden" />

          <div className="relative w-full max-w-xl lg:max-w-none">

            {/* Label */}
            <div className="hidden sm:flex items-center gap-3 mb-4 sm:mb-6" style={anim("0.1s")}>
              <span className="inline-block w-8 sm:w-10 h-px bg-[#C9A96E] shrink-0" />
              <span
                className="text-[11px] sm:text-[12px] tracking-[0.3em] text-[#C9A96E] uppercase font-light"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {a.label}
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-light text-[#F5F0EB] mb-5 sm:mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(40px, 7vw, 88px)",
                lineHeight: 1.0,
                ...anim("0.2s"),
              }}
            >
              {a.h1Line1}
              <br />
              <em className="not-italic" style={{ color: "#C9A96E" }}>{a.h1Line2}</em>
            </h1>

            {/* Divider */}
            <div
              className="w-10 sm:w-12 h-px bg-[rgba(201,169,110,0.4)] mb-4 sm:mb-7"
              style={{
                transformOrigin: "left",
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                opacity:   visible ? 1 : 0,
                transition: "transform 0.6s ease 0.32s, opacity 0.6s ease 0.32s",
              }}
            />

            {/* Description */}
            <div className="space-y-3 mb-6 sm:mb-8" style={anim("0.38s")}>
              <p
                className="text-[16px] sm:text-[19px] leading-[1.75] text-[#A89B8C] font-normal"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {a.description1}
              </p>
              <p
                className="text-[15px] sm:text-[18px] leading-[1.75] text-[#8A8078] font-normal hidden sm:block"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {a.description2}
              </p>
            </div>

            {/* Qualifications */}
            <div
              className="border-l-2 border-[rgba(201,169,110,0.35)] pl-5 mb-7 sm:mb-10 space-y-2"
              style={anim("0.46s")}
            >
              {a.qualifications.map(q => (
                <p
                  key={q}
                  className="text-[15px] sm:text-[17px] font-normal text-[#7A7068] leading-[1.65]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {q}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div style={anim("0.54s")}>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group px-7 sm:px-8 py-3.5 sm:py-4 bg-[#C9A96E] hover:bg-[#B8944E] text-[#2A2A2A] text-[14px] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] flex items-center gap-3 w-full sm:w-fit"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {a.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* Stats */}
            <div
              className="flex gap-5 sm:gap-8 mt-7 sm:mt-12 lg:mt-14 pt-5 sm:pt-8 border-t border-[rgba(201,169,110,0.1)] justify-center sm:justify-start"
              style={anim("0.62s")}
            >
              {a.stats.map(stat => (
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
          scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[rgba(201,169,110,0.5)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
