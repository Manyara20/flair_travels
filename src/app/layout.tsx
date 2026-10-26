import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/data/site";
import "./globals.css";

const shoulders = Big_Shoulders({
  variable: "--font-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
  adjustFontFallback: false,
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Flair Travels | Tours & Travel · Travel made easy",
    template: "%s | Flair Travels",
  },
  description: site.description,
  keywords: ["Nairobi travel agency", "Kenya safari", "air ticketing Kenya", "visa processing Nairobi", "MICE Kenya", "Maasai Mara", "Dubai holidays", "Seychelles"],
  openGraph: {
    title: "Flair Travels | Tours & Travel · Travel made easy",
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_KE",
  },
};

export const viewport: Viewport = {
  themeColor: "#2c3c4c",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${shoulders.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[70] bg-cyan px-4 py-2 font-mono text-xs text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
