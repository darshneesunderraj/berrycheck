import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, Tag } from 'lucide-react';
import { useStore, allProducts } from '../store/useStore';

const categories = ['All', 'Kitchen', 'Living'];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Sale ends 3 days from now
    const end = new Date();
    end.setDate(end.getDate() + 3);
    end.setHours(23, 59, 59);

    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, end.getTime() - now.getTime());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hrs', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.minutes },
        { label: 'Sec', value: timeLeft.seconds },
      ].map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-warm">
            <span className="font-serif text-xl font-bold text-strawberry-600">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="font-sans text-[9px] text-strawberry-400 font-bold uppercase mt-1 block">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function SalePage() {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');

  const saleProducts = allProducts.filter((p) => p.onSale);
  const filtered = saleProducts.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory.toLowerCase()
  );

  const totalSaved = saleProducts.reduce((sum, p) => {
    if (p.originalPrice) {
      const orig = parseFloat(p.originalPrice.replace('$', ''));
      const curr = parseFloat(p.price.replace('$', ''));
      return sum + (orig - curr);
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-cream-50 paper-texture">
      {/* Header */}
      <div className="relative pt-28 pb-16 bg-gradient-to-br from-coral-100 via-peach-50 to-butter-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-[10%] text-6xl rotate-12">🏷️</div>
          <div className="absolute top-20 right-[15%] text-5xl -rotate-6">💰</div>
          <div className="absolute bottom-12 left-[40%] text-4xl rotate-3">🔥</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-strawberry-500 font-sans font-bold text-sm hover:text-strawberry-600 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Tag size={24} className="text-coral-500" />
            <span className="inline-block px-3 py-1 bg-coral-200 text-coral-800 text-xs font-sans font-bold rounded-2xl">Limited Time</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-strawberry-900 mb-3 text-shadow-warm">
            Seasonal Sale
          </h1>
          <p className="font-sans text-strawberry-600/60 max-w-lg mb-6">
            Up to 30% off selected pieces. Once they're gone, they're gone — grab your favorites before time runs out.
          </p>

          {/* Countdown */}
          <div className="bg-strawberry-900/5 rounded-4xl p-5 inline-flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-coral-500" />
              <span className="font-sans font-bold text-sm text-strawberry-700">Sale ends in:</span>
            </div>
            <CountdownTimer />
          </div>
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
        {/* Savings banner */}
        <div className="bg-gradient-to-r from-coral-50 to-peach-50 rounded-4xl p-6 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-paper">
          <div>
            <p className="font-sans font-bold text-strawberry-800 text-sm">Shopping the sale?</p>
            <p className="font-hand text-lg text-coral-500">You could save up to ${totalSaved.toFixed(0)}!</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl font-sans font-semibold text-sm transition-all ${
                  activeCategory === cat
                    ? 'bg-coral-500 text-white shadow-warm'
                    : 'bg-white text-coral-600 hover:bg-coral-50 shadow-paper'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ribbon divider */}
        <div className="ribbon-divider mb-10">
          <span className="font-hand text-xl text-coral-500 bg-cream-50 px-4 relative z-10">
            {filtered.length} on sale
          </span>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {filtered.map((product) => {
            const wishlisted = isInWishlist(product.id);
            const discount = product.originalPrice
              ? Math.round(((parseFloat(product.originalPrice.replace('$', '')) - parseFloat(product.price.replace('$', ''))) / parseFloat(product.originalPrice.replace('$', ''))) * 100)
              : 0;
            return (
              <div
                key={product.id}
                className="group rounded-4xl overflow-hidden bg-white shadow-card card-hover relative"
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
                  {/* Sale badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-0.5 rounded-2xl text-[10px] font-sans font-bold bg-coral-500 text-white">
                      -{discount}%
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="product-tag -mt-8 relative z-10 mb-2">
                    <p className="font-sans font-bold text-strawberry-800 text-xs sm:text-sm">{product.name}</p>
                  </div>
                  <p className="font-sans text-[11px] text-strawberry-400 line-clamp-2 mb-2">{product.description}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-serif text-lg sm:text-xl font-bold text-coral-600">{product.price}</span>
                    {product.originalPrice && (
                      <span className="font-sans text-xs text-strawberry-300 line-through">{product.originalPrice}</span>
                    )}
                    <button
                      onClick={() => addToCart(product)}
                      className="ml-auto text-[10px] sm:text-xs font-sans font-bold text-coral-500 hover:text-coral-600 underline underline-offset-4 decoration-coral-300 transition-colors"
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
            <span className="text-4xl block mb-3">🛍️</span>
            <p className="font-serif text-lg text-strawberry-800 mb-2">No sale items in this category</p>
            <p className="font-hand text-strawberry-400">try another category or check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
