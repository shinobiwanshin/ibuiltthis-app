import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iBuiltThis",
  description: "iBuiltThis is a platform for building and sharing your own project with the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <header>iBuiltThis</header>
        {children}
        <footer>iBuiltThis Inc. All rights reserved. </footer>
      </body>
    </html>
  );
}
