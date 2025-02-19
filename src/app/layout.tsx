import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To My Love",
  description: "A special page for a special person",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-[rgb(236,224,255)] to-[rgb(221,214,243)]">
          {children}
        </main>
      </body>
    </html>
  );
}
