"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const router   = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  const locale = pathname.split("/")[1] ?? "uk";

  const navLinks = [
    { label: t.nav.home,     href: `/${locale}`,          anchor: false },
    { label: t.nav.about,    href: `/${locale}/about`,    anchor: false },
    { label: t.nav.services, href: "#services",           anchor: true  },
    { label: t.nav.pricing,  href: `/${locale}/pricing`,  anchor: false },
    { label: t.nav.faq,      href: "#faq",                anchor: true  },
    { label: t.nav.contacts, href: "#contacts",           anchor: true  },
  ];

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  const go = (href: string, isAnchor: boolean) => {
    if (!isAnchor) { router.push(href); return; }
    if (!isHome) { router.push(`/${locale}${href}`); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#1A1A1A]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.2)] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-10 sm:py-12 pb-24 sm:pb-12 lg:pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8">

          {/* Logo */}
          <a
            href={`/${locale}`}
            onClick={e => { e.preventDefault(); go(`/${locale}`, false); }}
            className="group flex flex-col leading-tight shrink-0"
          >
            <span
              className="text-[18px] font-light tracking-[0.15em] text-[#C8BFB5] group-hover:text-[#C9A96E] transition-colors duration-300"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              І. Ширієвська
            </span>
            <span
              className="text-[9px] tracking-[0.3em] text-[#C9A96E] uppercase font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {locale === "ru" ? "Полиграфолог" : "Поліграфолог"}
            </span>
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2.5 sm:gap-x-6">
            {navLinks.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={e => { e.preventDefault(); go(item.href, item.anchor); }}
                className="text-[13px] tracking-[0.08em] text-[#6B6057] hover:text-[#A89B8C] uppercase font-light transition-colors duration-300 py-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p
            className="text-[12px] text-[#4A4040] font-light tracking-[0.05em] shrink-0"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © {new Date().getFullYear()} І. Ширієвська
          </p>

        </div>
      </div>
    </footer>
  );
}
