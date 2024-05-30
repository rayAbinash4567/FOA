'use client';
import Loader from '@/components/common/Loader';
import '@/css/satoshi.css';
import '@/css/style.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import React, { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
        <script
          id="messenger-widget-b"
          src="https://cdn.botpenguin.com/website-bot.js"
          defer
        >
          6658bc7a0c1742d3de499172,6658bc3f1d98cba608a6a2f6
        </script>
      </body>
    </html>
  );
}
