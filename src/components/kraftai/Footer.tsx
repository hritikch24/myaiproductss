import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  nicheName: string;
  nicheSlug: string;
}

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Blog', href: '/blog' },
  { label: 'Metrics', href: '/kraftai-metrics' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: 'https://kraftai.in/privacy' },
  { label: 'Terms of Service', href: 'https://kraftai.in/terms' },
];

export default function Footer({ nicheName, nicheSlug }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-slate-950 border-t border-slate-800"
      aria-label={`${nicheName} footer`}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group mb-4" aria-label="KraftAI home">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-md shadow-indigo-500/20">
                <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
                Kraft<span className="text-indigo-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              AI-powered automation for {nicheName}. Transform your workflows
              and scale with intelligent solutions.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-indigo-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal links">
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-indigo-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
            <address className="not-italic space-y-2.5 text-sm text-slate-400">
              <p>
                <a
                  href="mailto:hello@kraftai.in"
                  className="transition-colors hover:text-indigo-400"
                >
                  hello@kraftai.in
                </a>
              </p>
            </address>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3" aria-label="Social media links">
              {['Twitter', 'LinkedIn', 'GitHub'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                  aria-label={`${platform} (coming soon)`}
                >
                  <span className="text-xs font-medium" aria-hidden="true">
                    {platform[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} KraftAI. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            {nicheName} solutions powered by KraftAI
          </p>
        </div>
      </div>
    </footer>
  );
}
