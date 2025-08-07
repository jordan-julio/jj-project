'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/motion';

// Professional CTA Section with Parallax
export const CTASection = () => {
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
        className="absolute inset-0 transparent"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900" />
      
      <motion.div 
        className="relative max-w-4xl mx-auto px-6 text-center text-white"
        style={{ opacity, y }}
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
            className="group bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 shadow-xl"
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
            className="group bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900"
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