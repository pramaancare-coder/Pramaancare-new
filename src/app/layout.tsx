import type {Metadata} from 'next';
import './globals.css';
import './optimized.css';
import { Toaster } from "@/components/ui/toaster"
import { StructuredData } from "@/components/structured-data"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import LenisProvider from "@/components/lenis-provider"

export const metadata: Metadata = {
  title: 'Clinical Psychologist in Gurgaon & Delhi NCR | Pramaan Care',
  description: 'RCI-registered clinical psychologist offering counselling in Gurgaon & East of Kailash, Delhi NCR, plus secure online therapy across India. Book a session today.',
  keywords: [
    'Prerna Sethi Psychologist',
    'Ms Prerna Sethi Clinical Psychologist Delhi',
    'Best psychologist near me',
    'Anxiety treatment Delhi',
    'Depression counseling online',
    'Child psychologist Delhi',
    'Relationship counseling Delhi',
    'Cognitive behavioral therapy Delhi',
    'Affordable psychologist Delhi',
    'Top rated psychologist Delhi',
    'Online therapy India',
    'Mental health counseling Delhi',
    'Ms. Prerna Sethi reviews',
    'Prerna Sethi anxiety specialist',
    'Prerna Sethi child therapy',
    'Best clinical psychologist in Delhi for anxiety'
  ],
  authors: [{ name: 'Pramaan Care' }],
  creator: 'Pramaan Care',
  publisher: 'Pramaan Care',
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.pramaancare.com/',
    title: 'Clinical Psychologist in Gurgaon & Delhi NCR | Pramaan Care',
    description: 'RCI-registered clinical psychologist offering counselling in Gurgaon & East of Kailash, Delhi NCR, plus secure online therapy across India. Book a session today.',
    siteName: 'Pramaan Care',
    images: [
      {
        url: '/images/light logo.svg',
        width: 1200,
        height: 630,
        alt: 'Pramaan Care – Clinical Psychology & Counselling',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinical Psychologist in Gurgaon & Delhi NCR | Pramaan Care',
    description: 'Compassionate counselling & online therapy by an RCI-registered clinical psychologist.',
    images: ['/images/light logo.svg'],
  },
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://www.pramaancare.com/',
  },
  category: 'health',
  other: {
    'keywords': 'Prerna Sethi Psychologist, Ms Prerna Sethi Clinical Psychologist Delhi, Best psychologist near me, Anxiety treatment Delhi, Depression counseling online, Child psychologist Delhi, Relationship counseling Delhi, Cognitive behavioral therapy Delhi, Affordable psychologist Delhi, Top rated psychologist Delhi, Online therapy India, Mental health counseling Delhi'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/Fevicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Forum&family=Onest:wght@100..900&display=swap');
        `}} />
      </head>
      <body className="font-body antialiased">
        <LenisProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground">
            Skip to main content
          </a>
          {children}
          <Toaster />
          <StructuredData />
          <Analytics />
          <SpeedInsights />
        </LenisProvider>
      </body>
    </html>
  );
}
