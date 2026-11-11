"use client";

import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pl">
      <body>
        <main className="mx-auto max-w-3xl px-6 py-24">
          <h1 className="font-serif text-4xl">Olfunara jest chwilowo niedostępna</h1>
          <p className="mt-6 text-muted">
            Nie udało się wyświetlić strony. Spróbuj ponownie za chwilę.
          </p>
          <button
            onClick={reset}
            className="mt-8 cursor-pointer rounded-full bg-ink px-7 py-3 text-white"
          >
            Spróbuj ponownie
          </button>
        </main>
      </body>
    </html>
  );
}
