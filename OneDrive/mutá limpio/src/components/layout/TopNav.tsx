import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const TopNav = () => {
  const location = useLocation();
  
  const isLanding = location.pathname === '/';
  if (!isLanding) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
        
        {/* Espacio reservado para mantener el equilibrio del layout */}
        <div className="w-16 md:w-24"></div>

        {/* 
           Aquí borramos el bloque del botón de Ingresar 
           porque ahora está integrado en Home.tsx 
        */}
        <div className="flex items-center gap-4">
          {/* El botón fue eliminado exitosamente */}
        </div>
      </div>
    </motion.header>
  );
};