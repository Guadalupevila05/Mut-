// src/lib/supabase.ts
// Cliente y hooks de Supabase para reemplazar mockData
// Instalar: npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState, useCallback } from 'react';

// ─── Cliente ────────────────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Tipos ──────────────────────────────────────────────────
export type Profile = {
  id: string;
  username: string;
  name: string;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  neighborhood: string | null;
  followers: number;
  following: number;
  rating: number;
  created_at: string;
};

export type Product = {
  id: string;
  seller_id: string;
  title: string;
  description: string | null;
  type: string;
  style: string | null;
  size: string | null;
  condition: string;
  price: number;
  original_price: number | null;
  accepts_swap: boolean;
  images: string[];
  likes: number;
  is_sold: boolean;
  created_at: string;
  // join
  profiles?: Profile;
};

export type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  text: string | null;
  type: 'text' | 'offer';
  offer_price: number | null;
  is_read: boolean;
  created_at: string;
};

export type Chat = {
  id: string;
  product_id: string | null;
  buyer_id: string;
  seller_id: string;
  last_message: string | null;
  last_message_at: string;
  created_at: string;
  // joins
  products?: Product;
  buyer?: Profile;
  seller?: Profile;
};

export type FilterState = {
  conditions: string[];
  types: string[];
  styles: string[];
  priceMin: number;
  priceMax: number;
  sizes: string[];
};

// ─── AUTH ────────────────────────────────────────────────────
export function useAuth() {
  const [user, setUser] = useState(supabase.auth.getUser().then(r => r.data.user));
  const [session, setSession] = useState(supabase.auth.getSession().then(r => r.data.session));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session as any);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s as any);
      setUser(s?.user as any);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signIn = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password });

  const signUp = (email: string, password: string, username: string, fullName: string) =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: { username, full_name: fullName } },
    });

  const signOut = () => supabase.auth.signOut();

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({ provider: 'google' });

  return { user, session, loading, signIn, signUp, signOut, signInWithGoogle };
}

// ─── PRODUCTS ────────────────────────────────────────────────
export function useProducts(filters?: Partial<FilterState>, sort?: string, search?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('*, profiles(*)')
      .eq('is_sold', false);

    // Filtros
    if (filters?.types?.length)      query = query.in('type', filters.types);
    if (filters?.conditions?.length) query = query.in('condition', filters.conditions);
    if (filters?.styles?.length)     query = query.in('style', filters.styles);
    if (filters?.sizes?.length)      query = query.in('size', filters.sizes);
    if (filters?.priceMin)           query = query.gte('price', filters.priceMin);
    if (filters?.priceMax)           query = query.lte('price', filters.priceMax);

    // Búsqueda
    if (search?.trim()) {
      query = query.or(`title.ilike.%${search}%,style.ilike.%${search}%,type.ilike.%${search}%`);
    }

    // Ordenamiento
    switch (sort) {
      case 'reciente':    query = query.order('created_at', { ascending: false }); break;
      case 'popular':     query = query.order('likes', { ascending: false }); break;
      case 'precio_asc':  query = query.order('price', { ascending: true }); break;
      case 'precio_desc': query = query.order('price', { ascending: false }); break;
      default:            query = query.order('created_at', { ascending: false });
    }

    const { data, error: err } = await query;
    if (err) setError(err.message);
    else setProducts(data ?? []);
    setLoading(false);
  }, [JSON.stringify(filters), sort, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('products')
      .select('*, profiles(*)')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  return { product, loading };
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'likes' | 'is_sold'>) {
  return supabase.from('products').insert(product).select().single();
}

export async function uploadProductImage(file: File, userId: string): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const path = `${userId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('product-images').upload(path, file);
  if (error) return null;
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
}

// Sube avatar/banner al mismo bucket `product-images` bajo el folder del usuario.
// `kind` se usa solo como prefijo descriptivo del archivo.
export async function uploadProfileImage(
  file: File,
  userId: string,
  kind: 'avatar' | 'banner',
): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const path = `${userId}/${kind}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from('product-images')
    .upload(path, file);
  if (error) return null;
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
}

