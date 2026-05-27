import React from 'react';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';
import { BackgroundBlobs } from './BackgroundBlobs';
import { useLocation, Link } from 'react-router-dom';
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  MessageCircleIcon,
  UserIcon,
  HeartIcon } from
'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
export const AppShell = ({ children }: {children: React.ReactNode;}) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isAuth = location.pathname === '/auth';
  const isOnboarding = location.pathname === '/onboarding';
  const showSidebar = !isLanding && !isAuth && !isOnboarding;
  const sidebarLinks = [
  {
    id: 'feed',
    path: '/feed',
    icon: HomeIcon,
    label: 'Inicio'
  },
  {
    id: 'search',
    path: '/feed',
    icon: SearchIcon,
    label: 'Explorar'
  },
  {
    id: 'upload',
    path: '/upload',
    icon: PlusIcon,
    label: 'Publicar'
  },
  {
    id: 'chat',
    path: '/chat',
    icon: MessageCircleIcon,
    label: 'Mensajes'
  },
  {
    id: 'favorites',
    path: '/favorites',
    icon: HeartIcon,
    label: 'Guardados'
  },
  {
    id: 'profile',
    path: '/profile/me',
    icon: UserIcon,
    label: 'Perfil'
  }];

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      <BackgroundBlobs />
      <TopNav />

      {/* Desktop Sidebar */}
      {showSidebar &&
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-ink/5 dark:border-white/5 glass z-40">
          <div className="p-8">
            <Link
            to="/"
            className="font-display font-extrabold text-3xl tracking-[0.18em] text-ink dark:text-warmWhite">
            
              MUTÁ
            </Link>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            {sidebarLinks.map((link) => {
            const isActive =
            location.pathname.startsWith(link.path) &&
            link.path !== '/feed' ||
            link.path === '/feed' && location.pathname === '/feed';
            return (
              <Link
                key={link.id}
                to={link.path}
                className={cn(
                  'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative group',
                  isActive ?
                  'text-ink dark:text-warmWhite font-semibold' :
                  'text-ink/60 dark:text-warmWhite/60 hover:bg-black/5 dark:hover:bg-white/5'
                )}>
                
                  {isActive &&
                <>
                      <motion.div
                    layoutId="sidebarIndicator"
                    className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-2xl -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30
                    }} />
                  
                      <motion.div
                    layoutId="sidebarLeftBar"
                    className="absolute left-0 top-2 bottom-2 w-1 bg-accent rounded-r-full"
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30
                    }} />
                  
                    </>
                }
                  <link.icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    'transition-transform group-hover:scale-105',
                    isActive && 'text-accent'
                  )} />
                
                  <span className="text-[15px]">{link.label}</span>
                </Link>);

          })}
          </nav>
        </aside>
      }

      <main
        className={cn(
          'flex-1 w-full relative',
          showSidebar ? 'pb-20 md:pb-0' : ''
        )}>
        
        {children}
      </main>

      <BottomNav />
    </div>);

};