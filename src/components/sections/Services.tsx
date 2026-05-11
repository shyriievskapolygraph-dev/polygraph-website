"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import type { ServiceItem as Service } from "@/lib/translations";

function ServiceCard({
  service,
  index,
  visible,
  onClick,
  detailsLabel,
  popularLabel = "",
  isPopular = false,
  className = "",
}: {
  service: Service;
  index: number;
  visible: boolean;
  onClick: () => void;
  detailsLabel: string;
  popularLabel?: string;
  isPopular?: boolean;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${0.08 + index * 0.055}s, transform 0.65s ease ${0.08 + index * 0.055}s`,
      }}
    >
      <button
        onClick={onClick}
        className="group w-full h-full text-left relative overflow-hidden flex flex-col
          backdrop-blur-xl
          bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(201,169,110,0.07)]
          border border-[rgba(255,255,255,0.08)] hover:border-[rgba(201,169,110,0.28)]
          transition-all duration-500"
        style={{
          minHeight: "260px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 30px rgba(201,169,110,0.08)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)";
        }}
      >
        {/* Top-edge glass highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.14) 50%, transparent 90%)" }}
        />

        {/* Diagonal gold shimmer on hover */}
        <div
          className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.06) 0%, transparent 50%, rgba(201,169,110,0.03) 100%)" }}
        />

        <div className="relative flex flex-col flex-1 p-6 sm:p-7">

          {/* Number + badge + arrow */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <span
                className="font-light tracking-[0.18em] transition-colors duration-300"
                style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(201,169,110,0.65)" }}
              >
                {String(service.id).padStart(2, "0")}
              </span>
              {isPopular && popularLabel && (
                <span
                  className="px-2 py-0.5 text-[10px] tracking-[0.18em] uppercase font-light"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#2A2A2A",
                    backgroundColor: "#C9A96E",
                    letterSpacing: "0.16em",
                  }}
                >
                  {popularLabel}
                </span>
              )}
            </div>
            <span className="text-[#C9A96E] text-[14px] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
              →
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-normal text-[#DDD5CA] group-hover:text-[#F5F0EB] leading-[1.25] mb-4 flex-1 transition-colors duration-300 text-[19px] sm:text-[20px] lg:text-[18px] xl:text-[20px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {service.title}
          </h3>

          {/* Teaser */}
          <p
            className="text-[16px] leading-[1.75] text-[#7A7068] group-hover:text-[#9A9088] font-normal mb-6 transition-colors duration-300"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {service.teaser}
          </p>

          {/* Bottom */}
          <div className="mt-auto">
            <div
              className="h-px mb-4 transition-all duration-500"
              style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)" }}
            />
            <div className="flex items-center justify-between">
              <span
                className="font-light text-[#C9A96E] text-[19px] sm:text-[20px] lg:text-[18px] xl:text-[20px]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {service.price}
              </span>
              <span
                className="text-[12px] tracking-[0.2em] text-[rgba(201,169,110,0.4)] group-hover:text-[rgba(201,169,110,0.8)] uppercase font-light transition-colors duration-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {detailsLabel}
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

type Tab = "all" | "business" | "personal";

const BUSINESS_IDS = new Set([1, 2, 3, 4, 5, 6, 7, 11]);
const PERSONAL_IDS = new Set([8, 9, 10]);

export default function Services() {
  const [visible, setVisible] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [tab, setTab] = useState<Tab>("all");
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "uk";
  const { t } = useLanguage();
  const s = t.services;
  const services = s.items;

  const filtered =
    tab === "business" ? services.filter(sv => BUSINESS_IDS.has(sv.id))
    : tab === "personal" ? services.filter(sv => PERSONAL_IDS.has(sv.id))
    : services;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveService(null); };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [activeService]);

  return (
    <>
      <section
        id="services"
        ref={ref}
        className="relative overflow-hidden"
        style={{ backgroundColor: "#1E1E24" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.4)] to-transparent" />

        {/* Decorative blobs for glass effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full" style={{ top: "15%", left: "5%", width: "480px", height: "480px", background: "radial-gradient(circle, rgba(201,169,110,0.14) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute rounded-full" style={{ bottom: "20%", right: "8%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(201,169,110,0.10) 0%, transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute rounded-full" style={{ top: "55%", left: "40%", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(160,120,70,0.07) 0%, transparent 70%)", filter: "blur(90px)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-14 sm:py-28 lg:py-32">

          {/* Header */}
          <div
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 sm:mb-16 lg:mb-20"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.05s, transform 0.7s ease 0.05s",
            }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-8 sm:w-10 h-px bg-[#C9A96E] shrink-0" />
                <span className="text-[11px] sm:text-[12px] tracking-[0.3em] text-[#C9A96E] uppercase font-light" style={{ fontFamily: "var(--font-body)" }}>
                  {s.label}
                </span>
              </div>
              <h2 className="font-light text-[#F5F0EB]" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(34px, 4.2vw, 60px)", lineHeight: 1.08 }}>
                {s.h2Line1}
                <br />
                <em className="not-italic" style={{ color: "#C9A96E" }}>{s.h2Line2}</em>
              </h2>
            </div>
            <p className="text-[18px] sm:text-[19px] leading-[1.8] text-[#A89B8C] font-normal lg:max-w-sm" style={{ fontFamily: "var(--font-body)" }}>
              {s.description}
            </p>
          </div>

          {/* Tabs */}
          <div
            className="mb-10 sm:mb-12"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.18s, transform 0.6s ease 0.18s",
            }}
          >
            <div
              className="scrollbar-hide flex gap-1 p-1 overflow-x-auto"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,169,110,0.1)",
                width: "fit-content",
                maxWidth: "100%",
              }}
            >
              {(["all", "business", "personal"] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="shrink-0 whitespace-nowrap px-4 sm:px-5 py-2 text-[11px] sm:text-[12px] tracking-[0.15em] sm:tracking-[0.18em] uppercase font-light transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: tab === t ? "#C9A96E" : "transparent",
                    color: tab === t ? "#2A2A2A" : "rgba(201,169,110,0.5)",
                  }}
                >
                  {t === "all" ? s.tabAll : t === "business" ? s.tabBusiness : s.tabPersonal}
                </button>
              ))}
            </div>
          </div>

          {/* Cards grid */}
          {tab === "all" ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                {services.slice(0, 9).map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={i}
                    visible={visible}
                    detailsLabel={s.details}
                    popularLabel={s.popular}
                    isPopular={service.id === 1}
                    onClick={() => setActiveService(service)}
                  />
                ))}
              </div>

              {/* Last row: card 10 + card 11 (wide) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <ServiceCard
                  service={services[9]}
                  index={9}
                  visible={visible}
                  detailsLabel={s.details}
                  onClick={() => setActiveService(services[9])}
                />

                {/* Card 11 — wide */}
                <div
                  className="sm:col-span-1 lg:col-span-2"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(28px)",
                    transition: `opacity 0.65s ease ${0.08 + 10 * 0.055}s, transform 0.65s ease ${0.08 + 10 * 0.055}s`,
                  }}
                >
                  <button
                    onClick={() => setActiveService(services[10])}
                    className="group w-full h-full text-left relative overflow-hidden
                      backdrop-blur-xl
                      bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(201,169,110,0.07)]
                      border border-[rgba(255,255,255,0.08)] hover:border-[rgba(201,169,110,0.28)]
                      transition-all duration-500"
                    style={{ minHeight: "180px", boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 30px rgba(201,169,110,0.08)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)"; }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.14) 50%, transparent 90%)" }} />
                    <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.06) 0%, transparent 50%, rgba(201,169,110,0.03) 100%)" }} />
                    <span className="absolute right-6 bottom-0 font-light leading-none select-none pointer-events-none" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(90px, 11vw, 140px)", color: "rgba(201,169,110,0.05)", lineHeight: 1 }}>11</span>
                    <div className="relative flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10 p-6 sm:p-7">
                      <div className="lg:flex-[1.2]">
                        <span className="block font-light tracking-[0.18em] mb-4 select-none" style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(201,169,110,0.65)" }}>11</span>
                        <h3 className="font-normal text-[#DDD5CA] group-hover:text-[#F5F0EB] leading-[1.22] transition-colors duration-300 text-[20px] lg:text-[22px] xl:text-[26px]" style={{ fontFamily: "var(--font-heading)" }}>
                          {services[10].title}
                        </h3>
                      </div>
                      <div className="hidden lg:block w-px self-stretch transition-colors duration-300" style={{ background: "linear-gradient(180deg, transparent, rgba(201,169,110,0.2), transparent)" }} />
                      <div className="flex-1 flex flex-col sm:flex-row lg:flex-col gap-4 sm:items-center lg:items-start">
                        <p className="text-[15px] leading-[1.75] text-[#7A7068] group-hover:text-[#9A9088] font-normal flex-1 transition-colors duration-300" style={{ fontFamily: "var(--font-body)" }}>
                          {services[10].teaser}
                        </p>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="font-light text-[#C9A96E] text-[20px] lg:text-[22px] xl:text-[24px]" style={{ fontFamily: "var(--font-heading)" }}>
                            {services[10].price}
                          </span>
                          <span className="text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">→</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filtered.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={i}
                  visible={visible}
                  detailsLabel={s.details}
                  popularLabel={s.popular}
                  isPopular={service.id === 1}
                  onClick={() => setActiveService(service)}
                />
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div
            className="flex justify-end mt-8 sm:mt-10"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 0.85s, transform 0.6s ease 0.85s" }}
          >
            <button
              onClick={() => router.push(`/${locale}/pricing`)}
              className="group flex items-center gap-2 text-[11px] sm:text-[12px] tracking-[0.22em] uppercase font-light text-[#6B6057] hover:text-[#C9A96E] transition-colors duration-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {s.cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.3)] to-transparent" />
      </section>

      {/* ── MODAL ── */}
      {activeService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(20,17,14,0.88)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setActiveService(null); }}
        >
          <div
            className="relative w-full max-w-lg overflow-y-auto"
            style={{ maxHeight: "92vh", background: "rgba(30,30,36,0.95)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(201,169,110,0.18)", boxShadow: "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)" }}
          >
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

            <div className="p-5 pb-24 sm:p-9 lg:p-10">

              <button onClick={() => setActiveService(null)} className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center text-[#5A5248] hover:text-[#F5F0EB] transition-colors duration-200" aria-label={t.nav.closeModal}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <line x1="1" y1="1" x2="14" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="14" y1="1" x2="1" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>

              <span className="block text-[12px] tracking-[0.25em] text-[#C9A96E] uppercase font-light mb-5" style={{ fontFamily: "var(--font-body)" }}>
                {String(activeService.id).padStart(2, "0")} / 11
              </span>

              <h3 className="font-light text-[#F5F0EB] mb-4" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.15 }}>
                {activeService.title}
              </h3>

              <div className="w-10 h-px bg-[#C9A96E] opacity-55 mb-7" />

              <p className="text-[17px] sm:text-[18px] leading-[1.88] text-[#A89B8C] font-normal mb-8" style={{ fontFamily: "var(--font-body)" }}>
                {activeService.teaser}
              </p>

              <p className="text-[12px] tracking-[0.22em] text-[#C9A96E] uppercase font-light mb-4" style={{ fontFamily: "var(--font-body)" }}>
                {s.modalBulletsLabel}
              </p>
              <div className="space-y-3 mb-8">
                {activeService.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-1 h-1 rounded-full bg-[#C9A96E] mt-[8px]" />
                    <p className="text-[16px] sm:text-[17px] font-normal text-[#8A8078] leading-[1.78]" style={{ fontFamily: "var(--font-body)" }}>{b}</p>
                  </div>
                ))}
              </div>

              <div className="border-l-2 border-[rgba(201,169,110,0.38)] pl-5 mb-9">
                <p className="text-[16px] sm:text-[17px] font-normal text-[#6B6057] leading-[1.78] italic" style={{ fontFamily: "var(--font-heading)" }}>
                  {activeService.result}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                <div>
                  <p className="text-[12px] tracking-[0.18em] text-[#A89B8C] uppercase font-light mb-1" style={{ fontFamily: "var(--font-body)" }}>
                    {s.modalCostLabel}
                  </p>
                  <span className="font-light text-[#C9A96E]" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3vw, 36px)" }}>
                    {activeService.price}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveService(null);
                    setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 120);
                  }}
                  className="group w-full sm:w-fit px-7 py-3.5 bg-[#C9A96E] hover:bg-[#B8944E] text-[#2A2A2A] text-[14px] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] flex items-center justify-center gap-3"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {s.modalBtn}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
