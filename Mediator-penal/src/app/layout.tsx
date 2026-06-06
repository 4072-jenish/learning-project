import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FuturisticNavbar from "@/components/FuturisticNavbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import ReduxProvider from "@/store/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Futuristic Blog Platform",
  description: "A modern blog platform with stunning animations",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AnimatedBackground />
        <ReduxProvider>
          <FuturisticNavbar />
          <main className="pt-16">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}