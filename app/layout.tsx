import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header";

export const metadata: Metadata = {
  title: "Song Jaehyun",
  description: "Backend systems and API engineering demos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-950 antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}