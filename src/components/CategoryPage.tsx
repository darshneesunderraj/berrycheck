import { useParams, Link } from 'react-router-dom';
import { Heart, SlidersHorizontal } from 'lucide-react';
import { useStore, allProducts, categoryTree } from '../store/useStore';
import { useState, useMemo } from 'react';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name A-Z', value: 'name-asc' },
  { label: 'Newest', value: 'newest' },
];

const categoryMeta: Record<
  string,
  { emoji: string; gingham: string; subtitle: string }
> = {
  kitchen: {
    emoji: '🧺',
    gingham: 'gingham-pink',
    subtitle:
      'Aprons, runners, napkins & more — designed to make cooking feel like a celebration.',
  },

  living: {
    emoji: '🏡',
    gingham: 'gingham-sage',
    subtitle:
      'Throws, curtains, rugs & wall hangings that make every room feel like a warm hug.',
  },
};

export default function CategoryPage() {
  const { category, subcategory } = useParams<{
    category: string;
    subcategory?: string;
  }>();

  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [sort, setSort] = useState('featured');
  const [showSort, setShowSort] = useState(false);

  const catInfo = categoryTree.find((c) => c.slug === category);

  const meta =
    categoryMeta[category ?? 'kitchen'] ?? categoryMeta.kitchen;

  const products = useMemo(() => {
    let filtered = allProducts.filter(
      (p) => p.category === category
    );

    if (subcategory) {
      filtered = filtered.filter(
        (p) => p.subcategory === subcategory
      );
    }

    return [...filtered].sort((a, b) => {
      const pa = parseFloat(
        a.price.replace(/[^0-9.]/g, '')
      );

      const pb = parseFloat(
        b.price.replace(/[^0-9.]/g, '')
      );

      switch (sort) {
        case 'price-asc':
          return pa - pb;

        case 'price-desc':
          return pb - pa;

        case 'name-asc':
          return a.name.localeCompare(b.name);

        case 'newest':
          return (
            (b.isNew ? 1 : 0) -
            (a.isNew ? 1 : 0)
          );

        default:
          return 0;
      }
    });
  }, [category, subcategory, sort]);

  const subLabel =
    subcategory && catInfo
      ? catInfo.children.find(
          (c) => c.slug === subcategory
        )?.label ?? subcategory
      : null;

  const title = subLabel
    ? subLabel
    : catInfo?.label ?? 'All Products';

  return (
    <div className="min-h-screen bg-cream-50 paper-texture">
      {/* HEADER */}
      <div
        className={`relative pt-28 pb-16 ${meta.gingham} overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-strawberry-50/50 via-cream-50/30 to-butter-50/40" />

        <div className="absolute top-16 left-10 text-3xl float-decoration animate-float opacity-50">
          {meta.emoji}
        </div>

        <div className="absolute bottom-8 right-12 text-2xl float-decoration animate-float-slow opacity-50">
          🌿
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-sm font-sans mb-6 flex-wrap">
            <Link
              to="/"
              className="text-strawberry-400 hover:text-strawberry-600 transition-colors"
            >
              Home
            </Link>

            {catInfo && (
              <>
                <span className="text-strawberry-300">
                  /
                </span>

                {subcategory ? (
                  <Link
                    to={`/${category}`}
                    className="text-strawberry-400 hover:text-strawberry-600 transition-colors"
                  >
                    {catInfo.label}
                  </Link>
                ) : (
                  <span className="text-strawberry-600 font-semibold">
                    {catInfo.label}
                  </span>
                )}
              </>
            )}

            {subLabel && (
              <>
                <span className="text-strawberry-300">
                  /
                </span>

                <span className="text-strawberry-600 font-semibold">
                  {subLabel}
                </span>
              </>
            )}
          </div>

          <span className="text-4xl block mb-3">
            {meta.emoji}
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-strawberry-900 mb-3 text-shadow-warm">
            {title}
          </h1>

          <p className="font-sans text-strawberry-600/60 max-w-lg">
            {meta.subtitle}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-12"
          >
            <path
              d="M0,30 Q30,0 60,30 T120,30 T180,30 T240,30 T300,30 T360,30 T420,30 T480,30 T540,30 T600,30 T660,30 T720,30 T780,30 T840,30 T900,30 T960,30 T1020,30 T1080,30 T1140,30 T1200,30 T1260,30 T1320,30 T1380,30 T1440,30 L1440,60 L0,60 Z"
              fill="#fffef9"
            />
          </svg>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SUBCATEGORY PILLS */}
        {catInfo && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Link
              to={`/${category}`}
              className={`px-4 py-2 rounded-2xl font-sans font-semibold text-sm transition-all ${
                !subcategory
                  ? 'bg-strawberry-500 text-white shadow-warm'
                  : 'bg-white text-strawberry-600 hover:bg-strawberry-50 shadow-paper'
              }`}
            >
              All
            </Link>

            {catInfo.children.map((sub) => (
              <Link
                key={sub.slug}
                to={`/${category}/${sub.slug}`}
                className={`px-4 py-2 rounded-2xl font-sans font-semibold text-sm transition-all ${
                  subcategory === sub.slug
                    ? 'bg-strawberry-500 text-white shadow-warm'
                    : 'bg-white text-strawberry-600 hover:bg-strawberry-50 shadow-paper'
                }`}
              >
                {sub.label}
              </Link>
            ))}

            {/* SORT */}
            <div className="ml-auto relative">
              <button
                onClick={() =>
                  setShowSort(!showSort)
                }
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl font-sans font-semibold text-sm text-strawberry-600 shadow-paper hover:bg-strawberry-50 transition-colors"
              >
                <SlidersHorizontal size={14} />
                Sort
              </button>

              {showSort && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-3xl shadow-card p-3 animate-fade-in z-20">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSort(opt.value);
                        setShowSort(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-2xl font-sans text-sm transition-colors ${
                        sort === opt.value
                          ? 'bg-strawberry-100 text-strawberry-700 font-bold'
                          : 'text-strawberry-500 hover:bg-strawberry-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* RIBBON */}
        <div className="ribbon-divider mb-10">
          <span className="font-hand text-xl text-strawberry-500 bg-cream-50 px-4 relative z-10">
            {products.length} piece
            {products.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* GRID */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
            {products.map((product) => {
              const wishlisted = isInWishlist(
                product.id
              );

              const discount = product.originalPrice
                ? Math.round(
                    ((parseFloat(
                      product.originalPrice.replace(
                        /[^0-9.]/g,
                        ''
                      )
                    ) -
                      parseFloat(
                        product.price.replace(
                          /[^0-9.]/g,
                          ''
                        )
                      )) /
                      parseFloat(
                        product.originalPrice.replace(
                          /[^0-9.]/g,
                          ''
                        )
                      )) *
                      100
                  )
                : 0;

              return (
                <div
                  key={product.id}
                  className="group rounded-[2rem] overflow-hidden bg-white shadow-card card-hover relative"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    <button
                      onClick={() =>
                        toggleWishlist(product.id)
                      }
                      className={`absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center heart-btn transition-all shadow-paper ${
                        wishlisted
                          ? 'text-strawberry-500'
                          : 'text-strawberry-300 hover:text-strawberry-500'
                      } ${
                        wishlisted ? 'active' : ''
                      }`}
                      aria-label={
                        wishlisted
                          ? 'Remove from wishlist'
                          : 'Add to wishlist'
                      }
                    >
                      <Heart
                        size={16}
                        className={
                          wishlisted
                            ? 'fill-strawberry-500'
                            : ''
                        }
                      />
                    </button>

                    {/* BADGES */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="inline-block px-2 py-0.5 rounded-2xl text-[10px] font-sans font-bold bg-butter-200 text-butter-800">
                          New
                        </span>
                      )}

                      {product.onSale &&
                        discount > 0 && (
                          <span className="inline-block px-2 py-0.5 rounded-2xl text-[10px] font-sans font-bold bg-coral-500 text-white">
                            -{discount}%
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="product-tag -mt-8 relative z-10 mb-2">
                      <p className="font-sans font-bold text-strawberry-800 text-xs sm:text-sm">
                        {product.name}
                      </p>
                    </div>

                    {product.description && (
                      <p className="font-sans text-[11px] text-strawberry-400 line-clamp-2 mb-2">
                        {product.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className={`font-serif text-lg sm:text-xl font-bold ${
                          product.onSale
                            ? 'text-coral-600'
                            : 'text-strawberry-700'
                        }`}
                      >
                        {product.price}
                      </span>

                      {product.originalPrice && (
                        <span className="font-sans text-xs text-strawberry-300 line-through">
                          {product.originalPrice}
                        </span>
                      )}

                      <button
                        onClick={() =>
                          addToCart(product)
                        }
                        className="ml-auto text-[10px] sm:text-xs font-sans font-bold text-strawberry-500 hover:text-strawberry-600 underline underline-offset-4 decoration-strawberry-300 transition-colors"
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-4xl block mb-3">
              🌱
            </span>

            <p className="font-serif text-lg text-strawberry-800 mb-2">
              No products found
            </p>

            <p className="font-hand text-strawberry-400">
              check back soon — we're always
              adding new pieces!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}