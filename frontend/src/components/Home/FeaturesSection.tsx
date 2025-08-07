'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, MessageCircle, BarChart3, TrendingUp, Smartphone, Globe, Star, CheckCircle, Award } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/utils/motion';

export const FeaturesSection = () => {
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
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-gray-200"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="relative mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-indigo-600">
                  <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white" />
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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
                className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full group-hover:bg-blue-50 group-hover:text-blue-700"
                whileHover={{ scale: 1.05 }}
              >
                <TrendingUp className="w-3 h-3" />
                {feature.stats}
              </motion.div>
              
              {/* Hover effect overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
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
