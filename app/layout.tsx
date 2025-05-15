import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ToastProvider } from "@heroui/toast";
import { HeroUIProvider } from "@heroui/system";
import { Suspense } from "react";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import Navbar from "@/components/global/navbar/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
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
