'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { staggerContainer, fadeInLeft, fadeInUp } from '@/utils/motion';


// Professional Footer with Animation
export const Footer = () => {
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