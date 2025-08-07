'use client';
import { FormEvent, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { AnimatePresence, motion } from 'framer-motion';
import { Shield, Mail, CheckCircle, Send, ArrowLeft, Lock, Home, Users, Briefcase } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [role, setRole] = useState<'freelancer' | 'client'>('freelancer')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}`,
        data: { role },
      }
    });
    
    setLoading(false);
    if (error) {
      setErr(error.message);
    } else {
      setSent(true);
    }
  };

  const resetForm = () => {
    setSent(false);
    setEmail('');
    setErr(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Floating geometric shapes for depth */}
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
          className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gray-300/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main Container */}
      <motion.div 
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        {/* Professional Card */}
        <motion.div 
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl relative overflow-hidden"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Subtle top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-600 to-gray-700" />
          
          {/* Header Section */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Back to Home Link */}
            <motion.div
              className="flex justify-start mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <motion.button
                onClick={() => {
                  // Check if we're in a Next.js environment
                  if (typeof window !== 'undefined' && window.location) {
                    window.location.href = '/';
                  }
                }}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
                whileHover={{ x: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Home className="w-4 h-4" />
                Back to Home
              </motion.button>
            </motion.div>

            <motion.div 
              className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Shield className="w-7 h-7 text-slate-600" />
            </motion.div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Secure Login
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your email to receive a secure login link
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <motion.div 
                  className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
                >
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </motion.div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Link Sent</h2>
                <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                  We&apos;ve sent a secure login link to:
                </p>
                <p className="text-slate-700 font-medium mb-2 bg-gray-50 px-3 py-2 rounded-lg text-sm">
                  {email}
                </p>
                <p className="text-gray-500 text-xs mb-6">
                  Check your inbox and click the link to continue as a {role}
                </p>
                
                <motion.button
                  onClick={resetForm}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mx-auto text-sm font-medium"
                  whileHover={{ x: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Role Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-3"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    I am a...
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    <motion.button
                      type="button"
                      onClick={() => setRole('freelancer')}
                      className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        role === 'freelancer'
                          ? 'border-slate-600 bg-slate-50 text-slate-900'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        role === 'freelancer' ? 'bg-slate-600' : 'bg-gray-200'
                      }`}>
                        <Users className={`w-5 h-5 ${
                          role === 'freelancer' ? 'text-white' : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Freelancer</div>
                        <div className="text-xs text-gray-500">Looking for projects and clients</div>
                      </div>
                      {role === 'freelancer' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => setRole('client')}
                      className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        role === 'client'
                          ? 'border-slate-600 bg-slate-50 text-slate-900'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        role === 'client' ? 'bg-slate-600' : 'bg-gray-200'
                      }`}>
                        <Briefcase className={`w-5 h-5 ${
                          role === 'client' ? 'text-white' : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Project Creator</div>
                        <div className="text-xs text-gray-500">Hiring freelancers for projects</div>
                      </div>
                      {role === 'client' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <motion.input
                      type="email"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 pl-11 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all text-sm"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                    <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  whileHover={{ scale: loading ? 1 : 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="text-sm">Sending link...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <span className="text-sm">Send Login Link</span>
                        <Send className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Error Message */}
                <AnimatePresence>
                  {err && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -5, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-3"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0 mt-1.5" />
                        <p className="text-red-700 text-sm">{err}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
            <Lock className="w-3 h-3" />
            <span>Protected by enterprise security</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}