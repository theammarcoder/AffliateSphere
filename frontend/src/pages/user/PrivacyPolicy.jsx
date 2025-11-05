import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-darker">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: November 5, 2024
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <section className="card">
            <p className="text-gray-300 leading-relaxed">
              At AffiliateSphere, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website and use our services.
              Please read this privacy policy carefully.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                <p className="leading-relaxed">
                  We may collect personal information that you voluntarily provide to us when you register
                  on the website, express an interest in obtaining information about us or our products,
                  or otherwise contact us. This includes:
                </p>
                <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                  <li>Name and email address</li>
                  <li>Username and password</li>
                  <li>Contact preferences</li>
                  <li>Purchase history and preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Automatically Collected Information</h3>
                <p className="leading-relaxed">
                  We automatically collect certain information when you visit, use, or navigate our website.
                  This includes device information, browser type, IP address, and usage patterns.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To provide, operate, and maintain our website and services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To improve, personalize, and expand our services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To understand and analyze how you use our website</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To communicate with you about updates, offers, and promotions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To process your transactions and manage your orders</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>To detect, prevent, and address technical issues or fraud</span>
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Data Security</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. However, no
              method of transmission over the Internet or electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Your Privacy Rights</h2>
            </div>
            <div className="text-gray-300 space-y-3">
              <p className="leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>The right to access and receive a copy of your personal data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>The right to rectify or update inaccurate personal data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>The right to delete your personal data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>The right to object to or restrict processing of your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>The right to withdraw consent at any time</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="card bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Contact Us</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices,
              please contact us at:
            </p>
            <a 
              href="mailto:ammarahmadkhan757@gmail.com"
              className="text-primary hover:text-pink-400 transition-colors font-medium"
            >
              ammarahmadkhan757@gmail.com
            </a>
          </section>

          {/* Updates */}
          <section className="card">
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the "Last updated" date. You are
              advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
