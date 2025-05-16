import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ToastProvider } from "@heroui/toast";
import { HeroUIProvider } from "@heroui/system";
import { Suspense } from "react";

import { fontSans } from "@/config/fonts";
import Navbar from "@/components/global/navbar/navbar";

export const metadata: Metadata = {
  title: "LifePal",
  description:
    "Promo asuransi mobil dari sejumlah perusahaan asuransi terbaik di Indonesia. Tersedia jenis polis All Risk dan TLO. Cek sekarang!",
  keywords: ["Asurani", "Mobil", "Insurance"],
  icons: {
    icon: "https://blog-media.lifepal.co.id/app/uploads/sites/3/2020/01/17141437/lifepal-logo.png",
    shortcut:
      "https://blog-media.lifepal.co.id/app/uploads/sites/3/2020/01/17141437/lifepal-logo.png",
    apple:
      "https://blog-media.lifepal.co.id/app/uploads/sites/3/2020/01/17141437/lifepal-logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "https://blog-media.lifepal.co.id/app/uploads/sites/3/2020/01/17141437/lifepal-logo.png",
    },
  },

  openGraph: {
    title: "Lifepal",
    description:
      "Inisiasi Untuk Menciptakan Generasi Indonesia Yang Bersih dan Sehat, Serta Bebas Dari Stunting",
    url: "https://lifepal-frontend.netlify.app",
    siteName: "Lifepal",
    images: [
      {
        url: "https://blog-media.lifepal.co.id/app/uploads/sites/3/2020/01/17141437/lifepal-logo.png",
        width: 1200,
        height: 630,
        alt: "Lifepal ",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lifepal",
    description:
      "Promo asuransi mobil dari sejumlah perusahaan asuransi terbaik di Indonesia. Tersedia jenis polis All Risk dan TLO. Cek sekarang!",
    images: [
      "https://blog-media.lifepal.co.id/app/uploads/sites/3/2020/01/17141437/lifepal-logo.png",
    ],
  },
  alternates: {
    canonical: "https://lifepal-frontend.netlify.app",
    languages: {
      "en-US": "https://lifepal-frontend.netlify.app",
      "id-ID": "https://lifepal-frontend.netlify.app",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <HeroUIProvider>
          <div className="relative flex flex-col">
            <Suspense>
              <Navbar />
            </Suspense>
            <main className="container mx-auto max-w-7xl  px-6 flex-grow">
              <ToastProvider placement="bottom-right" toastOffset={10} />
              <NuqsAdapter>{children}</NuqsAdapter>
            </main>
          </div>
        </HeroUIProvider>
      </body>
    </html>
  );
}
