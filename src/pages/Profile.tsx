import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  useProfile,
  supabase,
  uploadProfileImage,
} from '../lib/supabase';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import {
  MapPinIcon,
  GridIcon,
  SparklesIcon,
  BookmarkIcon,
  CameraIcon,
  LogOutIcon,
} from 'lucide-react';

const DEFAULT_BANNER =
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80';

export const Profile = () => {
  const { username: rawUsername } = useParams();
  const navigate = useNavigate();
  const [resolved, setResolved] = useState<string | null>(
    rawUsername && rawUsername !== 'me' ? rawUsername : null,
  );
  const [currentUserId, setCurrentUserId] = useState<string>('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setCurrentUserId(data.user.id);
    });
  }, []);

  // /profile/me → resolvemos el username del usuario autenticado
  useEffect(() => {
    if (rawUsername && rawUsername !== 'me') {
      setResolved(rawUsername);
      return;
    }
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: prof } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', data.user.id)
        .single();
      if (prof?.username) setResolved(prof.username);
    });
  }, [rawUsername]);

  const { profile, products, loading, updateProfile } = useProfile(
    resolved ?? '',
  );
  const [activeTab, setActiveTab] = useState('prendas');

  const isOwn = !!profile && profile.id === currentUserId;
  const [uploadingKind, setUploadingKind] =
    useState<'avatar' | 'banner' | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    kind: 'avatar' | 'banner',
  ) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !profile) return;

    setUploadingKind(kind);
    const url = await uploadProfileImage(file, profile.id, kind);
    if (url) {
      await updateProfile(
        kind === 'avatar' ? { avatar_url: url } : { banner_url: url },
      );
    }
    setUploadingKind(null);
  };

  if (loading || !resolved) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-ink/50 dark:text-warmWhite/50">
        Cargando perfil...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-ink/50 dark:text-warmWhite/50">
        Usuario no encontrado.
      </div>
    );
  }

  const bannerSrc = profile.banner_url || DEFAULT_BANNER;

  return (
    <div className="min-h-screen pb-24">
      {/* Banner */}
      <div className="h-48 md:h-72 w-full relative overflow-hidden bg-softGray group">
        <img
          src={bannerSrc}
          alt="Banner"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warmWhite dark:from-darkBg via-transparent to-transparent" />

        {isOwn && (
          <>
            <button
              onClick={() => bannerInputRef.current?.click()}
              disabled={uploadingKind === 'banner'}
              className="absolute top-4 right-4 z-10 px-3 py-2 rounded-full glass shadow-sm text-xs font-semibold flex items-center gap-2 hover:bg-white/80 transition-colors disabled:opacity-60"
            >
              <CameraIcon size={14} />
              {uploadingKind === 'banner' ? 'Subiendo...' : 'Cambiar portada'}
            </button>
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'banner')}
            />
          </>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 -mt-16 md:-mt-24 mb-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Avatar
              src={profile.avatar_url ?? ''}
              alt={profile.name ?? profile.username}
              size="xl"
              className="w-32 h-32 md:w-40 md:h-40 border-4 border-warmWhite dark:border-darkBg shadow-sm"
            />
            {isOwn && (
              <>
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={uploadingKind === 'avatar'}
                  className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-ink dark:bg-warmWhite text-warmWhite dark:text-ink flex items-center justify-center shadow-md hover:scale-105 transition-transform disabled:opacity-60"
                  aria-label="Cambiar foto de perfil"
                >
                  <CameraIcon size={16} />
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 'avatar')}
                />
              </>
            )}
          </div>

          <div className="flex-1 pb-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold tracking-tight">
                  {profile.name ?? profile.username}
                </h1>
                <p className="text-ink/50 dark:text-warmWhite/50 text-sm font-medium">
                  @{profile.username}
                </p>
              </div>

              {!isOwn ? (
                <div className="flex gap-3">
                  <Button variant="primary" className="flex-1 md:flex-none">
                    Seguir
                  </Button>
                  <Button variant="outline" className="flex-1 md:flex-none">
                    Mensaje
                  </Button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 md:flex-none gap-2"
                    onClick={() => {
                      // Navegamos a "/" PRIMERO para desmontar Profile (y su
                      // ProtectedRoute) antes de que el cambio de sesión
                      // dispare cualquier redirect a /auth.
                      navigate('/', { replace: true });
                      supabase.auth.signOut();
                    }}
                  >
                    <LogOutIcon size={16} />
                    Cerrar sesión
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bio & Stats */}
        <div className="mb-10 max-w-2xl">
          {profile.bio && (
            <p className="text-sm md:text-base leading-relaxed mb-4">
              {profile.bio}
            </p>
          )}
          {profile.neighborhood && (
            <div className="flex items-center gap-4 text-xs font-medium text-ink/50 dark:text-warmWhite/50 mb-6">
              <span className="flex items-center gap-1">
                <MapPinIcon size={14} /> {profile.neighborhood}, Tandil
              </span>
            </div>
          )}

          <div className="flex items-center gap-4 text-sm">
            <span>
              <strong className="font-display font-semibold">
                {products.length}
              </strong>{' '}
              <span>Prendas</span>
            </span>
            <span className="text-ink/20">|</span>
            <span>
              <strong className="font-display font-semibold">
                {profile.followers}
              </strong>{' '}
              <span>Seguidores</span>
            </span>
            <span className="text-ink/20">|</span>
            <span>
              <strong className="font-display font-semibold">
                {profile.following}
              </strong>{' '}
              <span>Siguiendo</span>
            </span>
          </div>
        </div>

        {/* Highlights (Stories style) — usa las propias prendas si hay */}
        {products.length > 0 && (
          <div className="flex gap-5 overflow-x-auto hide-scrollbar mb-12 pb-2">
            {products.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blush to-rose group-hover:from-accent group-hover:to-accent transition-all">
                  <div className="w-full h-full rounded-full border-2 border-warmWhite dark:border-darkBg overflow-hidden">
                    {p.images?.[0] && (
                      <img
                        src={p.images[0]}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-ink/70">
                  Look {i + 1}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-8 border-b border-ink/5 dark:border-white/5 mb-8">
          {[
            { id: 'prendas', label: 'Prendas', icon: GridIcon },
            { id: 'looks', label: 'Looks', icon: SparklesIcon },
            { id: 'guardados', label: 'Guardados', icon: BookmarkIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium flex items-center gap-2 relative transition-colors ${activeTab === tab.id ? 'text-ink dark:text-warmWhite' : 'text-ink/40 hover:text-ink/70'}`}
            >
              <tab.icon size={16} />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="profileTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink dark:bg-warmWhite"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'prendas' && (
          <>
            {products.length === 0 ? (
              <p className="text-sm text-ink/50 dark:text-warmWhite/50">
                Todavía no publicó prendas.
              </p>
            ) : (
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'looks' && (
          <p className="text-sm text-ink/50 dark:text-warmWhite/50">
            Próximamente.
          </p>
        )}

        {activeTab === 'guardados' && (
          <p className="text-sm text-ink/50 dark:text-warmWhite/50">
            Próximamente.
          </p>
        )}
      </div>
    </div>
  );
};
