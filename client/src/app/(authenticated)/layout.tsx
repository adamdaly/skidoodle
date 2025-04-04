import { Footer } from "@/custom/components/footer";
import { Header } from "@/custom/modules/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow-0 flex-shrink-0 mx-auto w-screen max-w-6xl px-4 py-4">
        <Header />
      </div>
      <div className="flex flex-col flex-grow-1 flex-shrink-0 mx-auto w-screen max-w-6xl px-4 py-8">
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
