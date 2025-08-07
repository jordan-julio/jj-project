'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Smartphone, Globe, Zap, CheckCircle } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/utils/motion';

export const SolutionsSection = () => {
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
              className={`relative ${solution.bgColor} rounded-2xl p-8 hover:shadow-xl border border-gray-100`}
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
                className={`w-full bg-gradient-to-r ${solution.color} text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg`}
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