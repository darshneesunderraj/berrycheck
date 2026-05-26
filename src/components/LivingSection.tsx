import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore, allProducts } from '../store/useStore';

const ginghamPatterns: Record<string, string> = {
  'sage garden throw': 'gingham-sage',
  'buttercup cushion cover': 'gingham-butter',
  'picnic blanket — berry': 'gingham-pink',
  'cloud-soft bed throw': 'gingham-sky',
};

function getGinghamClass(name: string): string {
  const key = name.toLowerCase();
  return ginghamPatterns[key] || 'gingham-pink';
}

function getAccentClass(tag: string): string {
  if (tag.toLowerCase().includes('sale')) return 'bg-coral-100 text-coral-700';
  if (tag.toLowerCase().includes('new')) return 'bg-butter-100 text-butter-800';
  if (tag.toLowerCase().includes('cozy') || tag.toLowerCase().includes('bestseller')) return 'bg-sage-100 text-sage-700';
  if (tag.toLowerCase().includes('luxury') || tag.toLowerCase().includes('premium')) return 'bg-sky-100 text-sky-700';
  return 'bg-strawberry-100 text-strawberry-700';
}

export default function LivingSection() {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const products = allProducts
    .filter(p => p.category === 'living')
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section id="living" className="relative py-20 sm:py-28 bg-butter-50/30 paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-hand text-xl text-peach-500 block mb-2">for your space</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-strawberry-900 mb-4">
            Home Living
          </h2>
          <p className="font-sans text-strawberry-600/60 max-w-md mx-auto">
            Throws, cushions & blankets that make every room feel like a warm hug.
          </p>
        </div>

        {/* Product grid — alternating layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured large card */}
          <div className={`md:col-span-7 group rounded-4xl overflow-hidden bg-white shadow-card card-hover relative ${getGinghamClass(products[0]?.name || '')}`}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={products[0]?.image}
                alt={products[0]?.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <button
                onClick={() => toggleWishlist(products[0]?.id)}
                className={`absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center heart-btn transition-all shadow-paper ${
                  isInWishlist(products[0]?.id) ? 'text-strawberry-500' : 'text-strawberry-300 hover:text-strawberry-500'
                } ${isInWishlist(products[0]?.id) ? 'active' : ''}`}
                aria-label={isInWishlist(products[0]?.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={18} className={isInWishlist(products[0]?.id) ? 'fill-strawberry-500' : ''} />
              </button>
              <div className="absolute top-4 left-4 flex flex-col gap-1">
                {products[0]?.isNew && (
                  <span className="inline-block px-2 py-0.5 rounded-2xl text-[10px] font-sans font-bold bg-butter-200 text-butter-800">
                    New
                  </span>
                )}
                {products[0]?.tag && !products[0]?.isNew && (
                  <span className={`inline-block px-3 py-1 rounded-2xl text-xs font-sans font-bold ${getAccentClass(products[0].tag)}`}>
                    {products[0].tag}
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="product-tag -mt-10 relative z-10 mb-3 inline-block">
                <p className="font-sans font-bold text-strawberry-800 text-sm">{products[0]?.name}</p>
              </div>
              {products[0]?.description && (
                <p className="font-sans text-[11px] text-strawberry-400 line-clamp-2 mb-2">{products[0].description}</p>
              )}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <span className={`font-serif text-2xl font-bold ${products[0]?.onSale ? 'text-coral-600' : 'text-strawberry-700'}`}>
                    {products[0]?.price}
                  </span>
                  {products[0]?.originalPrice && (
                    <span className="font-sans text-xs text-strawberry-300 line-through">{products[0].originalPrice}</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(products[0])}
                  className="text-sm font-sans font-bold text-strawberry-500 hover:text-strawberry-600 underline underline-offset-4 decoration-strawberry-300 transition-colors"
                >
                  Quick Add
                </button>
              </div>
            </div>
          </div>

          {/* Stack of smaller cards */}
          <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8">
            {products.slice(1).map((product) => {
              const wishlisted = isInWishlist(product.id);
              const discount = product.originalPrice
                ? Math.round(((parseFloat(product.originalPrice.replace('$', '')) - parseFloat(product.price.replace('$', ''))) / parseFloat(product.originalPrice.replace('$', ''))) * 100)
                : 0;
              return (
                <div
                  key={product.id}
                  className={`group rounded-4xl overflow-hidden bg-white shadow-card card-hover relative flex-1 ${getGinghamClass(product.name)}`}
                >
                  <div className="relative aspect-[2/1] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center heart-btn transition-all shadow-paper ${
                        wishlisted ? 'text-strawberry-500' : 'text-strawberry-300 hover:text-strawberry-500'
                      } ${wishlisted ? 'active' : ''}`}
                      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart size={15} className={wishlisted ? 'fill-strawberry-500' : ''} />
                    </button>
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
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
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="product-tag -mt-7 relative z-10 mb-2 inline-block">
                      <p className="font-sans font-bold text-strawberry-800 text-xs">{product.name}</p>
                    </div>
                    {product.description && (
                      <p className="font-sans text-[10px] text-strawberry-400 line-clamp-1 mb-1">{product.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-serif text-lg font-bold ${product.onSale ? 'text-coral-600' : 'text-strawberry-700'}`}>
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="font-sans text-[10px] text-strawberry-300 line-through">{product.originalPrice}</span>
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
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link to="/living" className="font-hand text-xl text-peach-500 hover:text-peach-600 transition-colors inline-flex items-center gap-2">
            View all home living textiles →
          </Link>
        </div>
      </div>
    </section>
  );
}
