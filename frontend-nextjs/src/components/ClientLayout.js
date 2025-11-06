'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/user/Header';
import Footer from '@/components/user/Footer';

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
