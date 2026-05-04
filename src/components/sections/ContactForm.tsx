"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { pushEvent } from "@/lib/gtm";

type Field = "name" | "phone" | "message";

export default function ContactForm() {
  const [visible,   setVisible]   = useState(false);
  const [focused,   setFocused]   = useState<Field | null>(null);
  const [values,    setValues]    = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState({ name: "", phone: "" });
  const [touched,   setTouched]   = useState({ name: false, phone: false });
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const cf = t.contactForm;

  const validateName = (val: string): string => {
    const trimmed = val.trim();
    if (trimmed.length < 2) return cf.errNameShort;
    if (!/^[\p{L}\s'’\-]+$/u.test(trimmed)) return cf.errNameInvalid;
    return "";
  };

  const validatePhone = (val: string): string => {
    if (val.replace(/\D/g, "").length < 10) return cf.errPhoneShort;
    return "";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameErr = validateName(values.name);
    const phoneErr = validatePhone(values.phone);
    setTouched({ name: true, phone: true });
    setErrors({ name: nameErr, phone: phoneErr });
    if (nameErr || phoneErr) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      pushEvent("generate_lead", { method: "contact_form" });
      if (!res.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      alert("Помилка відправки. Будь ласка, зателефонуйте напряму.");
    } finally {
      setLoading(false);
    }
  };

  const isFloating = (field: Field) => focused === field || values[field].length > 0;

  const inputClass = (field: Field) =>
    `w-full bg-transparent pt-6 pb-2 text-[16px] font-light outline-none transition-colors duration-300 ${
      focused === field ? "text-[#F5F0EB]" : "text-[#C8BFB5]"
    }`;

  const anim = (delay: string): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
  });

  const trustIcons = [
    <svg key="clock" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" /></svg>,
    <svg key="lock" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="1" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>,
    <svg key="doc" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /></svg>,
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-[#2A2A2A] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.25)] to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(201,169,110,0.04) 0%, transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-14 sm:py-28 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:gap-20 xl:gap-32">

          {/* Left */}
          <div className="lg:w-[42%] shrink-0 mb-10 lg:mb-0">

            <div className="flex items-center gap-3 mb-6" style={anim("0.05s")}>
              <span className="inline-block w-8 sm:w-10 h-px bg-[#C9A96E] shrink-0" />
              <span
                className="text-[11px] sm:text-[12px] tracking-[0.3em] text-[#C9A96E] uppercase font-light"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {cf.label}
              </span>
            </div>

            <h2
              className="font-light text-[#F5F0EB] mb-7 sm:mb-8"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(34px, 4.2vw, 60px)",
                lineHeight: 1.08,
                ...anim("0.12s"),
              }}
            >
              {cf.h2Line1}
              <br />
              <em className="not-italic" style={{ color: "#C9A96E" }}>{cf.h2Line2}</em>
            </h2>

            <p
              className="text-[18px] sm:text-[19px] leading-[1.85] text-[#A89B8C] font-normal mb-10 sm:mb-12"
              style={{ fontFamily: "var(--font-body)", ...anim("0.2s") }}
            >
              {cf.description}
            </p>

            <div className="space-y-5" style={anim("0.28s")}>
              {cf.trust.map((label, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="shrink-0 w-9 h-9 flex items-center justify-center border border-[rgba(201,169,110,0.2)] bg-[rgba(201,169,110,0.04)]">
                    {trustIcons[i]}
                  </span>
                  <span
                    className="text-[18px] sm:text-[19px] font-normal text-[#8A8078] leading-[1.55]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Form */}
          <div className="flex-1" style={anim("0.18s")}>

            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full min-h-[320px] gap-6">
                <div className="w-14 h-14 rounded-full border border-[#C9A96E] flex items-center justify-center">
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                    <path d="M1 8L8 15L21 1" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3
                    className="font-light text-[#F5F0EB] mb-3"
                    style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.1 }}
                  >
                    {cf.successTitle}
                  </h3>
                  <p
                    className="text-[18px] sm:text-[19px] text-[#A89B8C] font-normal leading-[1.75]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {cf.successText}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-0">

                {/* Name */}
                <div className="relative border-b border-[rgba(255,255,255,0.1)] mb-2">
                  <label
                    className="absolute left-0 pointer-events-none transition-all duration-300 font-light"
                    style={{
                      fontFamily: "var(--font-body)",
                      top: isFloating("name") ? "4px" : "20px",
                      fontSize: isFloating("name") ? "11px" : "16px",
                      letterSpacing: isFloating("name") ? "0.2em" : "0",
                      color: focused === "name" ? "#C9A96E" : "rgba(168,155,140,0.6)",
                      textTransform: isFloating("name") ? "uppercase" : "none",
                    }}
                  >
                    {cf.fieldName}
                  </label>
                  <input
                    type="text"
                    required
                    value={values.name}
                    onChange={e => {
                      setValues(v => ({ ...v, name: e.target.value }));
                      if (touched.name) setErrors(er => ({ ...er, name: validateName(e.target.value) }));
                    }}
                    onFocus={() => setFocused("name")}
                    onBlur={() => {
                      setFocused(null);
                      setTouched(prev => ({ ...prev, name: true }));
                      setErrors(er => ({ ...er, name: validateName(values.name) }));
                    }}
                    className={inputClass("name")}
                    style={{ fontFamily: "var(--font-body)" }}
                    suppressHydrationWarning
                  />
                  <div
                    className="absolute bottom-0 left-0 h-px bg-[#C9A96E] transition-all duration-300 origin-left"
                    style={{ width: focused === "name" ? "100%" : "0%" }}
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="text-[12px] text-[#C9A96E] font-light mt-1.5" style={{ fontFamily: "var(--font-body)" }}>
                    {errors.name}
                  </p>
                )}

                {/* Phone */}
                <div className="relative border-b border-[rgba(255,255,255,0.1)] mb-2 mt-6">
                  <label
                    className="absolute left-0 pointer-events-none transition-all duration-300 font-light"
                    style={{
                      fontFamily: "var(--font-body)",
                      top: isFloating("phone") ? "4px" : "20px",
                      fontSize: isFloating("phone") ? "11px" : "16px",
                      letterSpacing: isFloating("phone") ? "0.2em" : "0",
                      color: focused === "phone" ? "#C9A96E" : "rgba(168,155,140,0.6)",
                      textTransform: isFloating("phone") ? "uppercase" : "none",
                    }}
                  >
                    {cf.fieldPhone}
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={values.phone}
                    onChange={e => {
                      const filtered = e.target.value.replace(/[^\d+\s()\-]/g, "");
                      setValues(v => ({ ...v, phone: filtered }));
                      if (touched.phone) setErrors(er => ({ ...er, phone: validatePhone(filtered) }));
                    }}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => {
                      setFocused(null);
                      setTouched(prev => ({ ...prev, phone: true }));
                      setErrors(er => ({ ...er, phone: validatePhone(values.phone) }));
                    }}
                    className={inputClass("phone")}
                    style={{ fontFamily: "var(--font-body)" }}
                    suppressHydrationWarning
                  />
                  <div
                    className="absolute bottom-0 left-0 h-px bg-[#C9A96E] transition-all duration-300 origin-left"
                    style={{ width: focused === "phone" ? "100%" : "0%" }}
                  />
                </div>
                {touched.phone && errors.phone && (
                  <p className="text-[12px] text-[#C9A96E] font-light mt-1.5" style={{ fontFamily: "var(--font-body)" }}>
                    {errors.phone}
                  </p>
                )}

                {/* Message */}
                <div className="relative border-b border-[rgba(255,255,255,0.1)] mb-2 mt-6">
                  <label
                    className="absolute left-0 pointer-events-none transition-all duration-300 font-light"
                    style={{
                      fontFamily: "var(--font-body)",
                      top: isFloating("message") ? "4px" : "20px",
                      fontSize: isFloating("message") ? "11px" : "16px",
                      letterSpacing: isFloating("message") ? "0.2em" : "0",
                      color: focused === "message" ? "#C9A96E" : "rgba(168,155,140,0.6)",
                      textTransform: isFloating("message") ? "uppercase" : "none",
                    }}
                  >
                    {cf.fieldMessage}
                  </label>
                  <textarea
                    rows={3}
                    value={values.message}
                    onChange={e => setValues(v => ({ ...v, message: e.target.value }))}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className={`${inputClass("message")} resize-none`}
                    style={{ fontFamily: "var(--font-body)" }}
                    suppressHydrationWarning
                  />
                  <div
                    className="absolute bottom-0 left-0 h-px bg-[#C9A96E] transition-all duration-300 origin-left"
                    style={{ width: focused === "message" ? "100%" : "0%" }}
                  />
                </div>

                <p
                  className="text-[13px] text-[#6B6057] font-light leading-[1.7] pt-4 pb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {cf.privacy}
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full sm:w-fit px-7 sm:px-8 py-3.5 sm:py-4 bg-[#C9A96E] hover:bg-[#B8944E] text-[#2A2A2A] text-[14px] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] flex items-center justify-center gap-3 disabled:opacity-70"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border border-[#2A2A2A] border-t-transparent rounded-full animate-spin" />
                      {cf.sending}
                    </>
                  ) : (
                    <>
                      {cf.submit}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.15)] to-transparent" />
    </section>
  );
}
