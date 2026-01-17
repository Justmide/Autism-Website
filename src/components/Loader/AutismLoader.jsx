import React from 'react';
import { motion } from 'framer-motion';

const AutismLoader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Simple infinity symbol with pulse */}
        <div className="relative w-20 h-10 mx-auto mb-6">
          <motion.div
            className="absolute top-0 left-0 w-10 h-10 border-3 border-brand-sage rounded-full"
            animate={{
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-0 right-0 w-10 h-10 border-3 border-brand-navy rounded-full"
            animate={{
              x: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              delay: 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Brand name with loader */}
        <div className="space-y-2 mt-[-20px]">
          <motion.p
            className="font-heading text-xl font-bold text-brand-navy"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SpedEveryday
          </motion.p>
          
          {/* Progress bar */}
          <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-sage to-brand-navy"
              initial={{ width: '0%' }}
              animate={{ width: ['0%', '100%', '0%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <motion.p
            className="text-sm text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Supporting Families everywhere...
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default AutismLoader;