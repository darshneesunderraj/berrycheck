import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore, allProducts } from '../store/useStore';

const ginghamPatterns: Record<string, string> = {
  'strawberry fields apron': 'gingham-pink',
  'gingham table runner': 'gingham-sage',
  'bakers cloth napkin set': 'gingham-butter',
  'cherry oven mitt duo': 'gingham-coral',
};

function getGinghamClass(name: string): string {
  const key = name.toLowerCase();
  return ginghamPatterns[key] || 'gingham-pink';
}

function getAccentClass(tag: string): string {
  if (tag.toLowerCase().includes('sale')) return 'bg-coral-100 text-coral-700';
  if (tag.toLowerCase().includes('new')) return 'bg-butter-100 text-butter-800';
  if (tag.toLowerCase().includes('organic')) return 'bg-sage-100 text-sage-700';
  if (tag.toLowerCase().includes('bestseller') || tag.toLowerCase().includes('popular')) return 'bg-strawberry-100 text-strawberry-700';
  return 'bg-strawberry-100 text-strawberry-700';
}

export default function KitchenSection() {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const products = allProducts
    .filter(p => p.category === 'kitchen')
    .slice(0, 4);

  return (
    <section id="kitchen" className="relative py-20 sm:py-28 bg-cream-50 paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-hand text-xl text-sage-500 block mb-2">for your table</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-strawberry-900 mb-4">
            Kitchen & Dining
          </h2>
          <p className="font-sans text-strawberry-600/60 max-w-md mx-auto">
            Aprons, napkins, runners & more — designed to make cooking feel like a celebration.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => {
            const wishlisted = isInWishlist(product.id);
            const discount = product.originalPrice
              ? Math.round(((parseFloat(product.originalPrice.replace('$', '')) - parseFloat(product.price.replace('$', ''))) / parseFloat(product.originalPrice.replace('$', ''))) * 100)
              : 0;
            return (
              <div
                key={product.id}
                className={`group rounded-4xl overflow-hidden bg-white shadow-card card-hover relative ${getGinghamClass(product.name)}`}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Wishlist heart */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center heart-btn transition-all shadow-paper ${
                      wishlisted ? 'text-strawberry-500' : 'text-strawberry-300 hover:text-strawberry-500'
                    } ${wishlisted ? 'active' : ''}`}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart size={18} className={wishlisted ? 'fill-strawberry-500' : ''} />
                  </button>

                  {/* Tag badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="inline-block px-2 py-0.5 rounded-2xl text-[10px] font-sans font-bold bg-butter-200 text-butter-800">
                        New
                      </span>
                    )}
                    {product.onSale && discount > 0 && (
                      <span className="inline-block px-2 py-0.5 rounded-2xl text-[10px] font-sans font-bold bg-coral-500 text-white">
                        -{discount}%
                      </span>
                    )}
                    {product.tag && !product.isNew && !product.onSale && (
                      <span className={`inline-block px-2 py-0.5 rounded-2xl text-[10px] font-sans font-bold ${getAccentClass(product.tag)}`}>
                        {product.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  {/* Product tag style */}
                  <div className="product-tag -mt-9 relative z-10 mb-3">
                    <p className="font-sans font-bold text-strawberry-800 text-sm">{product.name}</p>
                  </div>
                  {product.description && (
                    <p className="font-sans text-[11px] text-strawberry-400 line-clamp-2 mb-2">{product.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className={`font-serif text-xl font-bold ${product.onSale ? 'text-coral-600' : 'text-strawberry-700'}`}>
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="font-sans text-xs text-strawberry-300 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-xs font-sans font-bold text-strawberry-500 hover:text-strawberry-600 underline underline-offset-4 decoration-strawberry-300 transition-colors"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link to="/kitchen" className="font-hand text-xl text-strawberry-500 hover:text-strawberry-600 transition-colors inline-flex items-center gap-2">
            View all kitchen textiles →
          </Link>
        </div>
      </div>
    </section>
  );
}
