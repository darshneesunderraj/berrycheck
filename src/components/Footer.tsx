import { useState } from 'react';
import { Instagram, Mail, Heart, ArrowRight } from 'lucide-react';

const instagramImages = [
  'https://images.pexels.com/photos/6347660/pexels-photo-6347660.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/6347663/pexels-photo-6347663.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/7752675/pexels-photo-7752675.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/7752677/pexels-photo-7752677.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/6035776/pexels-photo-6035776.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/6035778/pexels-photo-6035778.jpeg?auto=compress&cs=tinysrgb&w=200',
];

const loveNotes = [
  { name: 'Clara M.', note: 'The softest napkins I have ever owned. My kitchen feels like a magazine spread!', location: 'Portland, OR' },
  { name: 'Yuki T.', note: 'Berrycheck throws are my guilty pleasure. I now own four and counting.', location: 'Brooklyn, NY' },
  { name: 'Emma L.', note: 'The gingham runner transformed our dining table. Guests always ask about it!', location: 'Austin, TX' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-strawberry-900 text-white overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 paper-texture opacity-10" />

      {/* Scalloped top edge */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
          <path
            d="M0,40 Q30,80 60,40 T120,40 T180,40 T240,40 T300,40 T360,40 T420,40 T480,40 T540,40 T600,40 T660,40 T720,40 T780,40 T840,40 T900,40 T960,40 T1020,40 T1080,40 T1140,40 T1200,40 T1260,40 T1320,40 T1380,40 T1440,40 L1440,0 L0,0 Z"
            fill="#3d1525"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* Newsletter */}
        <div className="text-center mb-20">
          <span className="font-hand text-2xl text-strawberry-300 block mb-3">Stay in the loop</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Join the Berrycheck Letter
          </h3>
          <p className="font-sans text-strawberry-200/60 max-w-md mx-auto mb-8">
            New drops, styling tips, and cozy inspiration — delivered like a love letter to your inbox.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 bg-sage-500/20 border border-sage-400/30 text-sage-300 px-6 py-3 rounded-3xl font-sans">
              <Heart size={16} className="text-sage-400" />
              You're in! Welcome to the Berrycheck family.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-strawberry-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3.5 bg-white/10 border border-strawberry-400/30 rounded-3xl text-white placeholder-strawberry-400/50 font-sans text-sm focus:outline-none focus:border-strawberry-300 focus:ring-2 focus:ring-strawberry-300/20 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="group w-full sm:w-auto bg-strawberry-400 hover:bg-strawberry-300 text-strawberry-900 font-sans font-bold px-6 py-3.5 rounded-3xl transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>

        {/* Instagram gallery */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-strawberry-300 font-sans font-bold text-sm">
              <Instagram size={16} />
              @berrycheck
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {instagramImages.map((img, i) => (
              <a
                key={i}
                href="#"
                className="group aspect-square rounded-2xl overflow-hidden relative"
              >
                <img
                  src={img}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-strawberry-400/0 group-hover:bg-strawberry-400/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Instagram size={20} className="text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Customer love notes */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="font-hand text-2xl text-strawberry-300">love notes from you</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loveNotes.map((note, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 card-hover"
                style={{ transform: `rotate(${i === 0 ? '-1deg' : i === 2 ? '1deg' : '0deg'})` }}
              >
                <p className="font-sans text-sm text-strawberry-100/80 leading-relaxed mb-4 italic">
                  "{note.note}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-sans font-bold text-white text-sm">{note.name}</p>
                    <p className="font-sans text-xs text-strawberry-400/60">{note.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-strawberry-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom links & info */}
        <div className="border-t border-white/10 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="font-serif font-bold text-white mb-4">Shop</h4>
              {['Kitchen Textiles', 'Home Living', 'New Arrivals', 'Sale', 'Gift Cards'].map((link) => (
                <a key={link} href="#" className="block font-sans text-sm text-strawberry-200/50 hover:text-strawberry-300 transition-colors py-1">
                  {link}
                </a>
              ))}
            </div>
            <div>
              <h4 className="font-serif font-bold text-white mb-4">About</h4>
              {['Our Story', 'Sustainability', 'Craft Process', 'Press', 'Careers'].map((link) => (
                <a key={link} href="#" className="block font-sans text-sm text-strawberry-200/50 hover:text-strawberry-300 transition-colors py-1">
                  {link}
                </a>
              ))}
            </div>
            <div>
              <h4 className="font-serif font-bold text-white mb-4">Help</h4>
              {['FAQ', 'Shipping', 'Returns', 'Size Guide', 'Contact'].map((link) => (
                <a key={link} href="#" className="block font-sans text-sm text-strawberry-200/50 hover:text-strawberry-300 transition-colors py-1">
                  {link}
                </a>
              ))}
            </div>
            <div>
              <h4 className="font-serif font-bold text-white mb-4">Community</h4>
              {['Instagram', 'Pinterest', 'Journal', 'Affiliates'].map((link) => (
                <a key={link} href="#" className="block font-sans text-sm text-strawberry-200/50 hover:text-strawberry-300 transition-colors py-1">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-strawberry-300">Berrycheck</span>
              <span className="font-hand text-xs text-strawberry-400/50 -rotate-6">est. 2024</span>
            </div>
            <p className="font-sans text-xs text-strawberry-400/40">
              Made with love. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
