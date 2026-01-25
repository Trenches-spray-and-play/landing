import type { Metadata } from "next";
import { Agentation } from "agentation";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";


export const metadata: Metadata = {
  metadataBase: new URL('https://playtrenches.xyz'),
  title: "Trenches: Spray & Play",
  description: "Earn more on your tokens just for being social.",
  openGraph: {
    images: ['https://playtrenches.xyz/trenches-og-v3.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://playtrenches.xyz/trenches-og-v3.png'],
  }
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
