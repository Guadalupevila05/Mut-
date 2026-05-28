import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar } from '../ui/Avatar';
import { LikeButton } from '../ui/LikeButton';
import type { Product } from '../../lib/supabase';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ASPECTS = [
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/5]',
  'aspect-[3/4]',
];

const daysSince = (iso: string) => {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
}) => {
  const seller = product.profiles;
  const isFresh = daysSince(product.created_at) <= 1;
  const aspect = ASPECTS[index % ASPECTS.length];
  const cover = product.images?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.4),
      }}
      className="group mb-6 break-inside-avoid"
    >
      <Link
        to={`/product/${product.id}`}
        className="block relative rounded-[1.75rem] overflow-hidden bg-softGray dark:bg-darkBg-alt shadow-sm transition-all duration-700 hover:shadow-soft"
      >
        <div className={aspect}>
          {cover && (
            <img
              src={cover}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
          )}
        </div>

        {isFresh && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 dark:bg-darkBg/80 backdrop-blur-md text-ink dark:text-warmWhite text-[9px] font-bold tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Nuevo
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 z-10">
          <LikeButton productId={product.id} />
        </div>
      </Link>

      <div className="mt-4 px-1">
        <div className="flex justify-between items-baseline gap-2 mb-1">
          <h3 className="font-display font-semibold text-xl leading-tight">
            ${product.price.toLocaleString('es-AR')}
          </h3>
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <p className="text-sm text-ink/70 dark:text-warmWhite/70 truncate mb-1 group-hover:text-ink dark:group-hover:text-warmWhite transition-colors">
            {product.title}
          </p>
        </Link>

        <p className="text-[10px] uppercase tracking-wider text-ink/50 dark:text-warmWhite/50 mb-3 font-medium">
          {product.size} · {product.condition}
        </p>

        {seller && (
          <Link
            to={`/profile/${seller.username}`}
            className="flex items-center gap-2 group/seller"
          >
            <Avatar
              src={seller.avatar_url ?? ''}
              alt={seller.name ?? seller.username}
              size="sm"
              className="w-5 h-5"
            />
            <span className="text-xs text-ink/50 dark:text-warmWhite/50 group-hover/seller:text-ink dark:group-hover/seller:text-warmWhite transition-colors truncate">
              {seller.username}
            </span>
          </Link>
        )}
      </div>
    </motion.div>
  );
};
