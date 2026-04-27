"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Process() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const p = t.process;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-[#272727] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.2)] to-transparent" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.04) 0%, transparent 55%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-14 sm:py-28 lg:py-32">

        {/* Header */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 sm:mb-20 lg:mb-24"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.05s, transform 0.7s ease 0.05s",
          }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-8 sm:w-10 h-px bg-[#C9A96E] shrink-0" />
              <span
                className="text-[11px] sm:text-[12px] tracking-[0.3em] text-[#C9A96E] uppercase font-light"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {p.label}
              </span>
            </div>
            <h2
              className="font-light text-[#F5F0EB]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(34px, 4.2vw, 60px)",
                lineHeight: 1.08,
              }}
            >
              {p.h2Line1}
              <br />
              <em className="not-italic" style={{ color: "#C9A96E" }}>{p.h2Line2}</em>
            </h2>
          </div>

          <p
            className="text-[18px] sm:text-[19px] leading-[1.8] text-[#8A8078] font-normal lg:max-w-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {p.description}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {p.steps.map((step, i) => (
            <div
              key={i}
              className="group relative flex items-stretch border-t border-[rgba(201,169,110,0.1)] last:border-b last:border-b-[rgba(201,169,110,0.1)]"
              style={{
                opacity:    visible ? 1 : 0,
                transform:  visible ? "translateY(0)" : "translateY(22px)",
                transition: `opacity 0.65s ease ${0.1 + i * 0.09}s, transform 0.65s ease ${0.1 + i * 0.09}s`,
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C9A96E] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

              <div className="relative flex items-center justify-start shrink-0 w-[72px] sm:w-[120px] lg:w-[180px] xl:w-[220px] overflow-hidden py-5 sm:py-10">
                <span
                  className="absolute left-0 select-none pointer-events-none font-light leading-none transition-opacity duration-500 group-hover:opacity-[0.14]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(100px, 14vw, 190px)",
                    color: "rgba(201,169,110,0.07)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex flex-col items-start gap-1.5 pl-5 sm:pl-6 lg:pl-8">
                  <span
                    className="font-light text-[#C9A96E] leading-none transition-opacity duration-300"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(26px, 3vw, 40px)",
                      opacity: 0.7,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[9px] tracking-[0.28em] text-[rgba(201,169,110,0.4)] uppercase font-light hidden sm:block"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {p.stepLabel}
                  </span>
                </div>
              </div>

              <div className="shrink-0 w-px bg-[rgba(201,169,110,0.1)] group-hover:bg-[rgba(201,169,110,0.25)] transition-colors duration-500 my-4 sm:my-8" />

              <div className="flex-1 flex items-center py-5 sm:py-10 pl-4 sm:pl-10 lg:pl-14 pr-3 sm:pr-6">
                <p
                  className="font-normal leading-[1.55] text-[#C8BFB5] group-hover:text-[#F0EBE4] transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(16px, 4vw, 28px)",
                  }}
                >
                  {step}
                </p>
              </div>

              <div className="hidden lg:flex items-center pr-6 xl:pr-8 shrink-0">
                <div
                  className="w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300"
                  style={{ borderColor: "rgba(201,169,110,0.2)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-12 sm:pt-14 mt-2"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.72s, transform 0.7s ease 0.72s",
          }}
        >
          <div className="flex items-center gap-4">
            <span
              className="font-light text-[#C9A96E] leading-none"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(36px, 4vw, 52px)",
                opacity: 0.4,
              }}
            >
              06
            </span>
            <div className="w-px h-8 bg-[rgba(201,169,110,0.2)]" />
            <p
              className="text-[15px] text-[#6B6057] font-light leading-[1.6]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {p.stepsNote[0]}<br />{p.stepsNote[1]}
            </p>
          </div>

          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group shrink-0 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#C9A96E] hover:bg-[#B8944E] text-[#2A2A2A] text-[14px] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] flex items-center gap-3 w-full sm:w-fit justify-center"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {p.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.15)] to-transparent" />
    </section>
  );
}
