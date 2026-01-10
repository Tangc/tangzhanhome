import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import HeptapodBackground from "@/components/HeptapodBackground";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://tangzhanx.com'),
  title: "Tang Zhan | Agentic Architect",
  description: "Senior Java Developer turned AI Native Programmer. 'Language is Thought'.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <HeptapodBackground />
        <main className="min-h-screen relative z-10 flex flex-col">
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </main>
      </body>
    </html>
  );
}
