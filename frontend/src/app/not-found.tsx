'use client';
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft, HelpCircle, Mail, MapPin } from "lucide-react";
import Link from "next/link";

// Mock components for demo
const Header = () => (
  <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">K</span>
        </div>
        <div>
          <span className="text-xl font-bold text-gray-900">KerjaKita</span>
          <div className="text-xs text-gray-500">Indonesia&apos;s Premier Freelance Platform</div>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-4">
        <MapPin className="w-4 h-4" />
        <span>Made in Indonesia</span>
      </div>
      <p className="text-sm">© 2024 KerjaKita. All rights reserved.</p>
    </div>
  </footer>
);

export default function NotFound() {
  const quickLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Browse Projects", icon: Search },
    { href: "/help", label: "Help Center", icon: HelpCircle },
    { href: "/contact", label: "Contact Us", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated 404 Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="mb-12"
          >
            <div className="relative">
              {/* Background circles */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-80 h-80 border border-slate-200 rounded-full opacity-20" />
              </motion.div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-60 h-60 border border-blue-200 rounded-full opacity-30" />
              </motion.div>
              
              {/* Main 404 Text */}
              <motion.div 
                className="relative z-10"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              >
                <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text leading-none">
                  404
                </h1>
              </motion.div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute top-10 left-10 w-8 h-8 bg-blue-500/20 rounded-lg"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-20 right-16 w-6 h-6 bg-indigo-500/20 rounded-full"
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div 
                className="absolute bottom-16 left-20 w-4 h-4 bg-slate-500/20 rounded-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, -180, -360]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. 
              Let&apos;s get you back to finding amazing freelance opportunities.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <Link href={link.href}>
                    <motion.div
                      className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer"
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <link.icon className="w-8 h-8 text-slate-600 group-hover:text-blue-600 transition-colors mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {link.label}
                      </p>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Primary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <motion.button
                className="group bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 justify-center"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>
            
            <motion.button
              onClick={() => window.history.back()}
              className="group bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 justify-center"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
          </motion.div>
        </div>
      </main>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/6 w-64 h-64 bg-slate-200/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <Footer />
    </div>
  );
}