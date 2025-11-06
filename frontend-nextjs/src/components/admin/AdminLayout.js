'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, 
  Package, 
  Grid, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/check', { withCredentials: true });
      if (response.data.success && response.data.authenticated) {
        setAdmin({ email: response.data.email });
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/categories', icon: Grid, label: 'Categories' },
    { path: '/admin/products', icon: Package, label: 'Products' }
  ];

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-dark-bgSecondary border-r border-light-border dark:border-dark-border flex-col transition-colors duration-300">
        <div className="p-6 border-b border-light-border dark:border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image 
                src="/favicon.svg" 
                alt="AffiliateSphere" 
                width={40} 
                height={40}
                className="w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">AffiliateSphere</h1>
              <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path || 
                             (item.path === '/admin/products' && pathname?.startsWith('/admin/products'));
              
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : 'text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-bgSecondary dark:hover:bg-dark-bg hover:text-light-text dark:hover:text-dark-text'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-light-border dark:border-dark-border">
          <div className="mb-3 px-4 py-2 bg-light-bgSecondary dark:bg-dark-bg rounded-lg">
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">Logged in as</p>
            <p className="text-sm font-semibold truncate">{admin?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsSidebarOpen(false)}>
          <aside className="w-64 h-full bg-white dark:bg-dark-bgSecondary border-r border-light-border dark:border-dark-border flex flex-col animate-slide-up transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-light-border dark:border-dark-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative">
                  <Image 
                    src="/favicon.svg" 
                    alt="AffiliateSphere" 
                    width={40} 
                    height={40}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold gradient-text">AffiliateSphere</h1>
                  <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">Admin Panel</p>
                </div>
              </div>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-primary-500 text-white'
                            : 'text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-bgSecondary dark:hover:bg-dark-bg'
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-light-border dark:border-dark-border">
              <div className="mb-3 px-4 py-2 bg-light-bgSecondary dark:bg-dark-bg rounded-lg">
                <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">Logged in as</p>
                <p className="text-sm font-semibold truncate">{admin?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-white dark:bg-dark-bgSecondary border-b border-light-border dark:border-dark-border p-4 flex items-center justify-between transition-colors duration-300">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold gradient-text">AffiliateSphere</h1>
          <div className="w-6"></div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}

