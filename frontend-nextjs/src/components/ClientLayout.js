'use client';

import { Suspense } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/user/Header';
import Footer from '@/components/user/Footer';

// Fallback component for header loading
function HeaderFallback() {
  return (
    <header className="bg-white dark:bg-dark-bgSecondary border-b border-light-border dark:border-dark-border sticky top-0 z-50 backdrop-blur-lg bg-white/95 dark:bg-dark-bgSecondary/95 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="w-40 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="w-64 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse hidden md:block"></div>
          <div className="flex gap-4">
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse hidden md:block"></div>
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse hidden md:block"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Suspense fallback={<HeaderFallback />}>
          <Header />
        </Suspense>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
