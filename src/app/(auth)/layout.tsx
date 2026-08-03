import { Footer } from "@/components/footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex flex-1 flex-col pb-10 md:pb-14">{children}</main>
      <Footer />
    </>
  );
}
