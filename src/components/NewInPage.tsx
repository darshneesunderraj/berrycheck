import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, SlidersHorizontal } from 'lucide-react';
import { useStore, allProducts } from '../store/useStore';

const categories = ['All', 'Kitchen', 'Living'];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name A-Z', value: 'name-asc' },
];

export default function NewInPage() {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const newProducts = allProducts.filter((p) => p.isNew);

  const filtered = newProducts
    .filter((p) => activeCategory === 'All' || p.category === activeCategory.toLowerCase())
    .sort((a, b) => {
      const pa = parseFloat(a.price.replace('$', ''));
      const pb = parseFloat(b.price.replace('$', ''));
      switch (sort) {
        case 'price-asc': return pa - pb;
        case 'price-desc': return pb - pa;
        case 'name-asc': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-cream-50 paper-texture">
      {/* Header */}
      <div className="relative pt-28 pb-16 gingham-butter overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-butter-50/50 via-cream-50/30 to-peach-50/40" />
        <div className="absolute top-16 left-10 text-3xl float-decoration animate-float opacity-50">✨</div>
        <div className="absolute bottom-8 right-12 text-2xl float-decoration animate-float-slow opacity-50">🌸</div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-strawberry-500 font-sans font-bold text-sm hover:text-strawberry-600 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <span className="inline-block px-3 py-1 bg-butter-200 text-butter-800 text-xs font-sans font-bold rounded-2xl mb-4">Just Arrived</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-strawberry-900 mb-3 text-shadow-warm">
            New In
          </h1>
          <p className="font-sans text-strawberry-600/60 max-w-lg">
            Fresh from the studio — our latest drops in kitchen and home textiles. Be the first to style them.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
            <path
              d="M0,30 Q30,0 60,30 T120,30 T180,30 T240,30 T300,30 T360,30 T420,30 T480,30 T540,30 T600,30 T660,30 T720,30 T780,30 T840,30 T900,30 T960,30 T1020,30 T1080,30 T1140,30 T1200,30 T1260,30 T1320,30 T1380,30 T1440,30 L1440,60 L0,60 Z"
              fill="#fffef9"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl font-sans font-semibold text-sm transition-all ${
                  activeCategory === cat
                    ? 'bg-strawberry-500 text-white shadow-warm'
                    : 'bg-white text-strawberry-600 hover:bg-strawberry-50 shadow-paper'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl font-sans font-semibold text-sm text-strawberry-600 shadow-paper hover:bg-strawberry-50 transition-colors"
          >
            <SlidersHorizontal size={14} />
            Sort
          </button>
        </div>

        {/* Sort dropdown */}
        {showFilters && (
          <div className="bg-white rounded-3xl shadow-card p-4 mb-8 animate-fade-in">
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setShowFilters(false); }}
                  className={`px-4 py-2 rounded-2xl font-sans text-sm transition-all ${
                    sort === opt.value
                      ? 'bg-strawberry-100 text-strawberry-700 font-bold'
                      : 'text-strawberry-500 hover:bg-strawberry-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ribbon divider */}
        <div className="ribbon-divider mb-10">
          <span className="font-hand text-xl text-strawberry-500 bg-cream-50 px-4 relative z-10">
            {filtered.length} new arrival{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {filtered.map((product) => {
            const wishlisted = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group rounded-4xl overflow-hidden bg-white shadow-card card-hover relative gingham-butter"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center heart-btn transition-all shadow-paper ${
                      wishlisted ? 'text-strawberry-500' : 'text-strawberry-300 hover:text-strawberry-500'
                    } ${wishlisted ? 'active' : ''}`}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart size={16} className={wishlisted ? 'fill-strawberry-500' : ''} />
                  </button>
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-0.5 rounded-2xl text-[10px] font-sans font-bold bg-butter-200 text-butter-800">
                      New
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="product-tag -mt-8 relative z-10 mb-2">
                    <p className="font-sans font-bold text-strawberry-800 text-xs sm:text-sm">{product.name}</p>
                  </div>
                  <p className="font-sans text-[11px] text-strawberry-400 line-clamp-2 mb-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="font-serif text-lg sm:text-xl font-bold text-strawberry-700">{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-[10px] sm:text-xs font-sans font-bold text-strawberry-500 hover:text-strawberry-600 underline underline-offset-4 decoration-strawberry-300 transition-colors"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl block mb-3">🌱</span>
            <p className="font-serif text-lg text-strawberry-800 mb-2">No new arrivals in this category yet</p>
            <p className="font-hand text-strawberry-400">check back soon — we're always creating!</p>
          </div>
        )}
      </div>
    </div>
  );
}
