import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useChats, supabase, Chat } from '../lib/supabase';
import { Avatar } from '../components/ui/Avatar';

const formatTime = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const sameDay =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (sameDay) {
    return d.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Ayer';
  }
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
};

export const ChatList = () => {
  const { chats, loading } = useChats();
  const [currentUserId, setCurrentUserId] = useState<string>('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setCurrentUserId(data.user.id);
    });
  }, []);

  const otherUser = (chat: Chat) =>
    chat.buyer_id === currentUserId ? chat.seller : chat.buyer;

  return (
    <div className="min-h-screen pt-8 px-4 md:px-8 max-w-3xl mx-auto pb-24">
      <h1 className="text-3xl font-display font-bold mb-8 tracking-tight">
        Mensajes
      </h1>

      {loading ? (
        <p className="text-sm text-ink/50 dark:text-warmWhite/50">
          Cargando mensajes...
        </p>
      ) : chats.length === 0 ? (
        <p className="text-sm text-ink/50 dark:text-warmWhite/50">
          Todavía no tenés conversaciones.
        </p>
      ) : (
        <div className="space-y-1">
          {chats.map((chat, i) => {
            const other = otherUser(chat);
            const product = chat.products;
            return (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/chat/${chat.id}`}
                  className="flex items-center gap-4 p-4 rounded-[1.5rem] hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                >
                  <div className="relative">
                    <Avatar
                      src={other?.avatar_url ?? ''}
                      alt={other?.name ?? other?.username ?? ''}
                      size="lg"
                      className="w-14 h-14"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-display font-semibold text-base truncate pr-4">
                        {other?.name ?? other?.username ?? 'Usuario'}
                      </h3>
                      <span className="text-[11px] uppercase tracking-wider font-medium text-ink/40 whitespace-nowrap">
                        {formatTime(chat.last_message_at)}
                      </span>
                    </div>
                    <p className="text-sm truncate text-ink/60 dark:text-warmWhite/60">
                      {chat.last_message ?? 'Sin mensajes aún'}
                    </p>
                  </div>

                  {product?.images?.[0] && (
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
