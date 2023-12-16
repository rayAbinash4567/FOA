import { ThemeProvider } from '@/components/ui/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
const outfit = Outfit({ subsets: ['latin'] });

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
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={outfit.className}>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="gamehub-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
