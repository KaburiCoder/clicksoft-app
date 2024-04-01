import type { Metadata } from "next";
import "./globals.css";
import "../styles/index";
import { natoSansKR } from "@/fonts/fonts";
import { cn } from "@/lib/utils";
import Providers from "@/lib/providers";

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
  // modal: React.ReactNode;
}>) {
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
          {/* {modal} */}
          <div id="modal-root" />
          <div id="drawer-root" />
        </Providers>
      </body>
    </html>
  );
}
