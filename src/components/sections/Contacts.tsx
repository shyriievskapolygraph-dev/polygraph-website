"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { pushEvent } from "@/lib/gtm";
import { TELEGRAM_URL } from "@/lib/seo";

const socials = [
  {
    name: "Telegram",
    href: TELEGRAM_URL,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 3-8.97 5.97M22 3 2 10l7 3m13-10-4 18-6-5M9 13l3 5 4-8" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/380632429890",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/iryna_polygraph",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Contacts() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const c = t.contacts;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const anim = (delay: string): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
  });

  return (
    <section
      id="contacts"
      ref={ref}
      className="relative bg-[#F5F0EB] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.4)] to-transparent" />
      <div
        className="absolute left-0 top-0 w-[500px] h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(201,169,110,0.08) 0%, transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-14 sm:py-28 lg:py-32">

        <div className="flex flex-col lg:flex-row lg:gap-20 xl:gap-28">

          {/* Left */}
          <div className="lg:w-[42%] shrink-0 mb-10 lg:mb-0">

            <div className="flex items-center gap-3 mb-6" style={anim("0.05s")}>
              <span className="inline-block w-8 sm:w-10 h-px bg-[#C9A96E] shrink-0" />
              <span
                className="text-[11px] sm:text-[12px] tracking-[0.3em] text-[#C9A96E] uppercase font-light"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {c.label}
              </span>
            </div>

            <h2
              className="font-light text-[#2A2A2A] mb-7 sm:mb-8"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(34px, 4.2vw, 60px)",
                lineHeight: 1.08,
                ...anim("0.12s"),
              }}
            >
              {c.h2Line1}
              <br />
              <em className="not-italic" style={{ color: "#C9A96E" }}>{c.h2Line2}</em>
            </h2>

            <p
              className="text-[18px] sm:text-[19px] leading-[1.85] text-[#5A5048] font-normal mb-10"
              style={{ fontFamily: "var(--font-body)", ...anim("0.2s") }}
            >
              {c.description}
            </p>

            {/* Social icons */}
            <div className="flex flex-col gap-3 mb-10" style={anim("0.28s")}>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => pushEvent(`${s.name.toLowerCase()}_click`, { location: "contacts" })}
                    className="group w-11 h-11 flex items-center justify-center border border-[rgba(42,42,42,0.15)] hover:border-[#C9A96E] text-[#8A7E74] hover:text-[#C9A96E] transition-all duration-300 hover:bg-[rgba(201,169,110,0.06)]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <span
                className="text-[12px] text-[#A89B8C] font-light tracking-[0.08em]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {c.socialsLabel}
              </span>
            </div>

          </div>

          {/* Right: contact items */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="divide-y divide-[rgba(42,42,42,0.1)]">
              {c.items.map((item, i) => (
                <div
                  key={item.label}
                  className="py-5 sm:py-8 flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-8"
                  style={{
                    opacity:    visible ? 1 : 0,
                    transform:  visible ? "translateX(0)" : "translateX(20px)",
                    transition: `opacity 0.6s ease ${0.15 + i * 0.1}s, transform 0.6s ease ${0.15 + i * 0.1}s`,
                  }}
                >
                  <span
                    className="shrink-0 text-[13px] tracking-[0.15em] text-[#A89B8C] uppercase font-light sm:w-24 sm:pt-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.label}
                  </span>

                  <div>
                    {item.href ? (
                      <a
                        href={item.href}
                        onClick={() => item.href?.startsWith("tel:") && pushEvent("phone_click", { location: "contacts" })}
                        className="block font-light text-[#2A2A2A] hover:text-[#C9A96E] transition-colors duration-300 leading-tight mb-1"
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "clamp(20px, 2.5vw, 28px)",
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span
                        className="block font-light text-[#2A2A2A] leading-tight mb-1"
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "clamp(20px, 2.5vw, 28px)",
                        }}
                      >
                        {item.value}
                      </span>
                    )}
                    <span
                      className="text-[14px] text-[#8A7E74] font-light"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.2)] to-transparent" />
    </section>
  );
}
