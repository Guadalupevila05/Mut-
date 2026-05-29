import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { CONDITIONS, PRODUCT_TYPES, STYLES } from '../../data/constants';
export type FilterState = {
  conditions: string[];
  types: string[];
  styles: string[];
  priceMin: number;
  priceMax: number;
};
export const DEFAULT_FILTERS: FilterState = {
  conditions: [],
  types: [],
  styles: [],
  priceMin: 0,
  priceMax: 100000
};
interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onApply: () => void;
  onReset: () => void;
  resultsCount: number;
}
export const FilterSheet: React.FC<FilterSheetProps> = ({
  open,
  onClose,
  filters,
  onChange,
  onApply,
  onReset,
  resultsCount
}) => {
  const toggleArrayItem = (
  key: 'conditions' | 'types' | 'styles',
  item: string) =>
  {
    const arr = filters[key];
    const next = arr.includes(item) ?
    arr.filter((x) => x !== item) :
    [...arr, item];
    onChange({
      ...filters,
      [key]: next
    });
  };
  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[60] flex items-end md:items-center md:justify-center">
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        
          <motion.div
          initial={{
            y: '100%',
            opacity: 0.8
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          exit={{
            y: '100%',
            opacity: 0.8
          }}
          transition={{
            type: 'spring',
            stiffness: 280,
            damping: 30
          }}
          className="relative w-full md:max-w-lg md:rounded-[2rem] rounded-t-[2rem] bg-warmWhite dark:bg-darkBg max-h-[90vh] flex flex-col shadow-2xl">
          
            <div className="md:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-ink/15 dark:bg-warmWhite/15" />
            </div>

            <div className="flex items-center justify-between px-6 pt-4 pb-4 border-b border-ink/5 dark:border-white/5">
              <h2 className="font-display font-bold text-xl">Filtros</h2>
              <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
              
                <XIcon size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-10">
              {/* Price */}
              <section>
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-ink/60 dark:text-warmWhite/60">
                    Precio
                  </h3>
                  <span className="text-sm font-medium text-ink dark:text-warmWhite">
                    ${filters.priceMin.toLocaleString('es-AR')} — $
                    {filters.priceMax.toLocaleString('es-AR')}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 text-sm">
                      $
                    </span>
                    <input
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) =>
                    onChange({
                      ...filters,
                      priceMin: Number(e.target.value) || 0
                    })
                    }
                    className="w-full bg-softGray dark:bg-darkBg-alt rounded-xl py-3 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 text-sm">
                      $
                    </span>
                    <input
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) =>
                    onChange({
                      ...filters,
                      priceMax: Number(e.target.value) || 0
                    })
                    }
                    className="w-full bg-softGray dark:bg-darkBg-alt rounded-xl py-3 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  
                  </div>
                </div>
              </section>

              {/* Style */}
              <section>
                <h3 className="text-xs uppercase tracking-wider font-semibold text-ink/60 dark:text-warmWhite/60 mb-4">
                  Estilo
                </h3>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((s) => {
                  const active = filters.styles.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleArrayItem('styles', s)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${active ? 'bg-ink text-white border-ink dark:bg-warmWhite dark:text-ink dark:border-warmWhite' : 'bg-transparent border-ink/15 dark:border-white/15 text-ink/80 dark:text-warmWhite/80 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                      
                        {s}
                      </button>);

                })}
                </div>
              </section>

              {/* Condition */}
              <section>
                <h3 className="text-xs uppercase tracking-wider font-semibold text-ink/60 dark:text-warmWhite/60 mb-4">
                  Estado
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CONDITIONS.map((c) => {
                  const active = filters.conditions.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggleArrayItem('conditions', c)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${active ? 'bg-ink text-white border-ink dark:bg-warmWhite dark:text-ink dark:border-warmWhite' : 'bg-transparent border-ink/15 dark:border-white/15 text-ink/80 dark:text-warmWhite/80 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                      
                        {c}
                      </button>);

                })}
                </div>
              </section>

              {/* Product Type */}
              <section>
                <h3 className="text-xs uppercase tracking-wider font-semibold text-ink/60 dark:text-warmWhite/60 mb-4">
                  Tipo de prenda
                </h3>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_TYPES.map((t) => {
                  const active = filters.types.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleArrayItem('types', t)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${active ? 'bg-ink text-white border-ink dark:bg-warmWhite dark:text-ink dark:border-warmWhite' : 'bg-transparent border-ink/15 dark:border-white/15 text-ink/80 dark:text-warmWhite/80 hover:bg-black/5 dark:hover:bg-white/5'}`}>
                      
                        {t}
                      </button>);

                })}
                </div>
              </section>
            </div>

            <div className="px-6 py-4 border-t border-ink/5 dark:border-white/5 flex gap-4 items-center bg-warmWhite dark:bg-darkBg">
              <button
              onClick={onReset}
              className="text-sm font-medium text-ink/60 dark:text-warmWhite/60 hover:text-ink dark:hover:text-warmWhite">
              
                Limpiar
              </button>
              <Button onClick={onApply} className="flex-1">
                Ver {resultsCount} {resultsCount === 1 ? 'prenda' : 'prendas'}
              </Button>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

};