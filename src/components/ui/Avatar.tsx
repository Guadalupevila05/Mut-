import React from 'react';
import { cn } from '../../utils/cn';
interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24'
  };
  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-softGray dark:bg-darkBg-alt border border-ink/5 dark:border-white/5 shrink-0',
        sizes[size],
        className
      )}>
      
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>);

};