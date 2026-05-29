import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useLike } from '../../lib/supabase';

interface LikeButtonProps {
  productId?: string;
  initialLiked?: boolean;
  className?: string;
  size?: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  productId,
  initialLiked = false,
  className,
  size = 24,
}) => {
  // Si nos pasan un productId, sincronizamos con Supabase (tabla `likes`).
  // Si no, fallback a estado local (uso histórico del botón).
  const connected = !!productId;
  const remote = useLike(productId ?? '');
  const [localLiked, setLocalLiked] = useState(initialLiked);

  const liked = connected ? remote.liked : localLiked;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (connected) {
      remote.toggle();
    } else {
      setLocalLiked((v) => !v);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={handleClick}
      className={cn(
        'p-2 rounded-full glass flex items-center justify-center transition-colors',
        liked ? 'text-accent' : 'text-ink dark:text-warmWhite',
        className,
      )}
    >
      <motion.div
        initial={false}
        animate={{ scale: liked ? [1, 1.2, 1] : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <HeartIcon
          size={size}
          className={cn('transition-colors', liked && 'fill-current')}
        />
      </motion.div>
    </motion.button>
  );
};