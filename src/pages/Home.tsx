import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import {
  products,
  PRODUCT_TYPES,
  productTypeImages,
  users } from
'../data/mockData';
import { Avatar } from '../components/ui/Avatar';
export const Home = () => {
  const heroImages = products.slice(2, 5).map((p) => p.images[0]);
  const trending = products.slice(0, 6);
  // Pick 8 types for the grid
  const featuredTypes = PRODUCT_TYPES.slice(0, 8);
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 min-h-[75vh] flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="flex-1 space-y-8 z-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ink/10 dark:border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-semibold">
                Tandil · Comunidad Abierta
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold leading-[0.95] tracking-tight">
              Vestite
              <br />
              <span className="text-accent italic font-medium pr-4">
                distinto.
              </span>
              <br />
              Mutá.
            </h1>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.3,
              duration: 0.8
            }}
            className="text-base md:text-lg text-ink/70 dark:text-warmWhite/70 max-w-md leading-relaxed">
            
            La comunidad de moda circular de Tandil. Comprá, vendé e intercambiá
            prendas únicas.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.5,
              duration: 0.8
            }}
            className="flex flex-wrap gap-4">
            
            <Link to="/feed">
              <Button size="lg" className="px-8">
                Explorar prendas
              </Button>
            </Link>
            <Link to="/upload">
              <Button variant="outline" size="lg" className="px-8">
                Publicar ropa
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="flex-1 relative h-[500px] w-full hidden md:block">
          {heroImages.map((img, i) =>
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0.9,
              rotate: 0
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: i === 0 ? -3 : i === 1 ? 4 : -2,
              y: [0, -10, 0]
            }}
            transition={{
              opacity: {
                duration: 0.8,
                delay: i * 0.2
              },
              scale: {
                duration: 0.8,
                delay: i * 0.2
              },
              rotate: {
                duration: 0.8,
                delay: i * 0.2
              },
              y: {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5
              }
            }}
            className={`absolute rounded-[2rem] overflow-hidden shadow-soft glass p-2 ${i === 0 ? 'top-4 right-12 w-64 h-80 z-30' : i === 1 ? 'bottom-8 right-48 w-56 h-72 z-20' : 'top-24 left-8 w-52 h-64 z-10'}`}>
            
              <img
              src={img}
              alt="Fashion"
              className="w-full h-full object-cover rounded-[1.5rem]" />
            
            </motion.div>
          )}
        </div>
      </section>

      {/* Comprá por prenda */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 tracking-tight">
          Comprá por prenda
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredTypes.map((type, i) =>
          <motion.div
            key={type}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: i * 0.05
            }}>
            
              <Link
              to={`/feed?type=${type}`}
              className="group relative aspect-square rounded-[2rem] overflow-hidden flex items-center justify-center bg-softGray">
              
                <img
                src={productTypeImages[type]}
                alt={type}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <span className="relative z-10 text-white font-display font-semibold text-lg tracking-wide">
                  {type}
                </span>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            Tendencia en Tandil
          </h2>
          <Link
            to="/feed"
            className="text-sm font-medium text-ink/60 hover:text-ink transition-colors">
            
            Ver todo
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x">
          {trending.map((product, i) =>
          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              x: 30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: i * 0.1
            }}
            className="min-w-[280px] md:min-w-[320px] snap-start">
            
              <Link to={`/product/${product.id}`} className="block group">
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 relative shadow-sm transition-shadow group-hover:shadow-soft">
                  <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                  {i < 2 &&
                <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-ink">
                        Nuevo
                      </span>
                    </div>
                }
                </div>
                <h3 className="font-display font-semibold text-xl">
                  ${product.price.toLocaleString('es-AR')}
                </h3>
                <p className="text-ink/60 dark:text-warmWhite/60 text-sm truncate mt-1">
                  {product.title}
                </p>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Editorial Quote */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 mt-24 mb-32 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}>
          
          <p className="font-display font-extrabold text-3xl md:text-5xl leading-tight tracking-tight mb-8">
            "La moda más sustentable es la que{' '}
            <span className="italic font-medium text-accent">ya existe</span>."
          </p>
          <p className="text-sm uppercase tracking-widest font-semibold text-ink/50">
            Manifiesto MUTÁ
          </p>
        </motion.div>
      </section>

      {/* Community */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-32">
        <div className="glass rounded-[3rem] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute inset-0 bg-gradient-to-br from-blush/30 to-rose/10 dark:from-rose-dark/10 dark:to-accent/5 pointer-events-none" />

          <div className="relative z-10 flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
              Comunidad MUTÁ
            </h2>
            <p className="text-base text-ink/70 dark:text-warmWhite/70 mb-8 max-w-md">
              Conocé a los perfiles más activos de Tandil. Sumate a la moda
              circular y dale una segunda vida a tus prendas.
            </p>
            <Button variant="outline">Ver comunidad</Button>
          </div>

          <div className="relative z-10 flex-1 flex flex-wrap justify-center gap-6">
            {users.slice(0, 4).map((user, i) =>
            <motion.div
              key={user.id}
              whileHover={{
                y: -5
              }}
              className="flex flex-col items-center gap-3">
              
                <Link to={`/profile/${user.username}`}>
                  <Avatar
                  src={user.avatar}
                  alt={user.name}
                  size="xl"
                  className="w-20 h-20 md:w-24 md:h-24 border-2 border-white dark:border-darkBg shadow-sm" />
                
                </Link>
                <div className="text-center">
                  <p className="font-display font-semibold text-sm">
                    {user.username}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-ink/50">
                    {user.items} prendas
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Giant Footer */}
      <footer className="border-t border-ink/5 dark:border-white/5 pt-24 pb-12 overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 md:px-8 mb-16 flex flex-col md:flex-row justify-between gap-8 text-sm">
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Explorar</h4>
            <div className="flex flex-col gap-2 text-ink/60">
              <Link to="/feed" className="hover:text-ink">
                Prendas
              </Link>
              <Link to="/feed" className="hover:text-ink">
                Categorías
              </Link>
              <Link to="/feed" className="hover:text-ink">
                Comunidad
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Soporte</h4>
            <div className="flex flex-col gap-2 text-ink/60">
              <a href="#" className="hover:text-ink">
                Preguntas frecuentes
              </a>
              <a href="#" className="hover:text-ink">
                Términos y condiciones
              </a>
              <a href="#" className="hover:text-ink">
                Privacidad
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Redes</h4>
            <div className="flex flex-col gap-2 text-ink/60">
              <a href="#" className="hover:text-ink">
                Instagram
              </a>
              <a href="#" className="hover:text-ink">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <h2 className="font-display font-extrabold text-[8rem] md:text-[14rem] leading-none tracking-tighter text-ink/5 dark:text-warmWhite/5 select-none text-center w-full">
          MUTÁ
        </h2>
        <p className="text-xs text-ink/40 dark:text-warmWhite/40 mt-4">
          © 2026 MUTÁ. Tandil, Argentina.
        </p>
      </footer>
    </div>);

};