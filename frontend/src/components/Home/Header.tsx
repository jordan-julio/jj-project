'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { Loader2, LogOut } from 'lucide-react';

export const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await createClient().auth.getSession();
      if (session?.user) {
        setIsLoggedIn(true);
        setEmail(session.user.email || '');
        setUserRole(session.user.user_metadata?.role || null);
      }
    };

    checkSession();

    const { data: listener } = createClient().auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      setEmail(session?.user.email || '');
      setUserRole(session?.user.user_metadata?.role || null);
      
      if (!session) {
        setIsLoggingOut(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Sign out from Supabase
      await createClient().auth.signOut();
      
      // Clear local state
      setIsLoggedIn(false);
      setEmail('');
      setUserRole(null);
      
      // Navigate to home page
      router.push('/');
      router.refresh();
      
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const getDashboardPath = () => {
    return userRole === 'client' ? '/client/dashboard' : '/freelancer/dashboard';
  };

  return (
    <motion.header 
      className="fixed top-0 w-full backdrop-blur-lg border-b z-50 bg-white/90"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <button 
          onClick={() => router.push('/')}
          className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors"
        >
          KerjaKita
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          {!isLoggedIn ? (
            <>
              {['Solutions', 'Features', 'Enterprise', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              ))}
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => router.push('/login')}
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              <span className="hidden md:inline text-gray-500">
                Hi, {email.split('@')[0]}
              </span>
              <button 
                onClick={() => router.push(getDashboardPath())} 
                className="hover:text-blue-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </>
                )}
              </button>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};