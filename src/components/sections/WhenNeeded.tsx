"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function WhenNeeded() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const wn = t.whenNeeded;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="when-needed"
      ref={ref}
      className="relative bg-[#F5F0EB] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.4)] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-14 sm:py-28 lg:py-32">

        {/* Label */}
        <div
          className="flex items-center gap-3 mb-6"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.05s, transform 0.7s ease 0.05s",
          }}
        >
          <span className="inline-block w-8 sm:w-10 h-px bg-[#C9A96E] shrink-0" />
          <span
            className="text-[11px] sm:text-[12px] tracking-[0.3em] text-[#C9A96E] uppercase font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {wn.label}
          </span>
        </div>

        {/* Heading */}
        <div
          className="mb-10 sm:mb-16 lg:mb-20 border-b border-[rgba(42,42,42,0.1)] pb-8 sm:pb-14"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.12s, transform 0.8s ease 0.12s",
          }}
        >
          <h2
            className="font-light text-[#2A2A2A] leading-[1.0]"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(36px, 8vw, 110px)",
            }}
          >
            {wn.h2Line1}
            <br />
            <em className="not-italic" style={{ color: "#C9A96E" }}>{wn.h2Line2}</em>
          </h2>
        </div>

        {/* Two columns */}
        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24">

          {/* Left: body text */}
          <div
            className="lg:w-[55%] mb-10 lg:mb-0"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.28s, transform 0.7s ease 0.28s",
            }}
          >
            <p
              className="text-[18px] sm:text-[19px] leading-[1.9] text-[#4A4040] font-normal"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {wn.body}
            </p>
          </div>

          {/* Right: quote + buttons */}
          <div
            className="flex-1 flex flex-col justify-between gap-8"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.38s, transform 0.7s ease 0.38s",
            }}
          >
            <div className="border-l-2 border-[rgba(201,169,110,0.5)] pl-5 sm:pl-6">
              <p
                className="text-[18px] sm:text-[19px] leading-[1.8] text-[#7A6B5E] font-normal italic"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {wn.quote}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group px-7 sm:px-8 py-3.5 sm:py-4 bg-[#C9A96E] hover:bg-[#B8944E] text-[#2A2A2A] text-[14px] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] flex items-center gap-3 w-full sm:w-fit"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {wn.btn1}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                className="group px-7 sm:px-8 py-3.5 sm:py-4 border border-[rgba(42,42,42,0.25)] hover:border-[#C9A96E] text-[#4A4040] hover:text-[#C9A96E] text-[14px] tracking-[0.18em] uppercase font-light transition-all duration-300 flex items-center gap-3 w-full sm:w-fit"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {wn.btn2}
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.3)] to-transparent" />
    </section>
  );
}
