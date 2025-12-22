import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iBuiltThis - Share Your Projects with the World",
  description:
    "A community platform for creator to showcase their apps, AI tools, SaaS products, and creative projects. Authentic launches, genuine feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <header>iBuiltThis</header>
        {children}
        <footer>iBuiltThis Inc. All rights reserved. </footer>
      </body>
    </html>
  );
}
