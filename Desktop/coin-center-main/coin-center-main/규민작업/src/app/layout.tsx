import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAUS Coin - Futuristic Crypto Control Center",
  description: "KAUS Coin Control Center - Monitor markets, track wallets, and manage your crypto assets with full on-chain transparency",
  keywords: ["KAUS", "KAUS Coin", "Crypto", "DeFi", "Blockchain", "Web3", "Cryptocurrency"],
  authors: [{ name: "KAUS Team" }],
  creator: "KAUS",
  publisher: "KAUS",
  metadataBase: new URL('https://kaus.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "KAUS Coin - Futuristic Crypto Control Center",
    description: "Monitor markets, track wallets, and manage your crypto assets with full on-chain transparency",
    url: "https://kaus.io",
    siteName: "KAUS Coin",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KAUS Coin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAUS Coin - Futuristic Crypto Control Center",
    description: "Monitor markets, track wallets, and manage your crypto assets",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

