import type { Metadata } from "next";
import { Agentation } from "agentation";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";


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
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
