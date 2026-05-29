import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from 'lucide-react';
import { useFavorites } from '../lib/supabase';
import { ProductCard } from '../components/product/ProductCard';

export const Favorites = () => {
  const { products, loading } = useFavorites();

  return (
    <div className="min-h-screen pt-8 px-4 md:px-8 max-w-7xl mx-auto pb-24">
      <h1 className="text-3xl font-display font-bold mb-8 tracking-tight">
        Guardados
      </h1>

      {loading ? (
        <p className="text-sm text-ink/50 dark:text-warmWhite/50">
          Cargando...
        </p>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24">
          <div className="w-20 h-20 rounded-full glass flex items-center justify-center mb-6">
            <HeartIcon size={28} className="text-ink/40" />
          </div>
          <h3 className="font-display font-bold text-xl mb-2">
            Todavía no guardaste nada
          </h3>
          <p className="text-sm text-ink/60 dark:text-warmWhite/60 max-w-xs mb-6">
            Tocá el corazón en cualquier prenda y la vas a encontrar acá.
          </p>
          <Link
            to="/feed"
            className="text-sm font-medium text-accent underline underline-offset-4"
          >
            Explorar prendas
          </Link>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};
