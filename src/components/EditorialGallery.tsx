const galleryItems = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/6035770/pexels-photo-6035770.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Morning coffee, linen napkins, soft light.',
    layout: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/6035772/pexels-photo-6035772.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Sunday baking in Berrycheck aprons.',
    layout: '',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/6035774/pexels-photo-6035774.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Gingham picnic, golden hour.',
    layout: '',
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/7752670/pexels-photo-7752670.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'The corner that makes you smile.',
    layout: '',
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/7752672/pexels-photo-7752672.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Layered textures, warm tones.',
    layout: 'md:col-span-2',
  },
];

export default function EditorialGallery() {
  return (
    <section className="relative py-20 sm:py-28 bg-cream-50 paper-texture overflow-hidden">
      {/* Decorative floating elements */}
      <span className="absolute top-16 left-10 text-3xl float-decoration animate-float opacity-40">🍓</span>
      <span className="absolute bottom-20 right-12 text-2xl float-decoration animate-float-slow opacity-40">🌸</span>
      <span className="absolute top-1/2 right-8 text-xl float-decoration animate-float-delay opacity-30">🌿</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-hand text-xl text-coral-500 block mb-2">editorial</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-strawberry-900 mb-4">
            Everyday Art
          </h2>
          <p className="font-sans text-strawberry-600/60 max-w-md mx-auto">
            A glimpse into the spaces where Berrycheck lives — real homes, real moments, real joy.
          </p>
        </div>

        {/* Editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer ${item.layout}`}
            >
              <div className="aspect-square w-full">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-strawberry-900/50 via-strawberry-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Paper-frame effect */}
              <div className="absolute inset-3 border-4 border-white/20 rounded-2xl pointer-events-none group-hover:border-white/40 transition-colors duration-500" />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-hand text-lg text-white" style={{ transform: 'rotate(-1deg)' }}>
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Handwritten divider */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-strawberry-200 to-transparent" />
          <span className="font-hand text-xl text-strawberry-400">~ everyday art ~</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-strawberry-200 to-transparent" />
        </div>
      </div>
    </section>
  );
}
