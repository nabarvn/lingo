import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lingo",
  description: "Learn new languages at your own pace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased hydrated">
      <ClerkProvider>
        <body className={font.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
