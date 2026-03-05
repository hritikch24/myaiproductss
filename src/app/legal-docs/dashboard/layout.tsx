import { Navbar } from "@/components/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <Navbar />
      <main className="relative mx-auto max-w-6xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}
