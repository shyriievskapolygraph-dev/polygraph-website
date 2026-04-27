"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { lang, t } = useLanguage();
  const router      = useRouter();
  const pathname    = usePathname();

  // e.g. "uk" or "ru"
  const locale = pathname.split("/")[1] ?? "uk";

  const navItems = [
    { label: t.nav.home,     href: `/${locale}`,          anchor: false },
    { label: t.nav.about,    href: `/${locale}/about`,    anchor: false },
    { label: t.nav.services, href: "#services",           anchor: true  },
    { label: t.nav.pricing,  href: `/${locale}/pricing`,  anchor: false },
    { label: t.nav.faq,      href: "#faq",                anchor: true  },
    { label: t.nav.contacts, href: "#contacts",           anchor: true  },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  const go = (href: string, isAnchor: boolean) => {
    setMenuOpen(false);
    if (!isAnchor) { router.push(href); return; }
    if (!isHomePage) { router.push(`/${locale}${href}`); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const switchLocale = (newLocale: string) => {
    // Replace locale segment in current path: /uk/about → /ru/about
    const newPath = pathname.replace(/^\/(uk|ru)/, `/${newLocale}`);
    router.push(newPath);
  };

  const LangToggle = ({ mobile }: { mobile?: boolean }) => (
    <div className="flex items-center border border-[rgba(201,169,110,0.3)] rounded-sm overflow-hidden">
      {(["uk", "ru"] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`${mobile ? "px-2 py-1 text-[10px] tracking-[0.1em]" : "px-2.5 py-1 text-[11px] tracking-[0.15em]"} font-light transition-all duration-200 ${
            locale === l
              ? "bg-[#C9A96E] text-[#2A2A2A]"
              : mobile ? "text-[#A89B8C]" : "text-[#A89B8C] hover:text-[#F5F0EB]"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow] duration-400 ease-out ${
        scrolled
          ? "bg-[#232323]/98 shadow-[0_1px_0_rgba(201,169,110,0.18)] py-3"
          : "bg-transparent py-4 lg:py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href={`/${locale}`}
            onClick={e => { e.preventDefault(); go(`/${locale}`, false); }}
            className="flex flex-col leading-tight group shrink-0"
          >
            <span
              className="text-[18px] sm:text-[22px] font-light tracking-[0.12em] sm:tracking-[0.15em] text-[#F5F0EB] group-hover:text-[#C9A96E] transition-colors duration-300"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              І. Ширієвська
            </span>
            <span
              className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-[#C9A96E] uppercase font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {lang === "ua" ? "Поліграфолог" : "Полиграфолог"}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={e => { e.preventDefault(); go(item.href, item.anchor); }}
                className="text-[13px] xl:text-[14px] tracking-[0.08em] text-[#A89B8C] hover:text-[#F5F0EB] transition-colors duration-300 uppercase font-light relative group"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            <LangToggle />

            <a
              href="#contact"
              onClick={e => { e.preventDefault(); go("#contact", true); }}
              className="px-5 py-2.5 bg-[#C9A96E] hover:bg-[#DFC190] text-[#2A2A2A] text-[13px] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] whitespace-nowrap"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {t.nav.cta}
            </a>
          </nav>

          {/* Mobile right: lang + burger */}
          <div className="flex items-center gap-3 lg:hidden">
            <LangToggle mobile />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center gap-[5px] w-11 h-11 -mr-1.5"
              aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
            >
              <span className={`block h-px bg-[#C9A96E] transition-all duration-300 origin-center ${menuOpen ? "w-6 rotate-45 translate-y-[6px]" : "w-6"}`} />
              <span className={`block h-px bg-[#C9A96E] transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"}`} />
              <span className={`block h-px bg-[#C9A96E] transition-all duration-300 origin-center ${menuOpen ? "w-6 -rotate-45 -translate-y-[6px]" : "w-6"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="absolute inset-0 bg-[#1A1A1A]/90 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

        <nav className={`absolute top-0 right-0 h-full w-[280px] sm:w-80 bg-[#242424] border-l border-[rgba(201,169,110,0.12)]
          flex flex-col pt-20 pb-8 px-7 transition-transform duration-400 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex flex-col flex-1 gap-1">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={e => { e.preventDefault(); go(item.href, item.anchor); }}
                className="py-4 border-b border-[rgba(201,169,110,0.08)] text-[#A89B8C] hover:text-[#F5F0EB] text-[15px] tracking-[0.15em] uppercase font-light transition-colors duration-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={e => { e.preventDefault(); go("#contact", true); }}
            className="mt-6 py-4 bg-[#C9A96E] hover:bg-[#DFC190] text-[#2A2A2A] text-[14px] tracking-[0.15em] uppercase font-medium text-center transition-colors duration-300"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.nav.ctaFull}
          </a>
        </nav>
      </div>
    </>
  );
}
