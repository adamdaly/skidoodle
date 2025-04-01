import { Header } from "@/custom/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div>{children}</div>
      </div>
    </>
  );
}
