import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedLab",
  description: "Medical Laboratory Systems Training",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-neutral-100 font-outfit">
        {/* Top Navigation */}
        <header className="bg-white border-b border-neutral-200">
          <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
            <Link href="/" className="font-mono text-xl font-bold text-rose-500 tracking-tight">
              MEDLAB<span className="text-neutral-300">_</span>
            </Link>
            <nav className="flex items-center gap-8">
              <Link
                href="/uom"
                className="text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-rose-500 transition-colors"
              >
                Units
              </Link>
              <Link
                href="/testcategories"
                className="text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-rose-500 transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/medicaltests"
                className="text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-rose-500 transition-colors"
              >
                Tests
              </Link>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="max-w-6xl mx-auto px-8 py-10">{children}</main>

        {/* Footer */}
        <footer className="max-w-6xl mx-auto px-8 py-8 border-t border-neutral-200 mt-8 flex justify-between items-center">
          <span className="font-mono text-xs text-neutral-300">MEDLAB_</span>
          <span className="text-xs text-neutral-400">
            © 2026 Medical Laboratory Systems Training
          </span>
        </footer>
      </body>
    </html>
  );
}
