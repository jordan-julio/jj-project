'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Star, MessageCircle, CheckCircle, TrendingUp, Users, Smartphone, MapPin, BarChart3, Globe, Award, Clock, DollarSign, Zap } from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Professional Header Component with Animation
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      try {
        setIsScrolled(window.scrollY > 20);
      } catch (error) {
        console.warn('Scroll handler error:', error);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 w-full backdrop-blur-lg border-b z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 border-gray-200 shadow-lg' : 'bg-white/80 border-gray-100 shadow-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <motion.div 
              className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-white font-bold text-xl">K</span>
            </motion.div>
            <motion.div 
              className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">KerjaKita</span>
              <motion.span 
                className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 15 }}
              >
                Pro
              </motion.span>
            </div>
            <div className="text-xs text-gray-500 font-medium">Indonesia&apos;s Premier Freelance Platform</div>
          </div>
        </motion.div>
        
        <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
          {['Solutions', 'Features', 'Enterprise', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -2 }}
              aria-label={`Navigate to ${item} section`}  // Add this line
            >
              {item}
            </motion.a>
          ))}
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all font-semibold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
};

// Professional Hero Section with Advanced Animations
// Add this import at the top of HeroSection
const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('freelancer');
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Add this line to define isInView
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"
          style={{ willChange: 'transform' }}  // Add this line
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl"
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-100/30 rounded-full blur-3xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <motion.div 
        className="relative max-w-7xl mx-auto px-6 py-32"
        style={{ y }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Trust Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 mb-8 shadow-sm"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i, type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">Trusted by 75K+ professionals</span>
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Indonesia</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              variants={fadeInUp}
            >
              Indonesia&apos;s Most
              <motion.span 
                className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                initial={{ backgroundPosition: '0% 50%' }}
                animate={{ backgroundPosition: '100% 50%' }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                Trusted Freelance
              </motion.span>
              Marketplace
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
              variants={fadeInUp}
            >
              Connect with verified Indonesian talent through our secure escrow system, 
              seamless WhatsApp integration, and enterprise-grade project management tools.
            </motion.p>
            
            {/* Tab Selector */}
            <motion.div 
              className="flex bg-gray-100 rounded-lg p-1 mb-8 max-w-md"
              variants={fadeInUp}
            >
              <AnimatePresence mode="wait">
                {['freelancer', 'client'].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all relative ${
                      activeTab === tab ? 'text-blue-600' : 'text-gray-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeTab === tab && (
                      <motion.div
                        className="absolute inset-0 bg-white shadow-sm rounded-md"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      {tab === 'freelancer' ? 'For Freelancers' : 'For Businesses'}
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              variants={fadeInUp}
            >
              <motion.button 
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'freelancer' ? 'Start Freelancing' : 'Hire Top Talent'}
                    </motion.span>
                  </AnimatePresence>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>
              
              <motion.button 
                className="group bg-white border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-lg hover:border-gray-300 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  Watch Demo
                  <motion.div 
                    className="w-2 h-2 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </span>
              </motion.button>
            </motion.div>
            
            {/* Key Metrics */}
            <motion.div 
              className="grid grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {[
                { metric: 'Rp 15B+', label: 'Total Earnings', icon: DollarSign },
                { metric: '98.5%', label: 'Success Rate', icon: Award },
                { metric: '24h', label: 'Avg Response', icon: Clock }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-3"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div 
                    className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </motion.div>
                  <div>
                    <motion.div 
                      className="text-2xl font-bold text-gray-900"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {item.metric}
                    </motion.div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Professional Dashboard Preview */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Project Management</h3>
                <div className="flex gap-2">
                  <motion.div 
                    className="w-3 h-3 bg-red-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div 
                    className="w-3 h-3 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div 
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>
              </div>
              
              {/* Mock Project List */}
              <motion.div 
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
              >
                {[
                  { name: 'E-commerce Website', progress: 85, status: 'In Progress', color: 'bg-blue-500' },
                  { name: 'Mobile App Design', progress: 100, status: 'Completed', color: 'bg-emerald-500' },
                  { name: 'Brand Identity', progress: 60, status: 'In Review', color: 'bg-yellow-500' },
                  { name: 'Content Strategy', progress: 30, status: 'Starting', color: 'bg-gray-400' }
                ].map((project, i) => (
                  <motion.div 
                    key={i}
                    className="border border-gray-100 rounded-lg p-4"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{project.name}</span>
                      <motion.span 
                        className="text-sm text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 + i * 0.2 }}
                      >
                        {project.progress}%
                      </motion.span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className={`${project.color} h-2 rounded-full transition-all duration-500`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${project.progress}%` } : {}}
                          transition={{ delay: 1 + i * 0.2, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{project.status}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        </motion.div>
    </section>
  );
};

// Professional CTA Section with Parallax
const CTASection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900"
        style={{ y }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <motion.div 
        className="relative max-w-4xl mx-auto px-6 text-center text-white"
        style={{ opacity }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          Ready to Scale Your Business?
        </motion.h2>
        <motion.p 
          className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          Join 2,500+ companies that trust KerjaKita for their freelance talent needs. 
          Start your first project today with zero setup fees.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <motion.button 
            className="group bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-all transform hover:-translate-y-1 shadow-xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255,255,255,0.3)",
              y: -8
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Start Free Trial
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
          <motion.button 
            className="group bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule Demo
          </motion.button>
        </motion.div>
        
        {/* Enterprise Logos */}
        <motion.div 
          className="border-t border-gray-700 pt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-sm text-gray-400 mb-8">Trusted by leading Indonesian companies</p>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {['Gojek', 'Tokopedia', 'Traveloka', 'Bukalapak'].map((company, i) => (
              <motion.div 
                key={i}
                className="bg-white/10 rounded-lg h-16 flex items-center justify-center"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255,255,255,0.2)",
                  y: -5
                }}
              >
                <span className="text-white font-semibold">{company}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Professional Footer with Animation
const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.footer 
      className="bg-gray-900 text-gray-400 py-16"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="grid md:grid-cols-4 gap-8 mb-12"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <motion.div 
            className="md:col-span-2"
            variants={fadeInLeft}
          >
            <motion.div 
              className="flex items-center gap-4 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5 }}
              >
                <span className="text-white font-bold text-xl">K</span>
              </motion.div>
              <div>
                <span className="text-2xl font-bold text-white">KerjaKita</span>
                <div className="text-xs text-gray-500">Indonesia&apos;s Premier Freelance Platform</div>
              </div>
            </motion.div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Connecting Indonesian businesses with world-class freelance talent through 
              secure, efficient, and scalable solutions.
            </p>
          </motion.div>
          
          {[
            {
              title: 'Platform',
              links: ['How it Works', 'Enterprise', 'Pricing', 'Success Stories']
            },
            {
              title: 'Support',
              links: ['Help Center', 'Contact Sales', 'API Documentation', 'System Status']
            }
          ].map((section, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
            >
              <h4 className="text-white font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <motion.li
                    key={j}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <a href="#" className="hover:text-white transition-colors">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p>© {new Date().getFullYear()} KerjaKita. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <motion.a 
              href="#" 
              className="hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Made in Indonesia</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const solutions = [
    {
      icon: Users,
      title: 'For Businesses',
      subtitle: 'Scale with confidence',
      description: 'Access pre-vetted Indonesian talent, manage projects efficiently, and scale your operations with enterprise-grade tools.',
      features: ['Talent Matching AI', 'Escrow Protection', 'Project Analytics', '24/7 Support'],
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Smartphone,
      title: 'For Freelancers',
      subtitle: 'Build your career',
      description: 'Connect with premium clients, showcase your skills, and grow your freelance business with professional tools.',
      features: ['Skill Verification', 'Payment Protection', 'Career Growth', 'WhatsApp Integration'],
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Globe,
      title: 'For Enterprises',
      subtitle: 'Enterprise solutions',
      description: 'Custom workforce solutions, dedicated account management, and advanced compliance tools for large organizations.',
      features: ['Custom Solutions', 'Dedicated Support', 'Advanced Analytics', 'Compliance Tools'],
      color: 'from-purple-600 to-violet-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <section className="py-24 bg-gray-50" ref={ref} id="solutions">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4" />
            Solutions for Every Need
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Built for Indonesian
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Digital Economy
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you&apos;re a growing startup, established business, or freelance professional, 
            KerjaKita provides tailored solutions for the Indonesian market.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className={`relative ${solution.bgColor} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100`}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <solution.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{solution.title}</h3>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {solution.subtitle}
                </p>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {solution.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {solution.features.map((feature, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 + i * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.button 
                className={`w-full bg-gradient-to-r ${solution.color} text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Professional Features Section
const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Shield,
      title: 'Secure Escrow System',
      description: 'Bank-grade security with automated milestone payments and dispute resolution.',
      stats: '99.9% Security Rate'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Integration',
      description: 'Native WhatsApp integration for seamless communication with Indonesian professionals.',
      stats: '80% Faster Response'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time project insights, performance metrics, and ROI tracking for better decisions.',
      stats: '3x Better Insights'
    },
    {
      icon: TrendingUp,
      title: 'AI-Powered Matching',
      description: 'Smart algorithms match you with the perfect talent based on skills, experience, and cultural fit.',
      stats: '95% Match Success'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Fully optimized mobile experience for managing projects and communication on the go.',
      stats: '70% Mobile Usage'
    },
    {
      icon: Globe,
      title: 'Local Market Focus',
      description: 'Deep understanding of Indonesian business culture, regulations, and payment methods.',
      stats: '100% Local Compliant'
    }
  ];

  return (
    <section className="py-24 bg-white" ref={ref} id="features">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-4 h-4" />
            Platform Features
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Succeed Together
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for the Indonesian market with features that understand 
            local business needs and cultural nuances.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="relative mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <CheckCircle className="w-3 h-3 text-white" />
                </motion.div>
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <motion.div 
                className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-700 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <TrendingUp className="w-3 h-3" />
                {feature.stats}
              </motion.div>
              
              {/* Hover effect overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Highlight Banner */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <Award className="w-4 h-4" />
            Most Trusted Platform
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Join 75,000+ Satisfied Users
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            From startups to enterprises, KerjaKita has helped Indonesian businesses 
            achieve their goals with world-class freelance talent.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: '75K+', label: 'Active Users' },
              { metric: '50K+', label: 'Projects Completed' },
              { metric: '98.5%', label: 'Success Rate' },
              { metric: '4.9/5', label: 'User Rating' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 500, damping: 15 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.metric}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};


// Main Professional App Component
export default function KerjaKitaProfessional() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <SolutionsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}