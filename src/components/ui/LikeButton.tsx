import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
interface LikeButtonProps {
  initialLiked?: boolean;
  className?: string;
  size?: number;
}
export const LikeButton: React.FC<LikeButtonProps> = ({
  initialLiked = false,
  className,
  size = 24
}) => {
  const [liked, setLiked] = useState(initialLiked);
  return (
    <motion.button
      whileTap={{
        scale: 0.8
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setLiked(!liked);
      }}
      className={cn(
        'p-2 rounded-full glass flex items-center justify-center transition-colors',
        liked ? 'text-accent' : 'text-ink dark:text-warmWhite',
        className
      )}>
      
      <motion.div
        initial={false}
        animate={{
          scale: liked ? [1, 1.2, 1] : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 15
        }}>
        
        <HeartIcon
          size={size}
          className={cn('transition-colors', liked && 'fill-current')} />
        
      </motion.div>
    </motion.button>);

};