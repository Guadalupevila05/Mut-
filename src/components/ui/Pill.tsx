import React from 'react';
import { cn } from '../../utils/cn';
interface PillProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'glass';
}
export const Pill: React.FC<PillProps> = ({
  children,
  className,
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-softGray dark:bg-darkBg-alt text-ink dark:text-warmWhite',
    outline:
    'border border-ink/15 dark:border-warmWhite/15 text-ink dark:text-warmWhite',
    glass: 'glass text-ink dark:text-warmWhite'
  };
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wide',
        variants[variant],
        className
      )}>
      
      {children}
    </span>);

};