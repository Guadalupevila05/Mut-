import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadIcon, XIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PRODUCT_TYPES, STYLES } from '../data/mockData';
export const Upload = () => {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  // Mock image upload
  const handleImageUpload = () => {
    if (images.length < 4) {
      setImages([
      ...images,
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80']
      );
    }
  };
  return (
    <div className="min-h-screen pb-32 md:pb-12 pt-8 px-4 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
        Publicar prenda
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <div className="flex-1 space-y-8">
          {/* Photos */}
          <section>
            <h2 className="text-xl font-display font-semibold mb-4">Fotos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, i) =>
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
                
                  <img src={img} className="w-full h-full object-cover" />
                  <button
                  onClick={() =>
                  setImages(images.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  
                    <XIcon size={16} />
                  </button>
                </div>
              )}
              {images.length < 4 &&
              <button
                onClick={handleImageUpload}
                className="aspect-[3/4] rounded-2xl border-2 border-dashed border-ink/20 dark:border-white/20 flex flex-col items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                
                  <UploadIcon className="text-ink/40" />
                  <span className="text-sm font-medium text-ink/60">
                    Subir foto
                  </span>
                </button>
              }
            </div>
            <p className="text-xs text-ink/50 mt-2">
              Agregá hasta 4 fotos. La primera será la portada.
            </p>
          </section>

          {/* Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold mb-4">
              Detalles
            </h2>

            <div>
              <label className="block text-sm font-medium mb-2">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Campera de jean vintage"
                className="w-full bg-softGray dark:bg-darkBg-alt rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent" />
              
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Descripción
              </label>
              <textarea
                rows={4}
                placeholder="Contá un poco sobre la prenda, estado, medidas..."
                className="w-full bg-softGray dark:bg-darkBg-alt rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
              
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Categoría
                </label>
                <select className="w-full bg-softGray dark:bg-darkBg-alt rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent appearance-none">
                  <option value="">Seleccionar</option>
                  {PRODUCT_TYPES.map((t) =>
                  <option key={t} value={t}>
                      {t}
                    </option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Talle</label>
                <select className="w-full bg-softGray dark:bg-darkBg-alt rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent appearance-none">
                  <option value="">Seleccionar</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
            </div>
          </section>

          {/* Price */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold mb-4">Precio</h2>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-ink/40">
                $
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="w-full bg-softGray dark:bg-darkBg-alt rounded-xl py-3 pl-10 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-accent" />
              
            </div>

            <label className="flex items-center gap-3 p-4 rounded-xl border border-ink/10 dark:border-white/10 cursor-pointer hover:bg-black/5 transition-colors">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-ink/20 text-accent focus:ring-accent" />
              
              <div>
                <p className="font-medium">Acepto intercambios</p>
                <p className="text-sm text-ink/60">
                  Permitir que otros usuarios ofrezcan sus prendas.
                </p>
              </div>
            </label>
          </section>
        </div>

        {/* Live Preview (Desktop) */}
        <div className="hidden lg:block w-80">
          <div className="sticky top-8">
            <h2 className="text-xl font-display font-semibold mb-4">
              Vista previa
            </h2>
            <div className="pointer-events-none">
              <div className="rounded-3xl overflow-hidden bg-softGray dark:bg-darkBg-alt mb-3">
                <div className="aspect-[3/4] bg-ink/5 flex items-center justify-center">
                  {images[0] ?
                  <img
                    src={images[0]}
                    className="w-full h-full object-cover" /> :


                  <UploadIcon className="text-ink/20" size={48} />
                  }
                </div>
              </div>
              <h3 className="font-display font-semibold text-lg">
                ${price || '0'}
              </h3>
              <p className="text-sm text-ink/70">
                {title || 'Título de la prenda'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-20 md:bottom-0 left-0 right-0 p-4 bg-warmWhite/80 dark:bg-darkBg/80 backdrop-blur-xl border-t border-ink/5 z-40 md:relative md:bg-transparent md:border-none md:p-0 md:mt-12">
        <div className="max-w-6xl mx-auto flex justify-end">
          <Button size="lg" className="w-full md:w-auto md:min-w-[200px]">
            Publicar
          </Button>
        </div>
      </div>
    </div>);

};