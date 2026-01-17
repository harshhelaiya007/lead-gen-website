import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadGen Pro - Transform Your Business with Quality Leads",
  description: "Get high-quality leads that convert. Our proven lead generation strategies help businesses grow faster and smarter.",
  keywords: ["lead generation", "business growth", "marketing", "sales leads", "B2B leads"],
  authors: [{ name: "LeadGen Pro" }],
  openGraph: {
    title: "LeadGen Pro - Transform Your Business with Quality Leads",
    description: "Get high-quality leads that convert. Our proven lead generation strategies help businesses grow faster and smarter.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadGen Pro - Transform Your Business with Quality Leads",
    description: "Get high-quality leads that convert. Our proven lead generation strategies help businesses grow faster and smarter.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
