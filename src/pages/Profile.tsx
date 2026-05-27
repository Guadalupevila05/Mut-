import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { users, products } from '../data/mockData';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import {
  MapPinIcon,
  LinkIcon,
  GridIcon,
  SparklesIcon,
  BookmarkIcon } from
'lucide-react';
export const Profile = () => {
  const { username } = useParams();
  const user = users.find((u) => u.username === username) || users[0];
  const userProducts = products.filter((p) => p.sellerId === user.id);
  const [activeTab, setActiveTab] = useState('prendas');
  return (
    <div className="min-h-screen pb-24">
      {/* Banner */}
      <div className="h-48 md:h-72 w-full relative overflow-hidden bg-softGray">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
          alt="Banner"
          className="w-full h-full object-cover opacity-80" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-warmWhite dark:from-darkBg via-transparent to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 -mt-16 md:-mt-24 mb-8">
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="xl"
            className="w-32 h-32 md:w-40 md:h-40 border-4 border-warmWhite dark:border-darkBg shadow-sm" />
          

          <div className="flex-1 pb-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold tracking-tight">
                  {user.name}
                </h1>
                <p className="text-ink/50 dark:text-warmWhite/50 text-sm font-medium">
                  @{user.username}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" className="flex-1 md:flex-none">
                  Seguir
                </Button>
                <Button variant="outline" className="flex-1 md:flex-none">
                  Mensaje
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Stats */}
        <div className="mb-10 max-w-2xl">
          <p className="text-sm md:text-base leading-relaxed mb-4">
            {user.bio}
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-ink/50 dark:text-warmWhite/50 mb-6">
            <span className="flex items-center gap-1">
              <MapPinIcon size={14} /> {user.neighborhood}, Tandil
            </span>
            <span className="flex items-center gap-1">
              <LinkIcon size={14} /> linktr.ee/{user.username}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span>
              <strong className="font-display font-semibold">
                {user.items}
              </strong>{' '}
              <span className="text-ink/60">Prendas</span>
            </span>
            <span className="text-ink/20">|</span>
            <span>
              <strong className="font-display font-semibold">
                {user.followers}
              </strong>{' '}
              <span className="text-ink/60">Seguidores</span>
            </span>
            <span className="text-ink/20">|</span>
            <span>
              <strong className="font-display font-semibold">
                {user.following}
              </strong>{' '}
              <span className="text-ink/60">Siguiendo</span>
            </span>
          </div>
        </div>

        {/* Highlights (Stories style) */}
        <div className="flex gap-5 overflow-x-auto hide-scrollbar mb-12 pb-2">
          {[1, 2, 3, 4].map((i) =>
          <div
            key={i}
            className="flex flex-col items-center gap-2 cursor-pointer group">
            
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blush to-rose group-hover:from-accent group-hover:to-accent transition-all">
                <div className="w-full h-full rounded-full border-2 border-warmWhite dark:border-darkBg overflow-hidden">
                  <img
                  src={products[i].images[0]}
                  className="w-full h-full object-cover" />
                
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-ink/70">
                Look {i}
              </span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-ink/5 dark:border-white/5 mb-8">
          {[
          {
            id: 'prendas',
            label: 'Prendas',
            icon: GridIcon
          },
          {
            id: 'looks',
            label: 'Looks',
            icon: SparklesIcon
          },
          {
            id: 'guardados',
            label: 'Guardados',
            icon: BookmarkIcon
          }].
          map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-medium flex items-center gap-2 relative transition-colors ${activeTab === tab.id ? 'text-ink dark:text-warmWhite' : 'text-ink/40 hover:text-ink/70'}`}>
            
              <tab.icon size={16} />
              {tab.label}
              {activeTab === tab.id &&
            <motion.div
              layoutId="profileTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink dark:bg-warmWhite" />

            }
            </button>
          )}
        </div>

        {/* Content */}
        {activeTab === 'prendas' &&
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {userProducts.map((product, i) =>
          <ProductCard key={product.id} product={product} index={i} />
          )}
          </div>
        }

        {activeTab === 'looks' &&
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) =>
          <div
            key={i}
            className="rounded-[2rem] bg-softGray dark:bg-darkBg-alt p-4 flex gap-2 h-64 group cursor-pointer">
            
                <div className="flex-1 rounded-2xl overflow-hidden">
                  <img
                src={products[i].images[0]}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex-1 rounded-2xl overflow-hidden">
                    <img
                  src={products[i + 2].images[0]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                  </div>
                  <div className="flex-1 rounded-2xl overflow-hidden">
                    <img
                  src={products[i + 4].images[0]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                  </div>
                </div>
              </div>
          )}
          </div>
        }
      </div>
    </div>);

};