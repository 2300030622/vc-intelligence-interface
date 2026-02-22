import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VC Intelligence Interface",
  description: "Precision AI Scout for Venture Capital",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-black text-white flex items-center justify-center font-bold">
                VC
              </div>
              <div>
                <div className="font-semibold leading-tight">
                  VC Intelligence Interface
                </div>
                <div className="text-xs text-gray-500">
                  Thesis-first scouting • Live enrichment
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Local demo • Server-side enrichment
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>

        <footer className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-gray-500">
            Built for VC sourcing workflow — search → profile → enrich → save → note
          </div>
        </footer>
      </body>
    </html>
  );
}