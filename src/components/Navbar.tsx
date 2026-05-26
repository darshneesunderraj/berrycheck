import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Heart, Menu, X, Search, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useStore, categoryTree } from '../store/useStore';
import logo from '../images/berrycheck-logo.png';

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen, setIsWishlistOpen, setIsSearchOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream-50/90 backdrop-blur-warm shadow-paper py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Berrycheck" className="h-14 sm:h-16 w-auto"/>
        </Link>


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
          {/* Category dropdowns */}
          {categoryTree.map((cat) => (
            <div key={cat.slug} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === cat.slug ? null : cat.slug)}
                onMouseEnter={() => setOpenDropdown(cat.slug)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-sans font-semibold rounded-2xl transition-colors ${
                  location.pathname.startsWith(`/${cat.slug}`)
                    ? 'text-strawberry-600 bg-strawberry-50'
                    : 'text-strawberry-800/70 hover:text-strawberry-600 hover:bg-strawberry-50/50'
                }`}
              >
                {cat.label}
                <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === cat.slug ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {openDropdown === cat.slug && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-3xl shadow-card p-3 animate-fade-in"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={`/${cat.slug}`}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-2xl font-sans font-bold text-sm text-strawberry-700 hover:bg-strawberry-50 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    View All {cat.label}
                  </Link>
                  <div className="h-px bg-strawberry-100 my-1" />
                  {cat.children.map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/${cat.slug}/${sub.slug}`}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-2xl font-sans text-sm text-strawberry-600/70 hover:text-strawberry-600 hover:bg-strawberry-50 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Static links */}
          {[
            { label: 'New In', to: '/new-in' },
            { label: 'Sale', to: '/sale' },
            { label: 'About', to: '/about' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`px-3 py-2 text-sm font-sans font-semibold rounded-2xl transition-colors ${
                location.pathname === item.to
                  ? 'text-strawberry-600 bg-strawberry-50'
                  : 'text-strawberry-800/70 hover:text-strawberry-600 hover:bg-strawberry-50/50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 text-strawberry-700/60 hover:text-strawberry-500 transition-colors"
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} />
          </button>
          <button
            className="p-2 text-strawberry-700/60 hover:text-strawberry-500 transition-colors relative"
            aria-label="Wishlist"
            onClick={() => setIsWishlistOpen(true)}
          >
            <Heart size={20} className={wishlist.length > 0 ? 'fill-strawberry-500 text-strawberry-500' : ''} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-strawberry-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            className="p-2 text-strawberry-700/60 hover:text-strawberry-500 transition-colors relative"
            aria-label="Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-strawberry-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 text-strawberry-700/60"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream-50/95 backdrop-blur-warm border-t border-strawberry-100 px-6 py-4 animate-fade-in max-h-[80vh] overflow-y-auto">
          {categoryTree.map((cat) => (
            <div key={cat.slug} className="mb-2">
              <button
                onClick={() => setOpenDropdown(openDropdown === cat.slug ? null : cat.slug)}
                className="w-full flex items-center justify-between py-3 text-base font-sans font-semibold text-strawberry-800/70 hover:text-strawberry-600 transition-colors"
              >
                {cat.label}
                <ChevronDown size={16} className={`transition-transform ${openDropdown === cat.slug ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === cat.slug && (
                <div className="pl-4 pb-2 animate-fade-in">
                  <Link
                    to={`/${cat.slug}`}
                    className="block py-2 text-sm font-sans font-bold text-strawberry-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    View All
                  </Link>
                  {cat.children.map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/${cat.slug}/${sub.slug}`}
                      className="block py-2 text-sm font-sans text-strawberry-500/70 hover:text-strawberry-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {[
            { label: 'New In', to: '/new-in' },
            { label: 'Sale', to: '/sale' },
            { label: 'About', to: '/about' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="block py-3 text-base font-sans font-semibold text-strawberry-800/70 hover:text-strawberry-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
