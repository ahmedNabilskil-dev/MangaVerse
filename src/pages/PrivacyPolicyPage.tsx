import { Database, Eye, FileText, Lock, Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last Updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">Introduction</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              MangaAI ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we handle information
              when you use our desktop application. Because MangaAI is a desktop
              application that stores all data locally on your device, we
              collect minimal information.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-purple-300">
              License Information
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              When you purchase a license, we collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
              <li>Email address (for license delivery and support)</li>
              <li>Payment information (processed securely by Paddle)</li>
              <li>License key validation data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-purple-300">
              Local Data Storage
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              All your creative work is stored locally on your device using
              SQLite database:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
              <li>Manga chapters, scenes, and panels</li>
              <li>Character designs and outfits</li>
              <li>Location and background data</li>
              <li>Dialog and speech bubble content</li>
              <li>Generated images</li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-green-300 text-sm">
                <strong>Important:</strong> This data never leaves your device
                and is not uploaded to our servers or any cloud service.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-purple-300 mt-6">
              Your API Keys
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              You provide your own Google Gemini API key to use the AI features.
              This key:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Is stored only on your local device</li>
              <li>Is never transmitted to our servers</li>
              <li>Communicates directly with Google's Gemini API</li>
              <li>Is encrypted in local storage</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">How We Use Information</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use the limited information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Validate your license and provide app access</li>
              <li>Send license keys and purchase confirmations</li>
              <li>Provide customer support</li>
              <li>
                Send important updates about the application (with your consent)
              </li>
              <li>Process refunds if requested</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">
                Data Sharing and Third Parties
              </h2>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-purple-300">
              Payment Processing
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use Paddle as our payment processor. Paddle collects and
              processes payment information according to their privacy policy.
              We do not store credit card information.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-purple-300">
              Google Gemini API
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              When you use AI features, your prompts and generated content are
              sent directly from your device to Google's Gemini API using your
              personal API key. This communication does not go through our
              servers. Please review Google's privacy policy for how they handle
              API requests.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-purple-300">
              No Analytics or Tracking
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We do not use analytics tools, tracking pixels, or telemetry in
              the desktop application. We do not monitor your usage or collect
              data about how you use the app.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">Data Security</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              We implement appropriate security measures:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>All local data is stored in encrypted SQLite databases</li>
              <li>API keys are encrypted before local storage</li>
              <li>License validation uses secure HTTPS connections</li>
              <li>
                We do not store passwords (license keys are used for
                authentication)
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">Your Rights</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Request deletion of your email and license information</li>
              <li>
                Export your local data (already accessible in your SQLite
                database)
              </li>
              <li>Opt out of marketing emails</li>
              <li>Request information about what data we store about you</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              To exercise these rights, contact us at:{" "}
              <a
                href="https://facebook.com/mangaaiapp"
                className="text-purple-400 hover:text-purple-300"
              >
                facebook.com/mangaaiapp
              </a>
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              MangaAI is not intended for children under 13 years of age. We do
              not knowingly collect information from children under 13. If you
              believe a child has provided us with information, please contact
              us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes by email or through the
              application. Your continued use of MangaAI after changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact
              us:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>
                Facebook:{" "}
                <a
                  href="https://facebook.com/mangaaiapp"
                  className="text-purple-400 hover:text-purple-300"
                >
                  facebook.com/mangaaiapp
                </a>
              </li>
              <li>Email: support@mangaai.app (if available)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
