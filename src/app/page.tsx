import Link from "next/link";
import { Scale, Gamepad2, Bot, ArrowRight } from "lucide-react";

const products = [
  {
    name: "Kanoon Simplified",
    description: "AI-powered legal document generator for India. Create rental agreements, NDAs, and freelancer contracts in multiple Indian languages.",
    href: "/kanoon",
    icon: Scale,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    status: "Live",
  },
  {
    name: "AI Games",
    description: "Play AI-powered games online. Experience the future of gaming with intelligent opponents and dynamic gameplay.",
    href: "#",
    icon: Gamepad2,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    status: "Coming Soon",
  },
  {
    name: "AI Chatbot",
    description: "Advanced AI chatbot for business and personal use. Get instant answers, automate support, and boost productivity.",
    href: "#",
    icon: Bot,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    status: "Coming Soon",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">
            Kraft<span className="text-orange-500">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/kanoon/login"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/kanoon"
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Welcome to <span className="text-orange-500">KraftAI</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          A collection of AI-powered products designed to simplify your life.
          From legal documents to gaming, we&apos;re building the future of intelligent tools.
        </p>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-8 text-2xl font-bold text-white">Our Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700"
            >
              <div className={`mb-4 inline-flex rounded-lg p-3 ${product.bgColor}`}>
                <product.icon className={`h-6 w-6 ${product.color}`} />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <span className={`text-xs font-medium ${
                  product.status === "Live" ? "text-green-400" : "text-slate-500"
                }`}>
                  {product.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{product.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-orange-500 opacity-0 transition-opacity group-hover:opacity-100">
                Explore <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} KraftAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
