import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import {
  products,
  PRODUCT_TYPES,
  users } from
'../data/mockData';
import { Avatar } from '../components/ui/Avatar';

export const Home = () => {
  const trending = products.slice(0, 6);
  const featuredTypes = PRODUCT_TYPES.slice(0, 8);
  
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 min-h-[75vh] flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center space-y-8 z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ink/10 dark:border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EADBC8] animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-semibold">
                Tandil · Comunidad Abierta
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-extrabold leading-[1.1] tracking-tight">
              Vestite{' '}
              <span className="font-extrabold not-italic">
                distinto.
              </span>
              <br />
              <span className="muta-rosa tracking-[0.18em] uppercase">MUTÁ.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base md:text-lg text-ink/70 dark:text-warmWhite/70 max-w-lg leading-relaxed">
            La comunidad de moda circular de Tandil. Comprá, vendé e intercambiá prendas únicas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4">
            <Link to="/feed">
              <Button size="lg" className="px-8">Explorar prendas</Button>
            </Link>
            <Link to="/upload">
              <Button variant="outline" size="lg" className="px-8">Publicar ropa</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Comprá por prenda - Cuadrados que llevan al feed filtrado */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 tracking-tight">
          Comprá por prenda
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredTypes.map((type, i) => (
            <Link to={`/feed?type=${type}`} key={type}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square rounded-[2rem] border border-[#FFB7C5] flex items-center justify-center p-6 transition-transform hover:scale-105"
              >
                <span className="text-ink/80 dark:text-warmWhite/80 font-display font-semibold text-lg tracking-wide text-center">
                  {type}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            Tendencia en Tandil
          </h2>
          <Link to="/feed" className="text-sm font-medium text-ink/60 hover:text-ink transition-colors">Ver todo</Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x">
          {trending.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[280px] md:min-w-[320px] snap-start">
              <Link to={`/product/${product.id}`} className="block group">
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 relative shadow-sm transition-shadow group-hover:shadow-soft">
                  <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="font-display font-semibold text-xl">${product.price.toLocaleString('es-AR')}</h3>
                <p className="text-ink/60 dark:text-warmWhite/60 text-sm truncate mt-1">{product.title}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/5 dark:border-white/5 pt-24 pb-12 overflow-hidden flex flex-col items-center">
        <h2 className="font-display font-extrabold text-[8rem] md:text-[14rem] leading-none tracking-tighter muta-rosa select-none text-center w-full">
          MUTÁ
        </h2>
      </footer>
    </div>
  );
};