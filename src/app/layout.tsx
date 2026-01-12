import type { Metadata } from "next";
import "./globals.css";


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
      </body>
    </html>
  );
}
