import { Navbar } from "@/components/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative mx-auto max-w-6xl px-6 py-10">
        {children}
      </main>
    </>
  );
}
