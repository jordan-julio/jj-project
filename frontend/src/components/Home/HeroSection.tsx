'use client';
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Award, Clock, DollarSign, MapPin, Star } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/motion';

export const HeroSection = () => {
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
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold relative ${
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
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
                className="group bg-white border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-lg hover:border-gray-300 hover:shadow-lg"
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
                          className={`${project.color} h-2 rounded-full`}
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