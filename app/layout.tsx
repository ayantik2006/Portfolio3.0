import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";
import LayoutScales from "@/components/LayoutScales";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import KonamiCode from "@/components/KonamiCode";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";
import JsonLd from "@/components/JsonLd";
import {
  AUTHOR_EMAIL,
  DEFAULT_OG_IMAGE,
  KEYWORDS,
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE_DEFAULT,
  SITE_TITLE_TEMPLATE,
  SITE_URL,
  organizationJsonLd,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  category: "technology",
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? [process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION]
        : [],
      "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION
        ? [process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION]
        : [],
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
    creator: "@ayantik2006",
  },
  other: {
    "author-email": AUTHOR_EMAIL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F9F9" },
    { media: "(prefers-color-scheme: dark)", color: "#100F0F" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <JsonLd data={[personJsonLd(), websiteJsonLd(), organizationJsonLd()]} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-CDDPV5XE5T`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CDDPV5XE5T');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
        <Script
          src="/oneko.js"
          strategy="afterInteractive"
          style={{
            filter: "hue-rotate(180deg)"
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <LayoutScales />
            <Navbar />
            <CommandPalette />
            <ConsoleEasterEgg />
            <KonamiCode />
            <ChatWidget/>
            <ScrollToTop/>
            <div>{children}</div>
            <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-24 bg-linear-to-t from-[#F9F9F9] dark:from-[#100F0F] to-transparent" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
