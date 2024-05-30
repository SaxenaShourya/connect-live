import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";

// Vercel
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConnectLive - Seamless Video Conferencing",
  description:
    "ConnectLive is your ultimate platform for seamless video conferencing. Schedule meetings, join calls, and manage recordings effortlessly.",
  keywords:
    "connect-live,video conferencing,seamless video calls,schedule meetings,budgeting tool,manage recordings,transaction management, join calls",
  authors: [{ name: "Shourya Saxena" }],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-dark-1`}>
        <ClerkProvider
          appearance={{
            layout: {
              showOptionalFields: false,
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "iconButton",
              logoImageUrl: "/logo.svg",
            },
          }}
        >
          <NextUIProvider>
            {children}
            <Analytics mode={"production"} />
            <SpeedInsights />
          </NextUIProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
