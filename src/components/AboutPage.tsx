import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Leaf, Heart, Palette, Truck, ShieldCheck } from 'lucide-react';

const faqs = [
  {
    q: 'What materials do you use?',
    a: 'We use 100% organic cotton, responsibly sourced linen, and recycled packaging. Every textile is free from harmful dyes and certified safe.',
  },
  {
    q: 'Where are your textiles made?',
    a: 'Our pieces are designed with love and woven by skilled artisans in family-run mills we have partnered with since day one.',
  },
  {
    q: 'How do I care for my textiles?',
    a: 'Machine wash cold, tumble dry low. Our fabrics get softer with every wash — that\'s the magic of natural fibers. Full care guides ship with every order.',
  },
  {
    q: 'What\'s your return policy?',
    a: '30-day no-questions-asked returns. If it doesn\'t spark joy, send it back. We even cover return shipping on domestic orders.',
  },
  {
    q: 'Do you offer gift wrapping?',
    a: 'Yes! Select gift wrap at checkout and we\'ll wrap it in our signature berry tissue with a handwritten note card. Free on orders over Rs. 1,999.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Domestic orders arrive in 3-5 business days. We ship carbon-neutral on every order.',
  },
];

const values = [
  { icon: Leaf, title: 'Planet First', desc: 'Organic fibers, recycled packaging, carbon-neutral shipping. Every choice matters.' },
  { icon: Heart, title: 'Made with Love', desc: 'Hand-finished details, small-batch production, and a whole lot of heart.' },
  { icon: Palette, title: 'Pattern Play', desc: 'Gingham, florals, solids — mix and match freely. There are no rules.' },
  { icon: Truck, title: 'Free Shipping', desc: 'On all domestic orders over Rs. 1,999. Fast, tracked, and carbon-neutral.' },
  { icon: ShieldCheck, title: '30-Day Returns', desc: 'No questions asked. If it doesn\'t spark joy, we\'ll take it back.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-strawberry-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-sans font-bold text-strawberry-800 group-hover:text-strawberry-600 transition-colors pr-4">{q}</span>
        <ChevronDown
          size={18}
          className={`text-strawberry-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${open ? 'max-h-48 pb-5' : 'max-h-0'}`}>
        <p className="font-sans text-sm text-strawberry-600/70 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50 paper-texture">
      {/* Header */}
      <div className="relative pt-28 pb-16 gingham-sage overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50/50 via-cream-50/30 to-strawberry-50/40" />
        <div className="absolute top-16 left-10 text-3xl float-decoration animate-float opacity-50">🌿</div>
        <div className="absolute bottom-8 right-12 text-2xl float-decoration animate-float-slow opacity-50">🧵</div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-strawberry-500 font-sans font-bold text-sm hover:text-strawberry-600 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <span className="inline-block px-3 py-1 bg-sage-100 text-sage-700 text-xs font-sans font-bold rounded-2xl mb-4">Our Story</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-strawberry-900 mb-3 text-shadow-warm">
            About Berrycheck
          </h1>
          <p className="font-sans text-strawberry-600/60 max-w-lg">
            We make textiles that feel like home — soft, sustainable, and made to be mixed, matched, and loved for years.
          </p>
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
        {/* Our Story */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-hand text-xl text-strawberry-400 block mb-2">
              our story
            </span>

            <h2 className="font-serif text-3xl font-bold text-strawberry-900 mb-8">
              Bringing Joy Into Everyday Homes
            </h2>

            <div className="bg-white rounded-4xl p-8 sm:p-10 shadow-paper">
              <p className="font-sans text-base sm:text-lg text-strawberry-700 leading-relaxed mb-6">
                In a world of plain neutrals and predictable interiors, Berry Check
                brings back the charm of colour, playfulness, and personality through
                thoughtfully designed home textiles. Inspired by sunlit fruit markets,
                vintage picnic checks, candy-striped summers, and the happiness found
                in everyday moments, the brand creates pieces that instantly brighten a
                space and lift a mood.
              </p>

              <p className="font-sans text-sm sm:text-base text-strawberry-500 leading-relaxed">
                From bold checks and cheerful stripes to juicy fruit prints, every
                collection is designed to make homes feel more alive, expressive, and
                welcoming. Berry Check celebrates the idea that textiles are not just
                dcor they are emotions woven into daily living.
              </p>
            </div>
          </div>
        </section>

        {/* Our values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="font-hand text-xl text-sage-500 block mb-2">what we stand for</span>
            <h2 className="font-serif text-3xl font-bold text-strawberry-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-4xl p-6 shadow-card card-hover text-center group"
              >
                <div className="w-12 h-12 bg-sage-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-sage-100 transition-colors">
                  <v.icon size={22} className="text-sage-500" />
                </div>
                <h3 className="font-sans font-bold text-strawberry-800 text-sm mb-2">{v.title}</h3>
                <p className="font-sans text-[11px] text-strawberry-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ accordion */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="font-hand text-xl text-butter-500 block mb-2">we get asked a lot</span>
            <h2 className="font-serif text-3xl font-bold text-strawberry-900">FAQ</h2>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-4xl p-6 sm:p-8 shadow-card">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <p className="font-hand text-2xl text-strawberry-400 mb-6" style={{ transform: 'rotate(-1deg)' }}>
            Ready to make your home cozier?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/kitchen"
              className="group inline-flex items-center gap-2 bg-strawberry-500 hover:bg-strawberry-600 text-white font-sans font-bold px-8 py-4 rounded-5xl shadow-warm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Shop Kitchen
            </Link>
            <Link
              to="/living"
              className="group inline-flex items-center gap-2 bg-cream-50 hover:bg-butter-50 text-strawberry-700 font-sans font-bold px-8 py-4 rounded-5xl border-2 border-strawberry-200 hover:border-strawberry-300 transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Living
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
