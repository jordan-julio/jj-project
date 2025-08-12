'use client';
import { FormEvent, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AnimatePresence, motion } from 'framer-motion';
import { Shield, Mail, CheckCircle, Send, ArrowLeft, Lock, Home, Users, Briefcase, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [role, setRole] = useState<'freelancer' | 'client'>('freelancer');
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null);
  const [checkingUser, setCheckingUser] = useState(false);
  const [existingUserRole, setExistingUserRole] = useState<string | null>(null);
  const router = useRouter();

  // Track if we've completed at least one check for the current email
  const [hasCheckedEmail, setHasCheckedEmail] = useState(false);
  const [lastCheckedEmail, setLastCheckedEmail] = useState('');

  // Check if user exists when email changes
  useEffect(() => {
    // Validate email format before checking
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setIsExistingUser(null);
      setExistingUserRole(null);
      setCheckingUser(false);
      setHasCheckedEmail(false);
      setLastCheckedEmail('');
      return;
    }

    // If we already checked this exact email, don't check again
    if (email === lastCheckedEmail && hasCheckedEmail) {
      return;
    }

    // If email changed, reset the checked flag
    if (email !== lastCheckedEmail) {
      setHasCheckedEmail(false);
      setIsExistingUser(null);
      setExistingUserRole(null);
    }

    // Set checking state immediately before the debounce
    setCheckingUser(true);
    setErr(null); // Clear any previous errors

    // Debounce the actual API call
    const timeoutId = setTimeout(async () => {
      try {
        // Get the correct environment variables
        const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
          throw new Error('Missing Supabase configuration');
        }

        const response = await fetch(
          `${SUPABASE_URL}/functions/v1/check-user-exists`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ email: email.toLowerCase() }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Update state based on response
        setIsExistingUser(data.exists === true);
        
        if (data.exists && data.role) {
          setExistingUserRole(data.role);
          // If user exists, set their role as the selected role
          setRole(data.role as 'freelancer' | 'client');
        } else {
          setExistingUserRole(null);
        }
        
        // Mark that we've successfully checked this email
        setHasCheckedEmail(true);
        setLastCheckedEmail(email);
        
      } catch (error) {
        console.error('Error checking user:', error);
        // Don't show error to user for checking, just reset state
        setIsExistingUser(null);
        setExistingUserRole(null);
        // Still mark as checked to allow submission (fail open)
        setHasCheckedEmail(true);
        setLastCheckedEmail(email);
      } finally {
        setCheckingUser(false);
      }
    }, 800);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      // If we're cancelling a check in progress, reset checking state
      if (!hasCheckedEmail || email !== lastCheckedEmail) {
        setCheckingUser(false);
      }
    };
  }, [email]); // Remove lastCheckedEmail from dependencies to prevent double trigger

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    
    try {
      const supabase = createClient();
      
      // Prepare metadata for sign in
      const metadata: Record<string, unknown> = {};
      
      if (isExistingUser === false) {
        // New user - include role and new user flag
        metadata.role = role;
        metadata.isNewUser = true;
      } else if (isExistingUser === true && existingUserRole) {
        // Existing user - just include their existing role
        metadata.role = existingUserRole;
      }

      const { error } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: metadata
        }
      });

      if (error) {
        setErr(error.message);
      } else {
        setSent(true);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setErr('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSent(false);
    setEmail('');
    setErr(null);
    setIsExistingUser(null);
    setExistingUserRole(null);
    setRole('freelancer');
  };

  // Determine if we should show role selection
  const shouldShowRoleSelection = isExistingUser === false;
  
  // Determine if form is ready to submit
  // Must have: valid email, not checking, not loading, and have checked the email
  const canSubmit = email && 
                   !checkingUser && 
                   !loading && 
                   hasCheckedEmail && 
                   email === lastCheckedEmail;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6 relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Main Container */}
      <motion.div 
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <motion.div 
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl relative overflow-hidden"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-600 to-gray-700" />
          
          {/* Header */}
          <motion.div className="text-center mb-8">
            <motion.button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium mb-4 mx-auto"
              type="button"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </motion.button>

            <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center mx-auto mb-6">
              {isExistingUser ? (
                <UserCheck className="w-7 h-7 text-green-600" />
              ) : (
                <Shield className="w-7 h-7 text-slate-600" />
              )}
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {isExistingUser === true ? 'Welcome Back!' : 
               isExistingUser === false ? 'Create Account' : 'Login or Sign Up'}
            </h1>
            <p className="text-gray-600 text-sm">
              {isExistingUser === true ? 
                (existingUserRole ? `Continue as ${existingUserRole}` : 'Continue to your dashboard') :
               isExistingUser === false ? 'Choose your role to get started' :
               'Enter your email to continue'}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {isExistingUser ? 'Login Link Sent' : 'Welcome to KerjaKita!'}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  We&apos;ve sent a secure link to:
                </p>
                <p className="text-slate-700 font-medium mb-2 bg-gray-50 px-3 py-2 rounded-lg text-sm">
                  {email}
                </p>
                <p className="text-gray-500 text-xs mb-6">
                  {isExistingUser 
                    ? 'Click the link to continue to your dashboard'
                    : `Click the link to complete your ${role} account setup`
                  }
                </p>
                
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mx-auto text-sm font-medium"
                  type="button"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 pl-11 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all text-sm"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    {checkingUser && (
                      <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  
                  {/* User Status Indicator */}
                  <AnimatePresence>
                    {isExistingUser !== null && !checkingUser && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`mt-2 flex items-center gap-2 text-sm ${
                          isExistingUser ? 'text-green-600' : 'text-blue-600'
                        }`}
                      >
                        {isExistingUser ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Existing user - welcome back!
                            {existingUserRole && (
                              <span className="text-gray-500">({existingUserRole})</span>
                            )}
                          </>
                        ) : (
                          <>
                            <Users className="w-4 h-4" />
                            New user - choose your role below
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Role Selection - Only for new users */}
                <AnimatePresence>
                  {shouldShowRoleSelection && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <label className="block text-sm font-medium text-gray-700">
                        I am a...
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        <button
                          type="button"
                          onClick={() => setRole('freelancer')}
                          disabled={loading}
                          className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                            role === 'freelancer'
                              ? 'border-slate-600 bg-slate-50 text-slate-900'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                            <div className="w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setRole('client')}
                          disabled={loading}
                          className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                            role === 'client'
                              ? 'border-slate-600 bg-slate-50 text-slate-900'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                            <div className="w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative"
                  title={!canSubmit ? 
                    (checkingUser ? 'Verifying email...' : 
                     !hasCheckedEmail ? 'Please wait for email verification' : 
                     !email ? 'Please enter an email' : 
                     'Please wait...') : 
                    'Send magic link'}
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
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-sm">Sending link...</span>
                      </motion.div>
                    ) : checkingUser ? (
                      <motion.div
                        key="checking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-3"
                      >
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-sm">Verifying email...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <span className="text-sm">
                          {!hasCheckedEmail && email ? 'Verifying...' :
                           isExistingUser ? 'Send Login Link' : 
                           isExistingUser === false ? 'Create Account & Send Link' :
                           'Continue'}
                        </span>
                        {hasCheckedEmail && <Send className="w-4 h-4" />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* Error Message */}
                <AnimatePresence>
                  {err && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-3"
                    >
                      <p className="text-red-700 text-sm">{err}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
            <Lock className="w-3 h-3" />
            <span>Protected by enterprise security</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}