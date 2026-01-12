import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import RiskBanner from "@/components/RiskBanner";

export const metadata: Metadata = {
  title: "Trenches: Spray & Pray",
  description: "Non-custodial belief coordination protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <RiskBanner />
        <BottomNav />
      </body>
    </html>
  );
}
