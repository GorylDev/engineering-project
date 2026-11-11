import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Brand } from "@/components/brand";
import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-ext-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/instrument-serif/latin-ext-400-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Olfunara — poznawaj świat zapachów", template: "%s · Olfunara" },
  description: "Odkrywaj perfumy według nut, rodziny zapachowej i okazji.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#tresc"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:p-3"
        >
          Przejdź do treści
        </a>
        <header className="site-header">
          <div className="shell header-inner">
            <Brand />
            <nav aria-label="Menu główne" className="site-nav">
              <Link href="/#odkrywaj">Odkrywaj</Link>
              <Link href="/#przewodnik">Przewodnik</Link>
              <Link href="/#oferty">Gdzie kupić</Link>
            </nav>
            <Link href="/wybor" className="button button-outline header-action">
              Pomóż mi wybrać
            </Link>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="shell footer-inner">
            <Brand />
            <p>Wersja demonstracyjna</p>
            <Link href="/szukaj" className="text-link">
              Katalog demonstracyjny
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
