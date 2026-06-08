import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://classifyai.app'),
  title: 'ClassifyAI - AI-Powered Classification Studio',
  description: 'Train, deploy, and monitor machine learning classifiers with zero infrastructure. From text analysis to image recognition, build production-ready models in minutes.',
  openGraph: {
    title: 'ClassifyAI - AI-Powered Classification Studio',
    description: 'Train, deploy, and monitor ML classifiers with zero infrastructure.',
    url: 'https://classifyai.app',
    siteName: 'ClassifyAI',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClassifyAI - AI-Powered Classification Studio',
    description: 'Train, deploy, and monitor ML classifiers with zero infrastructure.',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
