import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { products, PRODUCT_TYPES } from '../data/mockData';
import { supabase } from '../lib/supabaseClient';
import { useEffect } from 'react';

// Botón tipo píldora para ingresar (arriba a la derecha)
const AuthButton = () => (
  <div className="fixed top-8 right-8 z-50">
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
      <Link to="/auth" className="flex items-center">
        <div className="bg-[#FFB7C5] text-white px-6 py-3 rounded-full mr-[-20px] font-bold shadow-md hover:bg-[#ff9aad] transition-colors">Ingresar</div>
        <div className="w-16 h-16 bg-[#1a1a1a] rounded-full border-2 border-[#FFB7C5] flex items-center justify-center shadow-xl">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB7C5" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
      </Link>
    </motion.div>
  </div>
);

export const Home = () => {
  const featuredTypes = PRODUCT_TYPES.slice(0, 8);

  useEffect(() => {
    // Este mensaje aparecerá siempre que el componente cargue
    console.log("EL CÓDIGO DE CONEXIÓN SE ESTÁ EJECUTANDO...");

    async function probarConexion() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error("Algo falló al conectar:", error.message);
      } else {
        console.log("¡ÉXITO! Productos encontrados:", data);
      }
    }
    probarConexion();
  }, []);

  return (
    <div className="min-h-screen pt-12 pb-12">
      <AuthButton />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 min-h-[75vh] flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center space-y-8 z-10 max-w-3xl relative">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} className="absolute -inset-32 rounded-full pointer-events-none" style={{ background: "conic-gradient(from 0deg, #FFB7C5 0deg, transparent 330deg, #FFB7C5 360deg)", WebkitMask: "radial-gradient(transparent 72%, white 75%)", mask: "radial-gradient(transparent 72%, white 75%)" }} />
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-extrabold leading-[1.1] tracking-tight">Vestite <span className="not-italic font-extrabold">distinto.</span><br /><span className="muta-rosa tracking-[0.18em] uppercase">MUTÁ.</span></h1>
          <motion.div className="flex flex-wrap justify-center gap-4">
            <Link to="/feed"><Button size="lg" className="px-8">Explorar prendas</Button></Link>
            <Link to="/upload"><Button variant="outline" size="lg" className="px-8">Publicar ropa</Button></Link>
          </motion.div>
        </div>
      </section>

      {/* Categorías con Estilo Editorial */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 tracking-tight">Comprá por prenda</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredTypes.map((type, i) => (
            <Link to={`/feed?type=${type}`} key={type}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.05 }} 
                className="aspect-square rounded-[2rem] border border-[#FFB7C5]/30 flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:bg-[#FFB7C5]/5 hover:border-[#FFB7C5] group"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#FFB7C5] mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  MUTÁ SELECT
                </span>
                <span className="text-ink/90 dark:text-warmWhite/90 font-display font-bold text-xl tracking-tight text-center">
                  {type}
                </span>
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