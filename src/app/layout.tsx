import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CookieBanner from "@/components/CookieBanner";
/**
 * What changed & why
 * - Removed commented Clerk import to reduce noise.
 * - Added CookieBanner for GDPR compliance.
 */
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cabinet Dentaire Rive Droite - Floirac, Bordeaux",
  description: "Cabinet dentaire moderne à Floirac, Bordeaux. Soins dentaires de qualité : implantologie, parodontologie, soins conservateurs, prothèses, blanchiment et pédodontie.",
  keywords: "dentiste, Floirac, Bordeaux, implantologie, parodontologie, soins dentaires",
  authors: [{ name: "Cabinet Dentaire Rive Droite" }],
  icons: {
    icon: [
      { url: '/icons8-tooth-pulsar-color-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons8-tooth-pulsar-color-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons8-tooth-pulsar-color-96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/icons8-tooth-pulsar-color-32.png',
    apple: [
      { url: '/icons8-tooth-pulsar-color-96.png', sizes: '96x96', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Cabinet Dentaire Rive Droite",
    description: "Cabinet dentaire moderne à Floirac, Bordeaux",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <Toaster />
      </body>
    </html>
  );
}
