import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "LearnNow — L'Apprentissage du Code du Futur",
  description:
    "LearnNow est une plateforme e-learning SaaS révolutionnaire qui fusionne l'univers du gaming moderne, de la productivité et de l'intelligence artificielle pour l'éducation des développeurs.",
  metadataBase: new URL("https://learnnow.tech"),
  openGraph: {
    title: "LearnNow — L'Apprentissage du Code du Futur",
    description:
      "Transformez l'éducation des développeurs en une aventure interactive et immersive. Évaluez vos scripts en temps réel et débloquez votre potentiel.",
    url: "https://learnnow.tech",
    siteName: "LearnNow",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnNow — L'Apprentissage du Code du Futur",
    description:
      "Transformez l'éducation des développeurs en une aventure interactive et immersive.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