// ─── LIKES ───────────────────────────────────────────────────
export function useLike(productId: string) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { setLoading(false); return; }
      supabase
        .from('likes')
        .select('id')
        .eq('product_id', productId)
        .eq('user_id', data.user.id)
        .maybeSingle()
        .then(({ data: like }) => {
          setLiked(!!like);
          setLoading(false);
        });
    });
  }, [productId]);

  const toggle = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    if (liked) {
      await supabase.from('likes').delete().eq('product_id', productId).eq('user_id', user.id);
    } else {
      await supabase.from('likes').insert({ product_id: productId, user_id: user.id });
    }
    setLiked(!liked);
  };

  return { liked, loading, toggle };
}

// ─── FAVORITES ───────────────────────────────────────────────
export function useFavorites() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setProducts([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('likes')
      .select('created_at, products(*, profiles(*))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    const prods = (data ?? [])
      .map((row: any) => row.products)
      .filter(Boolean) as Product[];
    setProducts(prods);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { products, loading, refetch: fetchFavorites };
}

// ─── PROFILE ─────────────────────────────────────────────────
export function useProfile(username: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!username) return;
    setLoading(true);
    const { data: prof } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();
    if (!prof) {
      setProfile(null);
      setProducts([]);
      setLoading(false);
      return;
    }
    setProfile(prof);
    const { data: prods } = await supabase
      .from('products')
      .select('*')
      .eq('seller_id', prof.id)
      .order('created_at', { ascending: false });
    setProducts(prods ?? []);
    setLoading(false);
  }, [username]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updates: Partial<Profile>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const res = await supabase.from('profiles').update(updates).eq('id', user.id);
    // Optimistic local update así la UI refleja el cambio sin esperar refetch
    setProfile((p) => (p ? { ...p, ...updates } : p));
    return res;
  };

  return { profile, products, loading, updateProfile, refetch: fetchProfile };
}

// ─── CHATS ───────────────────────────────────────────────────
export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setLoading(false); return; }

      supabase
        .from('chats')
        .select(`
          *,
          products(id, title, images, price),
          buyer:profiles!chats_buyer_id_fkey(*),
          seller:profiles!chats_seller_id_fkey(*)
        `)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false })
        .then(({ data }) => {
          setChats(data ?? []);
          setLoading(false);
        });

      // Suscripción realtime
      const channel = supabase
        .channel('chats_updates')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'chats',
          filter: `buyer_id=eq.${user.id}`,
        }, () => { /* refetch */ })
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    });
  }, []);

  return { chats, loading };
}

export function useMessages(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Append dedupeado por id — el mismo mensaje puede llegar por el insert
  // optimista local y por el evento realtime; nos quedamos con uno solo.
  const appendDedup = (msg: Message) => {
    setMessages((prev) =>
      prev.some((m) => m.id === msg.id) ? prev : [...prev, msg],
    );
  };

  useEffect(() => {
    if (!chatId) return;

    // Carga inicial
    supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setMessages(data ?? []);
        setLoading(false);
      });

    // Realtime: nuevos mensajes
    const channel = supabase
      .channel(`messages_${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          appendDedup(payload.new as Message);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

  const sendMessage = async (
    text: string,
    type: 'text' | 'offer' = 'text',
    offerPrice?: number,
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from('messages')
      .insert({
        chat_id: chatId,
        sender_id: user.id,
        text,
        type,
        offer_price: offerPrice ?? null,
      })
      .select()
      .single();
    // Optimistic: agregamos el mensaje al instante (no esperamos al realtime,
    // que puede tardar o no estar habilitado en el publication).
    if (!error && data) appendDedup(data as Message);
    return { data, error };
  };

  return { messages, loading, sendMessage };
}

export async function startChat(productId: string, sellerId: string): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Buscar chat existente
  const { data: existing } = await supabase
    .from('chats')
    .select('id')
    .eq('product_id', productId)
    .eq('buyer_id', user.id)
    .eq('seller_id', sellerId)
    .maybeSingle();

  if (existing) return existing.id;

  // Crear nuevo chat
  const { data: newChat } = await supabase
    .from('chats')
    .insert({ product_id: productId, buyer_id: user.id, seller_id: sellerId })
    .select('id')
    .single();

  return newChat?.id ?? null;
}
