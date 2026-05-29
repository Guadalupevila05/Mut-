import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  SendIcon,
  ImageIcon,
  MoreVerticalIcon,
} from 'lucide-react';
import { useMessages, supabase, Chat } from '../lib/supabase';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';

export const ChatThread = () => {
  const { id: chatId } = useParams();
  const { messages, loading, sendMessage } = useMessages(chatId ?? '');
  const [input, setInput] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [chat, setChat] = useState<Chat | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setCurrentUserId(data.user.id);
    });
  }, []);

  useEffect(() => {
    if (!chatId) return;
    supabase
      .from('chats')
      .select(`
        *,
        products(id, title, images, price),
        buyer:profiles!chats_buyer_id_fkey(*),
        seller:profiles!chats_seller_id_fkey(*)
      `)
      .eq('id', chatId)
      .single()
      .then(({ data }) => {
        if (data) setChat(data as Chat);
      });
  }, [chatId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input.trim());
    setInput('');
  };

  const other =
    chat?.buyer_id === currentUserId ? chat?.seller : chat?.buyer;
  const product = chat?.products;

  return (
    <div className="h-screen flex flex-col bg-warmWhite dark:bg-darkBg max-w-3xl mx-auto relative">
      {/* Header */}
      <div className="glass px-4 py-3 flex items-center justify-between z-10 border-b border-ink/5 dark:border-white/5">
        <div className="flex items-center gap-3">
          <Link
            to="/chat"
            className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <ChevronLeftIcon size={20} />
          </Link>
          {other && (
            <Link
              to={`/profile/${other.username}`}
              className="flex items-center gap-3"
            >
              <Avatar
                src={other.avatar_url ?? ''}
                alt={other.name ?? other.username}
                size="sm"
              />
              <div>
                <h2 className="font-display font-semibold text-sm leading-tight">
                  {other.name ?? other.username}
                </h2>
                <span className="text-[10px] text-ink/50">
                  @{other.username}
                </span>
              </div>
            </Link>
          )}
        </div>
        <button className="p-2 rounded-full hover:bg-black/5 transition-colors">
          <MoreVerticalIcon size={18} />
        </button>
      </div>

      {/* Product Context Strip */}
      {product && (
        <Link
          to={`/product/${product.id}`}
          className="bg-softGray dark:bg-darkBg-alt px-4 py-2.5 flex items-center gap-3 hover:bg-black/5 transition-colors border-b border-ink/5 dark:border-white/5"
        >
          {product.images?.[0] && (
            <img
              src={product.images[0]}
              className="w-10 h-10 rounded-lg object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{product.title}</p>
            <p className="text-xs text-ink/60">
              ${product.price.toLocaleString('es-AR')}
            </p>
          </div>
        </Link>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1 pb-24">
        {loading ? (
          <p className="text-center text-xs text-ink/40 mt-8">
            Cargando mensajes...
          </p>
        ) : messages.length === 0 ? (
          <p className="text-center text-xs text-ink/40 mt-8">
            Empezá la conversación
          </p>
        ) : (
          messages.map((msg, i) => {
            const isMe = msg.sender_id === currentUserId;
            const isOffer = msg.type === 'offer';
            const prevMsg = messages[i - 1];
            const isGrouped = prevMsg && prevMsg.sender_id === msg.sender_id;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${!isGrouped ? 'mt-4' : ''}`}
              >
                {isOffer ? (
                  <div className="w-full max-w-[280px] bg-white dark:bg-darkBg-alt rounded-[1.5rem] p-5 shadow-sm border border-ink/5 dark:border-white/5 mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-2">
                      Oferta recibida
                    </p>
                    <p className="font-display font-bold text-3xl mb-4">
                      ${msg.offer_price?.toLocaleString('es-AR')}
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" fullWidth>
                        Aceptar oferta
                      </Button>
                      <Button variant="ghost" size="sm" fullWidth>
                        Contraofertar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`max-w-[75%] px-4 py-2.5 text-[15px] ${isMe ? 'bg-ink text-white dark:bg-warmWhite dark:text-ink' : 'bg-white dark:bg-darkBg-alt border border-ink/5 dark:border-white/5 shadow-sm'} ${isMe ? `rounded-[1.25rem] rounded-tr-sm ${isGrouped ? 'rounded-br-sm' : ''}` : `rounded-[1.25rem] rounded-tl-sm ${isGrouped ? 'rounded-bl-sm' : ''}`}`}
                  >
                    <p className="leading-snug">{msg.text}</p>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Composer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-warmWhite via-warmWhite to-transparent dark:from-darkBg dark:via-darkBg pb-safe">
        <form
          onSubmit={handleSend}
          className="flex items-end gap-2 bg-white dark:bg-darkBg-alt rounded-full p-1.5 shadow-sm border border-ink/5 dark:border-white/5"
        >
          <button
            type="button"
            className="p-2.5 text-ink/30 hover:text-ink transition-colors shrink-0"
          >
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
            }}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={!input.trim()}
            className="w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed mr-0.5 mb-0.5"
          >
            <SendIcon size={14} className="ml-0.5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};
