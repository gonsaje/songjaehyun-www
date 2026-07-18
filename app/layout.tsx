import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Jae Hyun Song | Software Engineer",
  description:
    "Client, product, and enterprise software engineering across backend systems, SaaS platforms, ecommerce, AEM, and AWS.",
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
        <Footer />
      </body>
    </html>
  );
}
