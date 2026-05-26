import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const floatingItems = [
  { emoji: '🍓', top: '12%', left: '8%', size: 'text-4xl', delay: 'animate-float', rotate: '-12deg' },
  { emoji: '🌸', top: '20%', right: '10%', size: 'text-3xl', delay: 'animate-float-slow', rotate: '8deg' },
  { emoji: '🍒', top: '60%', left: '5%', size: 'text-2xl', delay: 'animate-float-delay', rotate: '15deg' },
  { emoji: '🌿', top: '70%', right: '8%', size: 'text-3xl', delay: 'animate-float', rotate: '-8deg' },
  { emoji: '🫐', bottom: '25%', left: '15%', size: 'text-2xl', delay: 'animate-float-slow', rotate: '5deg' },
  { emoji: '🧺', top: '35%', right: '18%', size: 'text-3xl', delay: 'animate-float-delay', rotate: '-5deg' },
  { emoji: '🍃', bottom: '35%', right: '20%', size: 'text-2xl', delay: 'animate-float', rotate: '10deg' },
  { emoji: '🪷', top: '45%', left: '18%', size: 'text-xl', delay: 'animate-float-slow', rotate: '-15deg' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gingham-pink">
      {/* Background paper texture */}
      <div className="absolute inset-0 paper-texture" />

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-strawberry-50/60 via-cream-50/40 to-butter-50/50" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-peach-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-butter-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-10 w-48 h-48 bg-sky-200/20 rounded-full blur-2xl" />

      {/* Floating decorations */}
      {floatingItems.map((item, i) => (
        <span
          key={i}
          className={`absolute float-decoration ${item.size} ${item.delay} opacity-60`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            transform: item.rotate ? `rotate(${item.rotate})` : undefined,
          }}
        >
          {item.emoji}
        </span>
      ))}

      {/* Hero content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Handwritten accent */}
          <p className="font-hand text-xl sm:text-2xl text-sage-500 mb-4 animate-fade-up">
            Pattern first. Boring never.
          </p>

          {/* Main headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-strawberry-900 leading-[1.1] mb-6 animate-fade-up text-shadow-warm">
            Color lives here.
          </h1>

          {/* Subtext */}
          <p className="font-sans text-lg sm:text-xl text-strawberry-700/70 max-w-xl mb-10 animate-fade-up leading-relaxed">
            Soft furnishings with big personality. Berrycheck brings playful prints back home.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-up">
            <Link
              to="/kitchen"
              className="group inline-flex items-center gap-2 bg-strawberry-500 hover:bg-strawberry-600 text-white font-sans font-bold px-8 py-4 rounded-5xl shadow-warm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Shop Kitchen
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/living"
              className="group inline-flex items-center gap-2 bg-cream-50 hover:bg-butter-50 text-strawberry-700 font-sans font-bold px-8 py-4 rounded-5xl border-2 border-strawberry-200 hover:border-strawberry-300 transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Living
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-12 animate-fade-up">
            {[
              { icon: '🧵', text: 'Handcrafted Quality' },
              { icon: '🌱', text: 'Organic Cotton' },
              { icon: '💝', text: 'Made with Love' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-sm text-strawberry-600/60 font-sans">
                <span className="text-lg">{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scalloped bottom edge */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
          <path
            d="M0,40 Q30,0 60,40 T120,40 T180,40 T240,40 T300,40 T360,40 T420,40 T480,40 T540,40 T600,40 T660,40 T720,40 T780,40 T840,40 T900,40 T960,40 T1020,40 T1080,40 T1140,40 T1200,40 T1260,40 T1320,40 T1380,40 T1440,40 L1440,80 L0,80 Z"
            fill="#fffef9"
          />
        </svg>
      </div>
    </section>
  );
}
