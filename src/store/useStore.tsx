import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';

import sageTableLinen from '../images/sage-table-linen.png';
import linendrape from '../images/LinenDrape.png';
import blossomcloth from '../images/blossomcloth.png';
import bakernapkin from '../images/bakers-cloth-napkin-set.jpg';
import cherrymit from '../images/Cherry-Oven-Mitt-Duo.jpg';
import ginghamtablerun from '../images/Gingham-Table-Runner.jpg';
import strawberryapron from '../images/Strawberry-Fields-Apron.jpg';
import skybluetablerunner from '../images/sky-blue-table-runner.jpg';

import berryCheckPlaceMatSet from '../images/berrylacemat.jpg';
import pastelLinenNapkins from '../images/pastellinen.jpg';
import retroPicnicSet from '../images/Retro Picnic Set.jpg';
import berryGinghamSet from '../images/Berry Gingham Set.jpg';
import handKnittedWoolMittens from '../images/hand-knitted-wool.jpg';
import handmadeDishCloths from '../images/handmade-pot-holders.jpg';
import vintageStripeTeaTowel from '../images/vintage-stripe.jpg';
import bookOfHerbsTeaTowel from '../images/pot-holder.jpg';
import tablerun from '../images/tablerunberry.png';

import comingSoon from '../images/coming-soon.png';

export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  tag: string;
  image: string;
  category: string;
  subcategory: string;
  isNew?: boolean;
  onSale?: boolean;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

export const categoryTree = [
  {
    slug: 'kitchen',
    label: 'Kitchen & Dining',
    children: [
      { slug: 'runners', label: 'Runners' },
      { slug: 'placemats', label: 'Place Mats' },
      { slug: 'napkins', label: 'Napkins' },
      { slug: 'aprons', label: 'Aprons' },
      { slug: 'mittens', label: 'Mittens' },
      { slug: 'pot-holders', label: 'Pot Holders' },
      { slug: 'dish-cloth', label: 'Dish Cloth' },
      { slug: 'tea-towels', label: 'Tea Towels' },
      { slug: 'table-cloth', label: 'Table Cloth' },
    ],
  },
  {
    slug: 'living',
    label: 'Home Living',
    children: [
      { slug: 'curtains', label: 'Curtains & Drapes' },
      { slug: 'wall-hangings', label: 'Wall Hangings & Tapestries' },
      { slug: 'rugs', label: 'Rugs & Carpets' },
      { slug: 'throws', label: 'Throws & Blankets' },
      { slug: 'table-runners', label: 'Table Runners' },
      { slug: 'coasters', label: 'Coasters' },
    ],
  },
];

