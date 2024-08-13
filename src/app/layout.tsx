import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';
import TransactionProvider from '@/hooks/TransactionProvider';
import { ColorModeProvider } from '@/hooks/useColorMode';
import { ClerkProvider } from '@clerk/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter, Outfit, Poppins } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FOA - Funding Opportunities America',
  description: 'Finding Options for your Optimum Mortgage',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {metadata.title && <title>{metadata.title as string}</title>}
        {metadata.description && (
          <meta name="description" content={metadata.description as string} />
        )}
      </head>
      <body>
        <ErrorBoundary>
          <ColorModeProvider>
            <ClerkProvider>
              <TransactionProvider>
                {children}
                <SpeedInsights />
                <Toaster />
              </TransactionProvider>
            </ClerkProvider>
          </ColorModeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
