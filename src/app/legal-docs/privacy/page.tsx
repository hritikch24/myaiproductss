import { Scale, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — LegalDocs by KraftAI",
  description:
    "Privacy Policy for LegalDocs. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <Link
          href="/legal-docs"
          className="inline-flex items-center text-sm text-slate-400 hover:text-orange-500 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to LegalDocs
        </Link>

        <div className="flex items-center gap-2 mb-8">
          <Scale className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-bold text-white">
            Legal<span className="text-orange-500">Docs</span>
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-400 mb-12">
          Last updated: March 4, 2026
        </p>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Introduction
            </h2>
            <p>
              KraftAI (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates LegalDocs
              (accessible at kraftai.in/legal-docs). This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use our
              service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. Information We Collect
            </h2>
            <h3 className="text-lg font-medium text-slate-200 mt-4">
              a) Information You Provide
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Account Information:</strong> Name and email address when
                you sign in via Google Authentication.
              </li>
              <li>
                <strong>Document Data:</strong> Names, addresses, and other details
                you enter to generate legal documents (rental agreements, NDAs,
                freelancer contracts).
              </li>
              <li>
                <strong>Payment Information:</strong> Payment details are processed
                securely by Razorpay. We do not store your card numbers or bank
                details on our servers.
              </li>
            </ul>
            <h3 className="text-lg font-medium text-slate-200 mt-4">
              b) Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent, browser
                type, device information, and IP address.
              </li>
              <li>
                <strong>Cookies:</strong> We use essential cookies for
                authentication and session management. Analytics cookies (Google
                Analytics) help us understand usage patterns.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To generate and deliver legal documents you request.</li>
              <li>To process payments via Razorpay.</li>
              <li>To authenticate your identity via Google Sign-In.</li>
              <li>To improve our services and user experience.</li>
              <li>To communicate important service updates.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Third-Party Services
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Google Authentication:</strong> Used for secure sign-in.
                Subject to Google&apos;s Privacy Policy.
              </li>
              <li>
                <strong>Razorpay:</strong> Payment processing. Subject to
                Razorpay&apos;s Privacy Policy.
              </li>
              <li>
                <strong>Google Analytics:</strong> Usage analytics. Subject to
                Google&apos;s Privacy Policy.
              </li>
              <li>
                <strong>AI Providers:</strong> We use AI services to generate
                document content. Document data may be processed by these services
                but is not stored by them.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              5. Data Retention
            </h2>
            <p>
              We retain your account information as long as your account is active.
              Generated documents are stored for 90 days from creation, after which
              they are automatically deleted. You may request deletion of your data
              at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              6. Data Security
            </h2>
            <p>
              We implement industry-standard security measures including encryption
              in transit (HTTPS/TLS), secure authentication (OAuth 2.0), and access
              controls. However, no method of electronic transmission or storage is
              100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Your Rights (DPDP Act, 2023)
            </h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023 (India), you
              have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal data we hold.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Withdraw consent for data processing.</li>
              <li>Nominate an individual to exercise rights on your behalf.</li>
              <li>File a grievance with the Data Protection Board of India.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              8. Cookies
            </h2>
            <p>
              We use the following types of cookies:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Essential Cookies:</strong> Required for authentication and
                basic functionality.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors
                use the site (Google Analytics).
              </li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling
              essential cookies may affect functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              9. Children&apos;s Privacy
            </h2>
            <p>
              Our service is not intended for individuals under 18. We do not
              knowingly collect personal data from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be
              posted on this page with an updated &quot;Last updated&quot; date. Continued
              use of the service after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              11. Contact Us
            </h2>
            <p>
              For privacy-related inquiries or to exercise your rights under the
              DPDP Act, contact us at:{" "}
              <a
                href="mailto:hritik242000@gmail.com"
                className="text-orange-500 hover:underline"
              >
                hritik242000@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
