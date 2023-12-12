import { Logo } from './_components/logo';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col  items-center justify-center">
      <Logo />
      {children}
    </div>
  );
}
