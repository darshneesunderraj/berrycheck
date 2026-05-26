import { Heart, Shuffle } from 'lucide-react';
import { useStore, allProducts } from '../store/useStore';

export default function MixMatchGrid() {
  const { toggleWishlist, isInWishlist } = useStore();

  const gridItems = allProducts.slice(0, 9).map((p, i) => ({
    id: p.id,
    title: p.name,
    image: p.image,
    tag: p.category === 'kitchen' ? 'Kitchen' : 'Living',
    height: [0, 3, 7].includes(i) ? 'row-span-2' : '',
  }));

  return (
    <section className="relative py-20 sm:py-28 bg-strawberry-50/30 paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-peach-100 text-peach-600 px-4 py-1.5 rounded-2xl text-sm font-sans font-bold mb-4">
            <Shuffle size={14} />
            Style Guide
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-strawberry-900 mb-4">
            Mix, Match & Style
          </h2>
          <p className="font-sans text-strawberry-600/60 max-w-lg mx-auto">
            No rules, just vibes. Pair patterns, play with color, and create a home that's uniquely you.
          </p>
        </div>

        {/* Pinterest-style masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-[180px]">
          {gridItems.map((item) => {
            const wishlisted = isInWishlist(item.id);
            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer card-hover ${item.height}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-strawberry-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Wishlist heart */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(item.id); }}
                  className={`absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center heart-btn transition-all shadow-paper ${
                    wishlisted ? 'text-strawberry-500 opacity-100' : 'text-strawberry-300 hover:text-strawberry-500 opacity-0 group-hover:opacity-100'
                  } ${wishlisted ? 'active' : ''}`}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={14} className={wishlisted ? 'fill-strawberry-500' : ''} />
                </button>

                {/* Tag */}
                <span className="absolute top-3 left-3 text-[10px] font-sans font-bold bg-white/80 backdrop-blur-sm text-strawberry-600 px-2 py-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                  {item.tag}
                </span>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <p className="font-sans font-bold text-white text-sm">{item.title}</p>
                  <p className="font-hand text-white/80 text-xs mt-0.5">tap to style</p>
                </div>

                {/* Stiched accent border */}
                <div className="absolute inset-2 border-2 border-dashed border-white/20 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

        {/* Handwritten note */}
        <div className="text-center mt-12">
          <p className="font-hand text-xl text-strawberry-400 italic" style={{ transform: 'rotate(-1deg)' }}>
            "The best rooms are the ones that feel collected, not decorated."
          </p>
        </div>
      </div>
    </section>
  );
}
