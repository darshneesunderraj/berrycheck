import { Heart, X, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';

export default function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen, wishlistProducts, toggleWishlist, addToCart, wishlist } = useStore();

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isWishlistOpen]);

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-strawberry-900/30 backdrop-blur-sm"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-cream-50 shadow-2xl flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-strawberry-100">
          <div className="flex items-center gap-3">
            <Heart size={20} className="text-strawberry-500 fill-strawberry-500" />
            <h3 className="font-serif text-xl font-bold text-strawberry-900">Wishlist</h3>
            {wishlist.length > 0 && (
              <span className="bg-strawberry-100 text-strawberry-600 text-xs font-sans font-bold px-2 py-0.5 rounded-xl">
                {wishlist.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-strawberry-400 hover:text-strawberry-600 rounded-full hover:bg-strawberry-50 transition-colors"
            aria-label="Close wishlist"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-5xl block mb-4">💝</span>
              <p className="font-serif text-lg text-strawberry-800 mb-2">Your wishlist is empty</p>
              <p className="font-hand text-strawberry-400">tap the hearts to save your favorites!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 bg-white rounded-3xl p-3 shadow-paper card-hover"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-bold text-strawberry-800 text-sm truncate">
                      {product.name}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-strawberry-50 text-strawberry-500 text-[10px] font-sans font-bold rounded-xl">
                      {product.tag}
                    </span>
                    <p className="font-serif font-bold text-strawberry-600 mt-1">{product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product.id);
                        }}
                        className="flex items-center gap-1.5 bg-strawberry-500 hover:bg-strawberry-600 text-white font-sans font-bold text-xs px-3 py-1.5 rounded-xl transition-colors"
                      >
                        <ShoppingBag size={12} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-strawberry-300 hover:text-strawberry-500 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 border-t border-strawberry-100 bg-white">
            <p className="font-hand text-sm text-sage-500 mb-3" style={{ transform: 'rotate(-0.5deg)' }}>
              {wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? 's' : ''} waiting for you
            </p>
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => addToCart(p));
                wishlistProducts.forEach((p) => toggleWishlist(p.id));
                setIsWishlistOpen(false);
              }}
              className="w-full bg-strawberry-500 hover:bg-strawberry-600 text-white font-sans font-bold py-3 rounded-3xl transition-all hover:shadow-warm"
            >
              Add All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
