"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const certificates = [
  {
    src: "/images/about/1.jpg",
    num: "01",
    label: "Диплом магістра психології",
    sub: "Державна кваліфікація",
  },
  {
    src: "/images/about/2.jpg",
    num: "02",
    label: "Диплом магістра психології",
    sub: "Підтверджена освіта",
  },
  {
    src: "/images/about/3.jpg",
    num: "03",
    label: "Сертифікат поліграфолога",
    sub: "Підвищення кваліфікації",
  },
  {
    src: "/images/about/4.jpg",
    num: "04",
    label: "Свідоцтво поліграфолога",
    sub: "Психофізіологічні дослідження",
  },
];

type Cert = (typeof certificates)[0];

/* ─── Lightbox ─── */
function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const cert = certificates[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(20,18,16,0.94)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 flex items-center gap-2 text-[rgba(245,240,235,0.5)] hover:text-[#C9A96E] transition-colors duration-200"
        aria-label="Закрити"
        style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.2em" }}
      >
        <span className="uppercase tracking-[0.2em]">ESC</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      <div
        className="absolute top-5 left-6 text-[rgba(201,169,110,0.6)]"
        style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em" }}
      >
        {cert.num} / 04
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 sm:left-8 w-12 h-12 flex items-center justify-center text-[rgba(245,240,235,0.4)] hover:text-[#C9A96E] active:text-[#C9A96E] transition-colors duration-200"
        aria-label="Попереднє"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 sm:right-8 w-12 h-12 flex items-center justify-center text-[rgba(245,240,235,0.4)] hover:text-[#C9A96E] active:text-[#C9A96E] transition-colors duration-200"
        aria-label="Наступне"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative mx-auto px-16 sm:px-24"
        style={{ maxHeight: "88vh", maxWidth: "min(600px, 92vw)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative"
          style={{
            border: "1px solid rgba(201,169,110,0.25)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          }}
        >
          <Image
            src={cert.src}
            alt={cert.label}
            width={600}
            height={828}
            className="object-contain w-full h-auto"
            style={{ maxHeight: "82vh", objectFit: "contain" }}
            priority
          />
          {/* Gold bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A96E]" />
        </div>

        {/* Caption */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div>
            <p
              className="text-[#F5F0EB] text-[14px] font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {cert.label}
            </p>
            <p
              className="text-[#A89B8C] text-[12px] font-light mt-0.5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {cert.sub}
            </p>
          </div>
          {/* Dot indicators */}
          <div className="flex gap-2">
            {certificates.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                style={{ backgroundColor: i === index ? "#C9A96E" : "rgba(201,169,110,0.25)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Card ─── */
function CertCard({
  cert,
  index,
  visible,
  onOpen,
}: {
  cert: Cert;
  index: number;
  visible: boolean;
  onOpen: (i: number) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${0.1 + index * 0.1}s, transform 0.7s ease ${0.1 + index * 0.1}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden mb-5 cursor-zoom-in"
        onClick={() => onOpen(index)}
        style={{
          border: `1px solid ${hovered ? "rgba(201,169,110,0.5)" : "rgba(42,42,42,0.12)"}`,
          boxShadow: hovered
            ? "0 16px 48px rgba(0,0,0,0.13), 0 0 0 1px rgba(201,169,110,0.1)"
            : "0 2px 12px rgba(0,0,0,0.05)",
          transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <div className="relative w-full" style={{ paddingBottom: "68%" }}>
          <Image
            src={cert.src}
            alt={cert.label}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          />

          {/* Hover overlay with zoom hint */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "linear-gradient(180deg, transparent 40%, rgba(20,18,16,0.35) 100%)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              className="w-10 h-10 rounded-full border border-[rgba(245,240,235,0.6)] flex items-center justify-center"
              style={{
                background: "rgba(20,18,16,0.4)",
                backdropFilter: "blur(4px)",
                transform: hovered ? "scale(1)" : "scale(0.7)",
                transition: "transform 0.3s ease",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,235,0.9)" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
                <line x1="8" y1="11" x2="14" y2="11" />
                <line x1="11" y1="8" x2="11" y2="14" />
              </svg>
            </div>
          </div>
        </div>

        {/* Gold bottom bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A96E] origin-left"
          style={{
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className="text-[15px] sm:text-[16px] font-normal text-[#2A2A2A] leading-[1.4] mb-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {cert.label}
          </p>
          <p
            className="text-[13px] text-[#A89B8C] font-light tracking-[0.04em]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {cert.sub}
          </p>
        </div>
        <span
          className="text-[11px] tracking-[0.22em] font-light shrink-0 mt-0.5"
          style={{
            fontFamily: "var(--font-body)",
            color: hovered ? "#C9A96E" : "rgba(42,42,42,0.22)",
            transition: "color 0.3s ease",
          }}
        >
          {cert.num}
        </span>
      </div>
    </div>
  );
}

/* ─── Section ─── */
export default function Certificates() {
  const [visible, setVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i - 1 + certificates.length) % certificates.length : null), []);
  const nextImage = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i + 1) % certificates.length : null), []);

  const anim = (delay: string): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
  });

  return (
    <>
      <section ref={ref} className="relative bg-[#F5F0EB] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.4)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.2)] to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 15% 50%, rgba(201,169,110,0.05) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(201,169,110,0.04) 0%, transparent 50%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-14 sm:py-28 lg:py-32">

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 sm:mb-20">
            <div>
              <div className="flex items-center gap-3 mb-5" style={anim("0.05s")}>
                <span className="inline-block w-8 sm:w-10 h-px bg-[#C9A96E] shrink-0" />
                <span
                  className="text-[11px] sm:text-[12px] tracking-[0.3em] text-[#C9A96E] uppercase font-light"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Документи
                </span>
              </div>
              <h2
                className="font-light text-[#2A2A2A]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(34px, 4.2vw, 60px)",
                  lineHeight: 1.08,
                  ...anim("0.12s"),
                }}
              >
                Освіта та{" "}
                <em className="not-italic" style={{ color: "#C9A96E" }}>
                  сертифікати
                </em>
              </h2>
            </div>
            <p
              className="text-[16px] sm:text-[17px] text-[#8A7E74] font-light leading-[1.75] max-w-xs sm:text-right"
              style={{ fontFamily: "var(--font-body)", ...anim("0.2s") }}
            >
              Підтверджена кваліфікація та офіційні документи
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8 lg:gap-6">
            {certificates.map((cert, i) => (
              <CertCard
                key={cert.src}
                cert={cert}
                index={i}
                visible={visible}
                onOpen={openLightbox}
              />
            ))}
          </div>

        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
