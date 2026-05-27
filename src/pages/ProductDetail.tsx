import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  ShareIcon,
  MessageCircleIcon,
  TagIcon,
  MapPinIcon } from
'lucide-react';
import { products, users } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Pill } from '../components/ui/Pill';
import { LikeButton } from '../components/ui/LikeButton';
import { ProductCard } from '../components/product/ProductCard';
export const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) || products[0];
  const seller = users.find((u) => u.id === product.sellerId)!;
  const related = products.
  filter((p) => p.type === product.type && p.id !== product.id).
  slice(0, 4);
  const [activeImage, setActiveImage] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  // Helper to italicize style in title for editorial feel
  const renderTitle = (title: string, style: string) => {
    if (title.toLowerCase().includes(style.toLowerCase())) {
      const parts = title.split(new RegExp(`(${style})`, 'gi'));
      return parts.map((part, i) =>
      part.toLowerCase() === style.toLowerCase() ?
      <span key={i} className="italic font-medium text-accent">
            {part}
          </span> :

      part

      );
    }
    return title;
  };
  return (
    <div className="min-h-screen pb-24 md:pb-12">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-center pointer-events-none">
        <Link
          to="/feed"
          className="p-3 rounded-full glass pointer-events-auto shadow-sm">
          
          <ChevronLeftIcon size={20} />
        </Link>
        <div className="flex gap-2 pointer-events-auto">
          <button className="p-3 rounded-full glass shadow-sm">
            <ShareIcon size={18} />
          </button>
          <LikeButton size={18} className="p-3 shadow-sm" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto md:px-8 md:pt-8 flex flex-col md:flex-row gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col gap-4">
          <div className="relative aspect-[4/5] md:rounded-[2.5rem] overflow-hidden bg-softGray dark:bg-darkBg-alt">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={product.images[activeImage]}
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                transition={{
                  duration: 0.3
                }}
                className="w-full h-full object-cover" />
              
            </AnimatePresence>
          </div>

          {product.images.length > 1 &&
          <div className="flex gap-3 px-4 md:px-0">
              {product.images.map((img, i) =>
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative w-20 h-24 rounded-2xl overflow-hidden transition-all ${activeImage === i ? 'ring-2 ring-accent ring-offset-2 dark:ring-offset-darkBg' : 'opacity-60 hover:opacity-100'}`}>
              
                  <img src={img} className="w-full h-full object-cover" />
                </button>
            )}
            </div>
          }
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 lg:w-2/5 px-4 md:px-0 flex flex-col">
          <div className="hidden md:flex justify-between items-start mb-8">
            <Link
              to="/feed"
              className="text-ink/50 hover:text-ink flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold transition-colors">
              
              <ChevronLeftIcon size={14} /> Volver
            </Link>
            <div className="flex gap-2">
              <button className="p-2.5 rounded-full hover:bg-black/5 transition-colors">
                <ShareIcon size={18} />
              </button>
              <LikeButton size={18} />
            </div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="flex-1">
            
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 tracking-tight leading-tight">
              {renderTitle(product.title, product.style)}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <p className="text-3xl font-display font-semibold">
                ${product.price.toLocaleString('es-AR')}
              </p>
              {product.originalPrice &&
              <p className="text-lg text-ink/40 line-through font-medium">
                  ${product.originalPrice.toLocaleString('es-AR')}
                </p>
              }
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              <Pill variant="outline" className="lowercase">
                talle {product.size}
              </Pill>
              <Pill variant="outline" className="lowercase">
                {product.condition}
              </Pill>
              <Pill variant="outline" className="lowercase">
                {product.style}
              </Pill>
            </div>

            <div className="prose prose-sm dark:prose-invert mb-10">
              <p className="text-ink/70 dark:text-warmWhite/70 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Seller Card */}
            <div className="p-5 rounded-[2rem] border border-ink/5 dark:border-white/5 bg-white/50 dark:bg-darkBg-alt/50 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Link to={`/profile/${seller.username}`}>
                  <Avatar src={seller.avatar} alt={seller.name} size="lg" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/profile/${seller.username}`}
                    className="block group">
                    
                    <h3 className="font-display font-semibold text-base group-hover:text-accent transition-colors truncate">
                      {seller.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-ink/50 truncate">
                    @{seller.username} · ⭐ {seller.rating}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0">
                  Ver perfil
                </Button>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-ink/60 bg-softGray dark:bg-darkBg rounded-xl px-3 py-2">
                <MapPinIcon size={12} />
                <span>
                  Envío o retiro en {seller.neighborhood}, Tandil (
                  {product.distanceKm} km)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="sticky bottom-24 md:bottom-0 mt-auto pt-4 bg-warmWhite/90 dark:bg-darkBg/90 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none flex flex-col gap-3 z-30 border-t border-ink/5 md:border-none -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0">
            <Button
              size="lg"
              fullWidth
              onClick={() => setShowOfferModal(true)}
              className="gap-2">
              
              <TagIcon size={18} /> Hacer oferta
            </Button>
            <Link to={`/chat/${seller.id}`}>
              <Button variant="outline" size="lg" fullWidth className="gap-2">
                <MessageCircleIcon size={18} /> Chatear con{' '}
                {seller.name.split(' ')[0]}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 &&
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-24">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-ink/50 mb-6">
            Te puede gustar
          </h2>
          <div className="columns-2 md:columns-4 gap-4">
            {related.map((p, i) =>
          <ProductCard key={p.id} product={p} index={i} />
          )}
          </div>
        </div>
      }

      {/* Offer Modal */}
      <AnimatePresence>
        {showOfferModal &&
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowOfferModal(false)} />
          
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20
            }}
            className="relative w-full max-w-md bg-warmWhite dark:bg-darkBg rounded-[2.5rem] p-8 shadow-2xl">
            
              <h3 className="font-display font-bold text-2xl mb-2">
                Hacer oferta
              </h3>
              <p className="text-sm text-ink/60 dark:text-warmWhite/60 mb-8">
                Precio original: ${product.price.toLocaleString('es-AR')}
              </p>

              <div className="relative mb-8">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-display font-bold text-ink/30">
                  $
                </span>
                <input
                type="number"
                defaultValue={product.price * 0.8}
                className="w-full bg-softGray dark:bg-darkBg-alt rounded-2xl py-4 pl-12 pr-4 text-2xl font-display font-bold focus:outline-none focus:ring-2 focus:ring-accent" />
              
              </div>

              <div className="flex gap-3">
                <Button
                variant="ghost"
                fullWidth
                onClick={() => setShowOfferModal(false)}>
                
                  Cancelar
                </Button>
                <Button
                variant="primary"
                fullWidth
                onClick={() => setShowOfferModal(false)}>
                
                  Enviar oferta
                </Button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

};