import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chats } from '../data/mockData';
import { Avatar } from '../components/ui/Avatar';
export const ChatList = () => {
  return (
    <div className="min-h-screen pt-8 px-4 md:px-8 max-w-3xl mx-auto pb-24">
      <h1 className="text-3xl font-display font-bold mb-8 tracking-tight">
        Mensajes
      </h1>

      <div className="space-y-1">
        {chats.map((chat, i) =>
        <motion.div
          key={chat.id}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: i * 0.05
          }}>
          
            <Link
            to={`/chat/${chat.id}`}
            className="flex items-center gap-4 p-4 rounded-[1.5rem] hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
            
              <div className="relative">
                <Avatar
                src={chat.withUser.avatar}
                alt={chat.withUser.name}
                size="lg"
                className="w-14 h-14" />
              
                {chat.unread > 0 &&
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-accent rounded-full border-2 border-warmWhite dark:border-darkBg" />
              }
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-display font-semibold text-base truncate pr-4">
                    {chat.withUser.name}
                  </h3>
                  <span className="text-[11px] uppercase tracking-wider font-medium text-ink/40 whitespace-nowrap">
                    {chat.timestamp}
                  </span>
                </div>
                <p
                className={`text-sm truncate ${chat.unread > 0 ? 'font-medium text-ink dark:text-warmWhite' : 'text-ink/60 dark:text-warmWhite/60'}`}>
                
                  {chat.lastMessage}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                <img
                src={chat.product.images[0]}
                alt=""
                className="w-full h-full object-cover" />
              
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>);

};