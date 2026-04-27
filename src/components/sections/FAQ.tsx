"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  visible,
}: {
  item: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  visible: boolean;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="border-b border-[rgba(42,42,42,0.12)]"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${0.1 + index * 0.045}s, transform 0.6s ease ${0.1 + index * 0.045}s`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-5 sm:gap-8 py-6 sm:py-7 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className="shrink-0 text-[13px] font-light transition-colors duration-300"
          style={{
            fontFamily: "var(--font-body)",
            color: isOpen ? "#C9A96E" : "rgba(201,169,110,0.4)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className="flex-1 font-light leading-[1.35] transition-colors duration-300"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(18px, 2vw, 24px)",
            color: isOpen ? "#2A2A2A" : "#3A3330",
          }}
        >
          {item.q}
        </span>

        <span
          className="shrink-0 w-8 h-8 flex items-center justify-center border rounded-full transition-all duration-300"
          style={{
            borderColor: isOpen ? "#C9A96E" : "rgba(42,42,42,0.2)",
            color: isOpen ? "#C9A96E" : "#8A7E74",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        ref={bodyRef}
        className="overflow-hidden"
        style={{
          maxHeight: isOpen ? (bodyRef.current ? bodyRef.current.scrollHeight + "px" : "500px") : "0px",
          transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="flex gap-5 sm:gap-8 pb-6 sm:pb-7">
          <div className="shrink-0 w-px self-stretch bg-[#C9A96E] opacity-40 ml-[calc(12px+0px)]" />
          <p
            className="flex-1 text-[18px] sm:text-[19px] font-normal leading-[1.8] text-[#5A5048] pl-3 sm:pl-5"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const f = t.faq;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Reset open item when language changes
  useEffect(() => { setOpenIndex(null); }, [f]);

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <section
      id="faq"
      ref={ref}
      className="relative bg-[#F5F0EB] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.4)] to-transparent" />
      <div
        className="absolute right-0 bottom-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(201,169,110,0.07) 0%, transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-14 sm:py-28 lg:py-32">

        {/* Header */}
        <div
          className="flex flex-col lg:flex-row lg:gap-20 xl:gap-28 mb-10 sm:mb-16 lg:mb-20"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.05s, transform 0.7s ease 0.05s",
          }}
        >
          <div className="lg:w-[38%] shrink-0 mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-8 sm:w-10 h-px bg-[#C9A96E] shrink-0" />
              <span
                className="text-[11px] sm:text-[12px] tracking-[0.3em] text-[#C9A96E] uppercase font-light"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {f.label}
              </span>
            </div>
            <h2
              className="font-light text-[#2A2A2A]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(34px, 4.2vw, 60px)",
                lineHeight: 1.08,
              }}
            >
              {f.h2Line1}
              <br />
              <em className="not-italic" style={{ color: "#C9A96E" }}>{f.h2Line2}</em>
            </h2>
          </div>

          <div className="flex-1 flex items-end">
            <p
              className="text-[18px] sm:text-[19px] leading-[1.8] text-[#6B5E52] font-normal"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {f.description}
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div className="border-t border-[rgba(42,42,42,0.12)]">
          {f.items.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              visible={visible}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="mt-8 sm:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10 pt-8 border-t border-[rgba(42,42,42,0.08)]"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s",
          }}
        >
          <p
            className="text-[18px] sm:text-[19px] text-[#6B5E52] font-normal leading-[1.7] max-w-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {f.bottomNote}
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group shrink-0 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#C9A96E] hover:bg-[#B8944E] text-[#2A2A2A] text-[14px] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] flex items-center gap-3 w-full sm:w-fit justify-center"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {f.bottomBtn}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.3)] to-transparent" />
    </section>
  );
}
