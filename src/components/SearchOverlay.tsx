import { useEffect, useRef } from 'react';
import { Search, X, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, searchResults, addToCart, toggleWishlist, isInWishlist } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSearchOpen, setSearchQuery]);

  if (!isSearchOpen) return null;

  const categories = ['Kitchen', 'Living', 'Outdoor'];
  const suggestions = ['Apron', 'Throw', 'Gingham', 'Napkin', 'Cushion', 'Runner'];

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-strawberry-900/30 backdrop-blur-sm"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Overlay */}
      <div className="absolute inset-0 sm:inset-x-auto sm:right-0 sm:w-full sm:max-w-2xl bg-cream-50 shadow-2xl flex flex-col animate-fade-in sm:rounded-l-3xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 p-5 border-b border-strawberry-100">
          <Search size={20} className="text-strawberry-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search textiles, patterns, collections..."
            className="flex-1 bg-transparent font-sans text-lg text-strawberry-900 placeholder-strawberry-300 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-strawberry-400 hover:text-strawberry-600 rounded-full hover:bg-strawberry-50 transition-colors"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results area */}
        <div className="flex-1 overflow-y-auto p-5">
          {searchQuery.trim() === '' ? (
            <>
              {/* Browse by category */}
              <div className="mb-8">
                <h4 className="font-sans font-bold text-sm text-strawberry-400 uppercase tracking-wider mb-3">Browse</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSearchQuery(cat)}
                      className="px-4 py-2 bg-strawberry-50 text-strawberry-600 rounded-2xl font-sans font-semibold text-sm hover:bg-strawberry-100 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular searches */}
              <div>
                <h4 className="font-sans font-bold text-sm text-strawberry-400 uppercase tracking-wider mb-3">Popular Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSearchQuery(s)}
                      className="px-3 py-1.5 border border-strawberry-200 text-strawberry-500 rounded-2xl font-sans text-sm hover:bg-strawberry-50 hover:border-strawberry-300 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-4xl block mb-3">🔍</span>
              <p className="font-serif text-lg text-strawberry-800 mb-2">No results found</p>
              <p className="font-hand text-strawberry-400">try searching for "apron" or "gingham"</p>
            </div>
          ) : (
            <div>
              <p className="font-sans text-xs text-strawberry-400 mb-4">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
              <div className="grid grid-cols-2 gap-3">
                {searchResults.map((product) => {
                  const wishlisted = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-3xl overflow-hidden shadow-paper card-hover"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center heart-btn transition-all shadow-paper ${
                            wishlisted ? 'text-strawberry-500' : 'text-strawberry-300 hover:text-strawberry-500'
                          }`}
                          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <Heart size={13} className={wishlisted ? 'fill-strawberry-500' : ''} />
                        </button>
                      </div>
                      <div className="p-3">
                        <p className="font-sans font-bold text-strawberry-800 text-xs truncate">{product.name}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="font-serif text-sm font-bold text-strawberry-600">{product.price}</span>
                          <button
                            onClick={() => addToCart(product)}
                            className="text-[10px] font-sans font-bold text-strawberry-500 hover:text-strawberry-600 underline underline-offset-2 decoration-strawberry-300 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
