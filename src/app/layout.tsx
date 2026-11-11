import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Olfunara — poznawaj świat zapachów", template: "%s · Olfunara" },
  description: "Olfunara. Miejsce dla osób ciekawych świata perfum.",
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
        <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-line px-6 py-7 sm:px-10">
          <Link
            href="/"
            className="font-serif text-3xl tracking-tight"
            aria-label="Olfunara — strona główna"
          >
            olfunara<span className="text-[#9b8054]">.</span>
          </Link>
          <span className="text-xs tracking-[0.13em] text-muted uppercase">Świat zapachów</span>
        </header>
        {children}
        <footer className="mx-auto mt-20 flex max-w-6xl flex-wrap gap-3 border-t border-line px-6 py-7 text-sm text-muted sm:px-10">
          <span>Olfunara</span>
          <span aria-hidden="true">·</span>
          <span>Wersja demonstracyjna</span>
        </footer>
      </body>
    </html>
  );
}
