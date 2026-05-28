import React, { useMemo, useState, ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SearchIcon,
  SlidersHorizontalIcon,
  MapPinIcon,
  XIcon,
  TrendingUpIcon,
  SparklesIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from 'lucide-react';
import { PRODUCT_TYPES } from '../data/constants';
import { useProducts } from '../lib/supabase';
import { ProductCard } from '../components/product/ProductCard';
import {
  FilterSheet,
  DEFAULT_FILTERS,
  FilterState,
} from '../components/product/FilterSheet';

type SortKey = 'reciente' | 'popular' | 'precio_asc' | 'precio_desc';
const SORT_OPTIONS: {
  key: SortKey;
  label: string;
  icon: ComponentType<any>;
}[] = [
  { key: 'reciente', label: 'Recién subido', icon: SparklesIcon },
  { key: 'popular', label: 'Más popular', icon: TrendingUpIcon },
  { key: 'precio_asc', label: 'Precio menor', icon: ArrowUpIcon },
  { key: 'precio_desc', label: 'Precio mayor', icon: ArrowDownIcon },
];

export const Feed = () => {
  const [activeType, setActiveType] = useState('Todos');
  const [sort, setSort] = useState<SortKey>('reciente');
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [draftFilters, setDraftFilters] =
    useState<FilterState>(DEFAULT_FILTERS);

  // Combinamos el "chip" de tipo (Todos / Remeras / etc.) con los tipos del
  // FilterSheet para una sola query a Supabase.
  const effectiveFilters = useMemo<FilterState>(() => {
    if (activeType === 'Todos') return filters;
    const types = filters.types.length
      ? filters.types.filter((t) => t === activeType)
      : [activeType];
    return { ...filters, types: types.length ? types : [activeType] };
  }, [filters, activeType]);

  const { products, loading } = useProducts(
    effectiveFilters,
    sort,
    search,
  );

  const activeFilterCount =
    filters.conditions.length +
    filters.types.length +
    filters.styles.length +
    (filters.priceMin > DEFAULT_FILTERS.priceMin ? 1 : 0) +
    (filters.priceMax < DEFAULT_FILTERS.priceMax ? 1 : 0);

  const openFilters = () => {
    setDraftFilters(filters);
    setFilterOpen(true);
  };
  const applyFilters = () => {
    setFilters(draftFilters);
    setFilterOpen(false);
  };
  const resetFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
  };

  const spotlight = products.find((p) => p.likes > 200) || products[0];

  return (
    <div className="min-h-screen pt-4 md:pt-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass">
            <MapPinIcon size={14} className="text-accent" />
            <span className="font-medium">Tandil · Centro</span>
          </span>
          <span className="text-xs text-ink/50 hidden sm:inline">
            {products.length} prendas disponibles
          </span>
        </div>
      </div>

      <div className="sticky top-0 z-30 pt-2 pb-3 bg-transparent -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-3 items-center mb-3">
          <div className="flex-1 relative">
            <SearchIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70 muta-rosa"
              size={20}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar prendas, marcas o usuarios..."
              className="search-input w-full rounded-full py-3 pl-12 pr-4 transition-all"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={openFilters}
            className="relative p-3 rounded-full glass hover:bg-white/80 transition-colors"
            aria-label="Filtros"
          >
            <SlidersHorizontalIcon size={20} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </motion.button>
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-1">
          {SORT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = sort === opt.key;
            return (
              <motion.button
                key={opt.key}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSort(opt.key)}
                className={`whitespace-nowrap inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${active ? 'bg-ink text-white border-ink dark:bg-warmWhite dark:text-ink dark:border-warmWhite' : 'bg-transparent border-ink/15 dark:border-white/15 text-ink/70 dark:text-warmWhite/70 hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <Icon size={14} />
                {opt.label}
              </motion.button>
            );
          })}
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          <button
            onClick={() => setActiveType('Todos')}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeType === 'Todos' ? 'bg-ink text-white dark:bg-warmWhite dark:text-ink' : 'glass text-ink/70 dark:text-warmWhite/70 hover:bg-white/50'}`}
          >
            Todos
          </button>
          {PRODUCT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeType === type ? 'bg-ink text-white dark:bg-warmWhite dark:text-ink' : 'glass text-ink/70 dark:text-warmWhite/70 hover:bg-white/50'}`}
            >
              {type}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-2 overflow-x-auto hide-scrollbar pt-2"
            >
              {filters.styles.map((s) => (
                <FilterChip
                  key={`s-${s}`}
                  label={s}
                  onRemove={() =>
                    setFilters({
                      ...filters,
                      styles: filters.styles.filter((x) => x !== s),
                    })
                  }
                />
              ))}
              {filters.conditions.map((c) => (
                <FilterChip
                  key={`c-${c}`}
                  label={c}
                  onRemove={() =>
                    setFilters({
                      ...filters,
                      conditions: filters.conditions.filter((x) => x !== c),
                    })
                  }
                />
              ))}
              {filters.types.map((t) => (
                <FilterChip
                  key={`t-${t}`}
                  label={t}
                  onRemove={() =>
                    setFilters({
                      ...filters,
                      types: filters.types.filter((x) => x !== t),
                    })
                  }
                />
              ))}
              {(filters.priceMin > 0 ||
                filters.priceMax < DEFAULT_FILTERS.priceMax) && (
                <FilterChip
                  label={`$${filters.priceMin.toLocaleString('es-AR')} — $${filters.priceMax.toLocaleString('es-AR')}`}
                  onRemove={() =>
                    setFilters({
                      ...filters,
                      priceMin: 0,
                      priceMax: DEFAULT_FILTERS.priceMax,
                    })
                  }
                />
              )}
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="text-xs font-medium text-ink/50 underline underline-offset-4 whitespace-nowrap px-2 hover:text-ink"
              >
                Limpiar todo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {spotlight && activeType === 'Todos' && !search && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 mb-8 rounded-[2rem] overflow-hidden relative group cursor-pointer"
        >
          <a href={`/product/${spotlight.id}`}>
            <div className="relative h-48 md:h-64">
              <img
                src={spotlight.images?.[0]}
                alt={spotlight.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest w-fit mb-3">
                  <SparklesIcon size={12} /> Pick del día
                </span>
                <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight max-w-lg mb-2">
                  {spotlight.title}
                </h2>
                <p className="text-sm md:text-base text-white/80 font-medium tracking-wide">
                  ${spotlight.price.toLocaleString('es-AR')}
                </p>
              </div>
            </div>
          </a>
        </motion.div>
      )}

      {loading ? (
        <div className="py-24 text-center text-sm text-ink/50 dark:text-warmWhite/50">
          Cargando prendas...
        </div>
      ) : products.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 mt-4 pb-24">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-24">
          <div className="w-20 h-20 rounded-full glass flex items-center justify-center mb-6">
            <SearchIcon size={28} className="text-ink/40" />
          </div>
          <h3 className="font-display font-bold text-xl mb-2">
            No encontramos prendas
          </h3>
          <p className="text-sm text-ink/60 dark:text-warmWhite/60 max-w-xs mb-6">
            Probá sacar algún filtro o buscar otra cosa.
          </p>
          <button
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="text-sm font-medium text-accent underline underline-offset-4"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={draftFilters}
        onChange={setDraftFilters}
        onApply={applyFilters}
        onReset={resetFilters}
        resultsCount={products.length}
      />
    </div>
  );
};

const FilterChip: React.FC<{
  label: string;
  onRemove: () => void;
}> = ({ label, onRemove }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-semibold tracking-wide"
  >
    {label}
    <button
      onClick={onRemove}
      className="hover:bg-accent/20 rounded-full p-0.5 transition-colors"
    >
      <XIcon size={12} />
    </button>
  </motion.span>
);
