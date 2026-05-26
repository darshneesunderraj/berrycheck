import { Home, Sparkles, Heart } from 'lucide-react';

const features = [
  {
    icon: Home,
    title: 'Lived-In Softness',
    description: 'Pre-washed organic cotton that feels like your favorite vintage find from day one.',
    color: 'bg-strawberry-50',
    border: 'border-strawberry-200',
    iconColor: 'text-strawberry-500',
    handwriting: 'so soft!',
    hwRotate: '-3deg',
    image: 'https://images.pexels.com/photos/6035754/pexels-photo-6035754.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    icon: Sparkles,
    title: 'Small-Batch Craft',
    description: 'Each piece is hand-finished in runs of 50 — no two are exactly alike.',
    color: 'bg-sage-50',
    border: 'border-sage-200',
    iconColor: 'text-sage-500',
    handwriting: 'handmade with care',
    hwRotate: '2deg',
    image: 'https://images.pexels.com/photos/6035760/pexels-photo-6035760.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
  {
    icon: Heart,
    title: 'Designed to Last',
    description: 'Reinforced seams, color-fast dyes, and fabrics that get better with every wash.',
    color: 'bg-butter-50',
    border: 'border-butter-200',
    iconColor: 'text-butter-600',
    handwriting: 'built to last',
    hwRotate: '-1deg',
    image: 'https://images.pexels.com/photos/6035764/pexels-photo-6035764.jpeg?auto=compress&cs=tinysrgb&w=500',
  },
];

export default function FeatureCards() {
  return (
    <section className="relative py-20 sm:py-28 bg-cream-50 paper-texture-strong">
      {/* Ribbon divider at top */}
      <div className="ribbon-divider mb-20">
        <span className="font-hand text-2xl text-strawberry-500 bg-cream-50 px-6 relative z-10">
          Made for Real Homes
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group rounded-4xl ${feature.color} border-2 ${feature.border} p-6 card-hover relative overflow-hidden`}
            >
              {/* Image area */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Stiched accent on image */}
                <div className="absolute inset-2 border-2 border-dashed border-white/30 rounded-2xl pointer-events-none" />
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 ${feature.color} border ${feature.border} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={feature.iconColor} size={22} />
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl font-bold text-strawberry-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-strawberry-700/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Handwritten accent */}
              <span
                className="font-hand text-lg text-strawberry-400 mt-4 block"
                style={{ transform: `rotate(${feature.hwRotate})` }}
              >
                {feature.handwriting}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
