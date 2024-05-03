import Head from './_components/head';

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <Head />
      <div className="flex-grow overflow-auto   dark:bg-boxdark-2 dark:text-bodydark ">
        {children}
      </div>
    </div>
  );
}
