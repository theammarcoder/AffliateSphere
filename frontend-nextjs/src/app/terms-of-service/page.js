'use client';

import { FileText, CheckCircle, AlertCircle, Scale, Ban, Mail } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-6">
            <FileText className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary text-lg">
            Last updated: November 5, 2024
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <section className="card">
            <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              Welcome to AffiliateSphere. These Terms of Service (&quot;Terms&quot;) govern your use of our website
              and services. By accessing or using AffiliateSphere, you agree to be bound by these Terms.
              If you do not agree with any part of these Terms, you may not use our services.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-primary-500" />
              <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
            </div>
            <div className="space-y-3 text-light-textSecondary dark:text-dark-textSecondary">
              <p className="leading-relaxed">
                By creating an account or using our services, you acknowledge that you have read,
                understood, and agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="leading-relaxed">
                You must be at least 18 years old or the age of majority in your jurisdiction to use
                our services. By using AffiliateSphere, you represent that you meet this requirement.
              </p>
            </div>
          </section>

          {/* Use of Services */}
          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-primary-500" />
              <h2 className="text-2xl font-bold">Use of Services</h2>
            </div>
            <div className="space-y-4 text-light-textSecondary dark:text-dark-textSecondary">
              <div>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">Permitted Use</h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Browse and search for products listed on our platform</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Create an account and manage your profile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Leave reviews and ratings for products</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Access affiliate links to purchase products from our partners</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">Account Responsibilities</h3>
                <p className="leading-relaxed mb-2">
                  You are responsible for maintaining the confidentiality of your account credentials
                  and for all activities that occur under your account. You agree to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Provide accurate and complete information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Keep your password secure and confidential</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Notify us immediately of any unauthorized use</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>Update your information to keep it current</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <Ban className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold">Prohibited Activities</h2>
            </div>
            <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-3">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary ml-4">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">×</span>
                <span>Violate any laws or regulations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">×</span>
                <span>Infringe on intellectual property rights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">×</span>
                <span>Post false, misleading, or fraudulent content</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">×</span>
                <span>Attempt to gain unauthorized access to our systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">×</span>
                <span>Use automated systems to scrape or collect data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">×</span>
                <span>Interfere with or disrupt our services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">×</span>
                <span>Harass, abuse, or harm other users</span>
              </li>
            </ul>
          </section>

          {/* Affiliate Disclosure */}
          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-primary-500" />
              <h2 className="text-2xl font-bold">Affiliate Disclosure</h2>
            </div>
            <div className="space-y-3 text-light-textSecondary dark:text-dark-textSecondary">
              <p className="leading-relaxed">
                AffiliateSphere is an affiliate marketing platform. When you click on product links and
                make purchases through our site, we may earn a commission from our affiliate partners.
                This commission comes at no additional cost to you.
              </p>
              <p className="leading-relaxed">
                We only recommend products and services that we believe will provide value to our users.
                Our affiliate relationships do not influence our editorial content or product recommendations.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="card">
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <div className="space-y-3 text-light-textSecondary dark:text-dark-textSecondary">
              <p className="leading-relaxed">
                AffiliateSphere acts as an intermediary between users and affiliate partners. We are not
                responsible for:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>The quality, safety, or legality of products offered by third parties</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>The accuracy of product descriptions or pricing information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Transactions between you and affiliate partners</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Shipping, returns, or customer service issues with affiliate partners</span>
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                Our services are provided &quot;as is&quot; without warranties of any kind, either express or implied.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="card">
            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              All content on AffiliateSphere, including text, graphics, logos, images, and software, is
              the property of AffiliateSphere or its content suppliers and is protected by intellectual
              property laws. You may not reproduce, distribute, or create derivative works without our
              express written permission.
            </p>
          </section>

          {/* Termination */}
          <section className="card">
            <h2 className="text-2xl font-bold mb-4">Termination</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              We reserve the right to terminate or suspend your account and access to our services at our
              sole discretion, without notice, for conduct that we believe violates these Terms or is
              harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="card">
            <h2 className="text-2xl font-bold mb-4">Changes to These Terms</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              We may modify these Terms at any time. We will notify users of any material changes by
              posting the new Terms on this page and updating the &quot;Last updated&quot; date. Your continued
              use of our services after such modifications constitutes your acceptance of the updated Terms.
            </p>
          </section>

          {/* Contact */}
          <section className="card bg-primary-500/5 border-primary-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-primary-500" />
              <h2 className="text-2xl font-bold">Contact Us</h2>
            </div>
            <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <a 
              href="mailto:ammarahmadkhan757@gmail.com"
              className="text-primary-500 hover:text-pink-400 transition-colors font-medium"
            >
              ammarahmadkhan757@gmail.com
            </a>
          </section>

          {/* Governing Law */}
          <section className="card">
            <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without
              regard to its conflict of law provisions. Any disputes arising from these Terms or your use
              of our services shall be resolved through binding arbitration.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
