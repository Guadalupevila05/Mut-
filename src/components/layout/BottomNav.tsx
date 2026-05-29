import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  MessageCircleIcon,
  UserIcon } from
'lucide-react';
import { cn } from '../../utils/cn';
export const BottomNav = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isAuth = location.pathname === '/auth';
  const isOnboarding = location.pathname === '/onboarding';
  if (isLanding || isAuth || isOnboarding) return null;
  const tabs = [
  {
    id: 'feed',
    path: '/feed',
    icon: HomeIcon,
    label: 'Feed'
  },
  {
    id: 'search',
    path: '/feed',
    icon: SearchIcon,
    label: 'Buscar'
  },
  {
    id: 'upload',
    path: '/upload',
    icon: PlusIcon,
    label: 'Publicar',
    isFloating: true
  },
  {
    id: 'chat',
    path: '/chat',
    icon: MessageCircleIcon,
    label: 'Mensajes'
  },
  {
    id: 'profile',
    path: '/profile/me',
    icon: UserIcon,
    label: 'Perfil'
  }];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
      <div className="glass rounded-t-3xl px-6 py-3 flex items-center justify-between relative border-t border-white/40">
        {tabs.map((tab) => {
          const isActive =
          location.pathname.startsWith(tab.path) && tab.path !== '/feed' ||
          tab.path === '/feed' && location.pathname === '/feed';
          if (tab.isFloating) {
            return (
              <Link key={tab.id} to={tab.path} className="relative -top-5">
                <motion.div
                  whileTap={{
                    scale: 0.9
                  }}
                  className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-md shadow-accent/20 border-t border-white/20">
                  
                  <PlusIcon size={24} />
                </motion.div>
              </Link>);

          }
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className="relative flex flex-col items-center gap-1 p-2">
              
              <tab.icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className={cn(
                  'transition-colors z-10',
                  isActive ?
                  'text-accent' :
                  'text-ink/50 dark:text-warmWhite/50'
                )} />
              
              {isActive &&
              <motion.div
                layoutId="bottomNavIndicator"
                className="absolute inset-0 bg-accent/10 dark:bg-accent/20 rounded-xl -z-0"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }} />

              }
            </Link>);

        })}
      </div>
    </div>);

};