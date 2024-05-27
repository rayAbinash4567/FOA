import Head from './_components/head';
export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" ">
      {/* <Navbar /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Head />

      {/* <Header /> */}
      <div className=" "> {children}</div>
    </div>
  );
}
