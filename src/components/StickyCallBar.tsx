"use client";

import { useEffect, useState } from "react";
import { PHONE, PHONE_DISPLAY, TELEGRAM_URL } from "@/lib/seo";
import { useLanguage } from "@/lib/LanguageContext";
import { pushEvent } from "@/lib/gtm";

export default function StickyCallBar() {
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 160);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        background: "rgba(30,28,26,0.97)",
        borderTop: "1px solid rgba(201,169,110,0.2)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-stretch h-14">

        {/* Call button — primary */}
        <a
          href={`tel:${PHONE}`}
          onClick={() => pushEvent("phone_click", { location: "sticky_bar" })}
          className="flex-1 flex items-center justify-center gap-2.5 bg-[#C9A96E] active:bg-[#B8944E] transition-colors duration-150"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 5.55 5.55l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
          </svg>
          <span className="text-[#2A2A2A] text-[13px] tracking-[0.12em] font-medium uppercase">
            {PHONE_DISPLAY}
          </span>
        </a>

        {/* Divider */}
        <div className="w-px bg-[rgba(201,169,110,0.15)]" />

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${PHONE}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => pushEvent("whatsapp_click", { location: "sticky_bar" })}
          className="w-14 flex items-center justify-center text-[#C9A96E] active:text-[#F5F0EB] transition-colors duration-150"
          aria-label="WhatsApp"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </a>

        {/* Divider */}
        <div className="w-px bg-[rgba(201,169,110,0.15)]" />

        {/* Telegram */}
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => pushEvent("telegram_click", { location: "sticky_bar" })}
          className="w-14 flex items-center justify-center text-[#C9A96E] active:text-[#F5F0EB] transition-colors duration-150"
          aria-label="Telegram"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 3-8.97 5.97M22 3 2 10l7 3m13-10-4 18-6-5M9 13l3 5 4-8" />
          </svg>
        </a>

      </div>
    </div>
  );
}
