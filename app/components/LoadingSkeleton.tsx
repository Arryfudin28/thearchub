'use client';

import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'pulse' | 'shimmer';
}

export function LoadingSkeleton({
  width = 'w-full',
  height = 'h-8',
  className = '',
  variant = 'pulse',
}: LoadingSkeletonProps) {
  const baseClasses = `${width} ${height} rounded-lg bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 ${className}`;

  if (variant === 'shimmer') {
    return (
      <motion.div
        className={`${baseClasses} relative overflow-hidden`}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />
    );
  }

  return (
    <motion.div
      className={`${baseClasses} border border-cyan-400/20`}
      animate={{
        boxShadow: [
          '0 0 20px rgba(34, 211, 238, 0.3)',
          '0 0 40px rgba(168, 85, 247, 0.4)',
          '0 0 20px rgba(34, 211, 238, 0.3)',
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
}

export function CardSkeleton() {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4 space-y-4"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <LoadingSkeleton height="h-6" width="w-1/3" />
      <LoadingSkeleton height="h-8" width="w-2/3" />
      <LoadingSkeleton height="h-4" width="w-full" />
    </motion.div>
  );
}

export function StatSkeleton() {
  return (
    <motion.div
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_16px_60px_-30px_rgba(59,130,246,0.45)]"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <LoadingSkeleton height="h-4" width="w-1/4" className="mb-4" />
      <LoadingSkeleton height="h-12" width="w-1/2" className="mb-4" />
      <LoadingSkeleton height="h-3" width="w-3/4" />
    </motion.div>
  );
}