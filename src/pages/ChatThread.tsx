import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  SendIcon,
  ImageIcon,
  MoreVerticalIcon } from
'lucide-react';
import { chats, messages as mockMessages } from '../data/mockData';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
export const ChatThread = () => {
  const { id } = useParams();
  const chat = chats.find((c) => c.id === id) || chats[0];
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
    ...messages,
    {
      id: Date.now().toString(),
      chatId: chat.id,
      senderId: 'me',
      receiverId: chat.withUser.id,
      text: input,
      timestamp: 'Ahora',
      isRead: false
    }]
    );
    setInput('');
  };
  return (
    <div className="h-screen flex flex-col bg-warmWhite dark:bg-darkBg max-w-3xl mx-auto relative">
      {/* Header */}
      <div className="glass px-4 py-3 flex items-center justify-between z-10 border-b border-ink/5 dark:border-white/5">
        <div className="flex items-center gap-3">
          <Link
            to="/chat"
            className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors">
            
            <ChevronLeftIcon size={20} />
          </Link>
          <Link
            to={`/profile/${chat.withUser.username}`}
            className="flex items-center gap-3">
            
            <Avatar
              src={chat.withUser.avatar}
              alt={chat.withUser.name}
              size="sm" />
            
            <div>
              <h2 className="font-display font-semibold text-sm leading-tight">
                {chat.withUser.name}
              </h2>
              <span className="text-[10px] text-ink/50">Activa hace 2h</span>
            </div>
          </Link>
        </div>
        <button className="p-2 rounded-full hover:bg-black/5 transition-colors">
          <MoreVerticalIcon size={18} />
        </button>
      </div>

      {/* Product Context Strip */}
      <Link
        to={`/product/${chat.product.id}`}
        className="bg-softGray dark:bg-darkBg-alt px-4 py-2.5 flex items-center gap-3 hover:bg-black/5 transition-colors border-b border-ink/5 dark:border-white/5">
        
        <img
          src={chat.product.images[0]}
          className="w-10 h-10 rounded-lg object-cover" />
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{chat.product.title}</p>
          <p className="text-xs text-ink/60">
            ${chat.product.price.toLocaleString('es-AR')}
          </p>
        </div>
      </Link>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1 pb-24">
        <div className="text-center my-6">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-ink/30">
            Ayer
          </span>
        </div>

        {messages.map((msg, i) => {
          const isMe = msg.senderId === 'me';
          const isOffer = msg.type === 'offer';
          const prevMsg = messages[i - 1];
          const isGrouped = prevMsg && prevMsg.senderId === msg.senderId;
          return (
            <motion.div
              key={msg.id}
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.98
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25
              }}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${!isGrouped ? 'mt-4' : ''}`}>
              
              {isOffer ?
              <div className="w-full max-w-[280px] bg-white dark:bg-darkBg-alt rounded-[1.5rem] p-5 shadow-sm border border-ink/5 dark:border-white/5 mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-2">
                    Oferta recibida
                  </p>
                  <p className="font-display font-bold text-3xl mb-4">
                    ${msg.offerPrice?.toLocaleString('es-AR')}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" fullWidth>
                      Aceptar oferta
                    </Button>
                    <Button variant="ghost" size="sm" fullWidth>
                      Contraofertar
                    </Button>
                  </div>
                </div> :

              <div
                className={`max-w-[75%] px-4 py-2.5 text-[15px] ${isMe ? 'bg-ink text-white dark:bg-warmWhite dark:text-ink' : 'bg-white dark:bg-darkBg-alt border border-ink/5 dark:border-white/5 shadow-sm'} ${isMe ? `rounded-[1.25rem] rounded-tr-sm ${isGrouped ? 'rounded-br-sm' : ''}` : `rounded-[1.25rem] rounded-tl-sm ${isGrouped ? 'rounded-bl-sm' : ''}`}`}>
                
                  <p className="leading-snug">{msg.text}</p>
                </div>
              }
            </motion.div>);

        })}
      </div>

      {/* Composer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-warmWhite via-warmWhite to-transparent dark:from-darkBg dark:via-darkBg pb-safe">
        <form
          onSubmit={handleSend}
          className="flex items-end gap-2 bg-white dark:bg-darkBg-alt rounded-full p-1.5 shadow-sm border border-ink/5 dark:border-white/5">
          
          <button
            type="button"
            className="p-2.5 text-ink/30 hover:text-ink transition-colors shrink-0">
            
            <ImageIcon size={18} />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mensaje..."
            className="flex-1 bg-transparent py-2.5 px-2 max-h-32 resize-none focus:outline-none text-sm"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }} />
          
          <motion.button
            whileTap={{
              scale: 0.9
            }}
            type="submit"
            disabled={!input.trim()}
            className="w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed mr-0.5 mb-0.5">
            
            <SendIcon size={14} className="ml-0.5" />
          </motion.button>
        </form>
      </div>
    </div>);

};