import { ThemeProvider } from '@/components/ui/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
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
    // provide dark theme to clerk
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
