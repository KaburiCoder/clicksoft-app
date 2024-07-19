import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import "../styles/index";
import { natoSansKR } from "@/fonts/fonts";
import { cn } from "@/lib/utils";
import Providers from "@/lib/providers";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  title: "클릭소프트 웹 앱",
  description: "클릭소프트 웹 앱",
  appleWebApp: true,
};

export default function RootLayout({
  children,
  // modal,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NEXT_ENV === "ingress") noStore();

  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={cn(
          natoSansKR.className,
          "min-h-screen overflow-auto bg-background font-sans antialiased",
        )}
      >
        <Providers>
          {children}
          <div id="screen-root" />
          <div id="modal-root" />
          <div id="drawer-root" />
        </Providers>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
