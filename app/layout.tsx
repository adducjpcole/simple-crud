import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medical Laboratory Systems",
  description: "Simple CRUD for Medical Laboratory Data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <nav className="bg-blue-700 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-8">
            <span className="font-bold text-lg tracking-wide">
              🧪 MedLab Systems
            </span>
            <div className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>
              <Link
                href="/uom"
                className="hover:text-blue-200 transition-colors"
              >
                Units of Measure
              </Link>
              <Link
                href="/testcategories"
                className="hover:text-blue-200 transition-colors"
              >
                Test Categories
              </Link>
              <Link
                href="/medicaltests"
                className="hover:text-blue-200 transition-colors"
              >
                Medical Tests
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-200 mt-10">
          © 2026 Medical Laboratory Systems Training
        </footer>
      </body>
    </html>
  );
}
