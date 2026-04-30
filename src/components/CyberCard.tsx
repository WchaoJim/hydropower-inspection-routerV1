import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils';

interface CyberCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  icon?: React.ReactNode;
  tag?: string;
}

export const CyberCard: React.FC<CyberCardProps> = ({ 
  title, 
  subtitle, 
  children, 
  className, 
  headerAction,
  icon,
  tag
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "cyber-box p-4 group",
        className
      )}
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />
      
      {(title || subtitle || tag) && (
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            {icon && <div className="text-cyan-400">{icon}</div>}
            <div>
              <h3 className="text-sm font-medium tracking-wider text-slate-100 uppercase flex items-center gap-2">
                {title}
                {tag && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {tag}
                  </span>
                )}
              </h3>
              {subtitle && <p className="text-[10px] text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
