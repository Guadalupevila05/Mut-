import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { products, PRODUCT_TYPES } from '../data/mockData';

// Botón tipo píldora para ingresar (arriba a la derecha)
const AuthButton = () => (
  <div className="fixed top-8 right-8 z-50">
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <Link to="/auth" className="flex items-center">
        <div className="bg-[#FFB7C5] text-white px-6 py-3 rounded-full mr-[-20px] font-bold shadow-md hover:bg-[#ff9aad] transition-colors">
          Ingresar
        </div>
        <div className="w-16 h-16 bg-[#1a1a1a] rounded-full border-2 border-[#FFB7C5] flex items-center justify-center shadow-xl">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB7C5" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </Link>
    </motion.div>
  </div>
);

export const Home = () => {
  const trending = products.slice(0, 6);
  const featuredTypes = PRODUCT_TYPES.slice(0, 8);

  return (
    <div className="min-h-screen pt-12 pb-12">
      <AuthButton />

      <section className="max-w-7xl mx-auto px-4 md:px-8 min-h-[75vh] flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center space-y-8 z-10 max-w-3xl relative">
          
          {/* Eclipse Premium: Más grande y casi completo (360°) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-32 rounded-full pointer-events-none"
            style={{
              background: "conic-gradient(from 0deg, #FFB7C5 0deg, transparent 330deg, #FFB7C5 360deg)",
              WebkitMask: "radial-gradient(transparent 72%, white 75%)",
              mask: "radial-gradient(transparent 72%, white 75%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-extrabold leading-[1.1] tracking-tight">
              Vestite{' '}
              <span className="font-extrabold not-italic">distinto.</span>
              <br />
              <span className="muta-rosa tracking-[0.18em] uppercase">MUTÁ.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base md:text-lg text-ink/70 dark:text-warmWhite/70 max-w-lg leading-relaxed pt-8"
          >
            La comunidad de moda circular de Tandil. Comprá, vendé e intercambiá prendas únicas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/feed"><Button size="lg" className="px-8">Explorar prendas</Button></Link>
            <Link to="/upload"><Button variant="outline" size="lg" className="px-8">Publicar ropa</Button></Link>
          </motion.div>
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 tracking-tight">Comprá por prenda</h2>
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
                <span className="text-ink/80 dark:text-warmWhite/80 font-display font-semibold text-lg tracking-wide text-center">{type}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
      
      <footer className="border-t border-ink/5 dark:border-white/5 pt-24 pb-12 flex flex-col items-center">
        <h2 className="font-display font-extrabold text-[8rem] md:text-[14rem] leading-none tracking-tighter muta-rosa select-none text-center w-full">MUTÁ.</h2>
      </footer>
    </div>
  );
};