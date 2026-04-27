"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Pricing() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const p = t.pricing;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative bg-[#242424] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.25)] to-transparent" />
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(201,169,110,0.04) 0%, transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-14 sm:py-28 lg:py-32">

        {/* Header + intro — two columns on desktop */}
        <div
          className="flex flex-col lg:flex-row lg:gap-20 xl:gap-28 mb-16 sm:mb-20"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.05s, transform 0.7s ease 0.05s",
          }}
        >
          {/* Left: title */}
          <div className="lg:w-[40%] shrink-0 mb-8 lg:mb-0">
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

          {/* Right: intro text */}
          <div className="flex-1 flex flex-col justify-end">
            <p
              className="text-[15px] sm:text-[16px] leading-[1.85] text-[#A89B8C] font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {p.description}
            </p>
          </div>
        </div>

        {/* Table label */}
        <div
          className="flex items-center justify-between mb-0 pb-4 border-b border-[rgba(201,169,110,0.15)]"
          style={{
            opacity:    visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.2s",
          }}
        >
          <span
            className="text-[13px] tracking-[0.2em] text-[#6B6057] uppercase font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {p.colService}
          </span>
          <span
            className="text-[13px] tracking-[0.2em] text-[#6B6057] uppercase font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {p.colPrice}
          </span>
        </div>

        {/* Pricing rows */}
        <div>
          {p.items.map((item, i) => (
            <div
              key={i}
              className="relative border-b border-[rgba(255,255,255,0.05)] cursor-default"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                opacity:    visible ? 1 : 0,
                transform:  visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.55s ease ${0.25 + i * 0.06}s, transform 0.55s ease ${0.25 + i * 0.06}s`,
              }}
            >
              {/* Hover bg */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to right, rgba(201,169,110,0.04), transparent)",
                  opacity: hovered === i ? 1 : 0,
                }}
              />

              <div className="relative flex items-start sm:items-center justify-between gap-4 py-4 sm:py-6">
                {/* Left: number + name */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <span
                    className="shrink-0 text-[12px] font-light transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: hovered === i ? "#C9A96E" : "rgba(201,169,110,0.3)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[16px] sm:text-[17px] lg:text-[18px] font-light leading-[1.4] transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: hovered === i ? "#F5F0EB" : "#C8BFB5",
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                {/* Right: price */}
                <span
                  className="shrink-0 transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: 300,
                    color: "#C9A96E",
                    opacity: hovered === i ? 1 : 0.75,
                  }}
                >
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-8 sm:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.95s, transform 0.7s ease 0.95s",
          }}
        >
          <p
            className="text-[16px] sm:text-[17px] text-[#7A6F65] font-light leading-[1.7] max-w-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {p.ctaNote}
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group shrink-0 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#C9A96E] hover:bg-[#DFC190] text-[#2A2A2A] text-[14px] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.25)] flex items-center gap-3 w-full sm:w-fit justify-center"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {p.ctaBtn}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.15)] to-transparent" />
    </section>
  );
}
