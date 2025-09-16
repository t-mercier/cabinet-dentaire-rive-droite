import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
// import { ClerkProvider } from '@clerk/nextjs';

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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
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
        <Toaster />
      </body>
    </html>
  );
}