export const allProducts: Product[] = [
  {
    id: 1,
    name: 'Strawberry Fields Apron',
    price: '₹1899',
    originalPrice: '₹2299',
    tag: 'Bestseller',
    image: strawberryapron,
    category: 'kitchen',
    subcategory: 'aprons',
    onSale: true,
    description:
      'A sweet yellow and blue strawberry apron with vintage cottagecore vibes.',
  },

  {
    id: 2,
    name: 'Gingham Table Runner',
    price: '₹2199',
    tag: 'New',
    image: ginghamtablerun,
    category: 'kitchen',
    subcategory: 'runners',
    isNew: true,
    description:
      'Blue gingham table runner with soft sunflower-yellow accents.',
  },

  {
    id: 3,
    name: "Baker's Cloth Napkin Set",
    price: '₹1499',
    tag: 'Organic',
    image: bakernapkin,
    category: 'kitchen',
    subcategory: 'napkins',
    description:
      'Set of organic cotton napkins in butter-yellow and sky-blue tones.',
  },

  {
    id: 4,
    name: 'Cherry Oven Mitt Duo',
    price: '₹1299',
    originalPrice: '₹1799',
    tag: 'Limited',
    image: cherrymit,
    category: 'kitchen',
    subcategory: 'mittens',
    onSale: true,
    description:
      'Cherry-print oven mitts with quilted blue lining and yellow trims.',
  },

  {
    id: 5,
    name: 'Sage Garden Throw',
    price: '₹2499',
    tag: 'Coming Soon',
    image: comingSoon,
    category: 'living',
    subcategory: 'throws',
    description:
      'Chunky knit throw with soft pastel blue and warm yellow woven textures.',
  },

  {
    id: 6,
    name: 'Buttercup Cushion Cover',
    price: '₹1799',
    tag: 'New In',
    image: comingSoon,
    category: 'living',
    subcategory: 'throws',
    isNew: true,
    description:
      'Sunshine-yellow cushion with delicate floral stitching and blue borders.',
  },

  {
    id: 7,
    name: 'Picnic Blanket — Berry',
    price: '₹2299',
    originalPrice: '₹2499',
    tag: 'Bestseller',
    image: comingSoon,
    category: 'living',
    subcategory: 'throws',
    onSale: true,
    description:
      'Berry picnic blanket with classic blue gingham and yellow details.',
  },

  {
    id: 8,
    name: 'Cloud-Soft Bed Throw',
    price: '₹2499',
    tag: 'Coming Soon',
    image: comingSoon,
    category: 'living',
    subcategory: 'throws',
    isNew: true,
    description:
      'Luxury pastel blue throw with buttery-yellow soft textures.',
  },

  {
    id: 9,
    name: 'Berry Gingham Set',
    price: '₹2399',
    tag: 'Popular',
    image: berryGinghamSet,
    category: 'kitchen',
    subcategory: 'aprons',
    isNew: true,
    description:
      'Complete berry gingham set with blue ribbons and yellow highlights.',
  },

  {
    id: 10,
    name: 'Pastel Napkin Bundle',
    price: '₹999',
    originalPrice: '₹1299',
    tag: 'New',
    image: pastelLinenNapkins,
    category: 'kitchen',
    subcategory: 'napkins',
    onSale: true,
    isNew: true,
    description:
      'Pastel napkins featuring dreamy yellow and powder-blue shades.',
  },

  {
    id: 11,
    name: 'Sage Table Linen',
    price: '₹2199',
    tag: 'Organic',
    image: sageTableLinen,
    category: 'kitchen',
    subcategory: 'table-cloth',
    description:
      'Elegant sage tablecloth with soft blue embroidery and yellow stitching.',
  },

  {
    id: 12,
    name: 'Cherry Blossom Throw',
    price: '₹2299',
    originalPrice: '₹2499',
    tag: 'Spring',
    image: comingSoon,
    category: 'living',
    subcategory: 'throws',
    onSale: true,
    description:
      'Pink blossom throw featuring pastel blue florals and yellow accents.',
  },

  {
    id: 13,
    name: 'Butter Cushion Pair',
    price: '₹2099',
    tag: 'Cozy',
    image: comingSoon,
    category: 'living',
    subcategory: 'throws',
    isNew: true,
    description:
      'Warm butter-yellow cushions with soft blue stitched detailing.',
  },

  {
    id: 14,
    name: 'Sky Blue Runner',
    price: '₹1899',
    tag: 'New',
    image: skybluetablerunner,
    category: 'kitchen',
    subcategory: 'runners',
    isNew: true,
    description:
      'Cool sky-blue linen runner with handcrafted yellow edging.',
  },

  {
    id: 15,
    name: 'Floral Apron',
    price: '₹1699',
    originalPrice: '₹2099',
    tag: 'Bestseller',
    image: comingSoon,
    category: 'kitchen',
    subcategory: 'aprons',
    onSale: true,
    description:
      'Vintage floral apron with blue blossoms and sunflower-yellow prints.',
  },

  {
    id: 16,
    name: 'Retro Picnic Set',
    price: '₹2499',
    tag: 'Coming Soon',
    image: retroPicnicSet,
    category: 'kitchen',
    subcategory: 'napkins',
    description:
      'Retro picnic essentials featuring blue checks and yellow accents.',
  },

  {
    id: 17,
    name: 'Coral Dish Cloth Set',
    price: '₹899',
    originalPrice: '₹1199',
    tag: 'Essential',
    image: comingSoon,
    category: 'kitchen',
    subcategory: 'dish-cloth',
    onSale: true,
    description:
      'Soft coral dish cloths with subtle yellow and blue striped borders.',
  },

  {
    id: 18,
    name: 'Rustic Linen Place Mat',
    price: '₹1299',
    tag: 'Organic',
    image: comingSoon,
    category: 'kitchen',
    subcategory: 'placemats',
    isNew: true,
    description:
      'Natural linen placemat with soft woven blue and yellow textures.',
  },

  {
    id: 19,
    name: 'Berry Check Place Mat Set',
    price: '₹1999',
    tag: 'New',
    image: berryCheckPlaceMatSet,
    category: 'kitchen',
    subcategory: 'placemats',
    isNew: true,
    description:
      'Berry check place mats with cheerful yellow and sky-blue details.',
  },

  {
    id: 20,
    name: 'Quilted Pot Holder',
    price: '₹799',
    tag: 'Essential',
    image: comingSoon,
    category: 'kitchen',
    subcategory: 'pot-holders',
    description:
      'Minimal quilted pot holder with yellow trim and blue lining.',
  },

  {
    id: 21,
    name: 'Sunflower Pot Holder Pair',
    price: '₹1299',
    originalPrice: '₹1599',
    tag: 'Sale',
    image: handmadeDishCloths,
    category: 'kitchen',
    subcategory: 'pot-holders',
    onSale: true,
    description:
      'Sunflower-yellow pot holders with beautiful blue contrast piping.',
  },

  {
    id: 22,
    name: 'Striped Tea Towel Trio',
    price: '₹1199',
    tag: 'Bestseller',
    image: vintageStripeTeaTowel,
    category: 'kitchen',
    subcategory: 'tea-towels',
    description:
      'Cotton tea towels in candy yellow, sage, and powder-blue stripes.',
  },

  {
    id: 23,
    name: 'Herb Garden Tea Towel',
    price: '₹699',
    tag: 'New',
    image: bookOfHerbsTeaTowel,
    category: 'kitchen',
    subcategory: 'tea-towels',
    isNew: true,
    description:
      'Illustrated herb towel with blue sketches and yellow floral accents.',
  },

  {
    id: 24,
    name: 'Blossom Table Cloth',
    price: '₹2499',
    tag: 'Luxury',
    image: blossomcloth,
    category: 'kitchen',
    subcategory: 'table-cloth',
    isNew: true,
    description:
      'Large blossom-print table cloth with pastel blue and yellow tones.',
  },

  {
    id: 25,
    name: 'Heritage Mittens',
    price: '₹1499',
    tag: 'Coming Soon',
    image: handKnittedWoolMittens,
    category: 'kitchen',
    subcategory: 'mittens',
    isNew: true,
    description:
      'Cozy knitted mittens with heritage blue and mustard-yellow patterns.',
  },

  {
    id: 26,
    name: 'Sage Dish Cloth Pack',
    price: '₹799',
    tag: 'Organic',
    image: handmadeDishCloths,
    category: 'kitchen',
    subcategory: 'dish-cloth',
    description:
      'Eco-friendly sage dish cloths with soft blue woven details.',
  },

  {
    id: 27,
    name: 'Meadow Sheer Curtains',
    price: '₹2499',
    tag: 'Coming Soon',
    image: comingSoon,
    category: 'living',
    subcategory: 'curtains',
    isNew: true,
    description:
      'Soft sheer curtains with dreamy blue floral and yellow meadow patterns.',
  },

  {
    id: 28,
    name: 'Linen Drape — Natural',
    price: '₹2399',
    tag: 'Luxury',
    image: linendrape,
    category: 'living',
    subcategory: 'curtains',
    description:
      'Natural linen drapes with warm yellow stitching and blue textures.',
  },

  {
    id: 29,
    name: 'Woven Wall Tapestry',
    price: '₹2099',
    tag: 'Artisan',
    image: comingSoon,
    category: 'living',
    subcategory: 'wall-hangings',
    isNew: true,
    description:
      'Handwoven tapestry featuring earthy blue and yellow cottage tones.',
  },

  {
    id: 30,
    name: 'Macrame Wall Hanging',
    price: '₹1899',
    tag: 'Boho',
    image: comingSoon,
    category: 'living',
    subcategory: 'wall-hangings',
    description:
      'Minimal macrame hanging with soft blue and mustard-yellow textures.',
  },
];

interface StoreState {
  cart: CartItem[];
  wishlist: number[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;

  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;

  wishlistProducts: Product[];

  cartCount: number;
  cartTotal: string;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  searchResults: Product[];
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  }, []);

  const isInWishlist = useCallback(
    (id: number) => wishlist.includes(id),
    [wishlist]
  );

  const wishlistProducts = useMemo(
    () => allProducts.filter((p) => wishlist.includes(p.id)),
    [wishlist]
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = useMemo(() => {
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(
        item.price.replace('₹', '').replace(',', '')
      );

      return sum + price * item.quantity;
    }, 0);

    return `₹${total.toFixed(0)}`;
  }, [cart]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const q = searchQuery.toLowerCase();

    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,

        addToCart,
        removeFromCart,
        updateQuantity,

        toggleWishlist,
        isInWishlist,

        wishlistProducts,

        cartCount,
        cartTotal,

        isCartOpen,
        setIsCartOpen,

        isWishlistOpen,
        setIsWishlistOpen,

        isSearchOpen,
        setIsSearchOpen,

        searchQuery,
        setSearchQuery,

        searchResults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);

  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }

  return ctx;
}
