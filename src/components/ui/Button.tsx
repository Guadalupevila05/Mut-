import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'ghost' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
  {
    className,
    variant = 'primary',
    size = 'md',
    fullWidth,
    children,
    ...props
  },
  ref) =>
  {
    const baseStyles =
    'inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-darkBg';
    const variants = {
      primary:
      'bg-accent text-white hover:bg-accent/90 shadow-sm shadow-accent/20 border-t border-white/20',
      ghost:
      'bg-transparent text-ink dark:text-warmWhite hover:bg-black/5 dark:hover:bg-white/10',
      outline:
      'bg-transparent border border-ink/20 dark:border-warmWhite/20 text-ink dark:text-warmWhite hover:bg-ink hover:text-white dark:hover:bg-warmWhite dark:hover:text-ink',
      glass:
      'glass text-ink dark:text-warmWhite hover:bg-white/80 dark:hover:bg-darkBg-alt/80'
    };
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base'
    };
    return (
      <motion.button
        ref={ref}
        whileTap={{
          scale: 0.97
        }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}>
        
        {children}
      </motion.button>);

  }
);
Button.displayName = 'Button';