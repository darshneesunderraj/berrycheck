import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store/useStore';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KitchenSection from './components/KitchenSection';
import LivingSection from './components/LivingSection';
import FeatureCards from './components/FeatureCards';
import MixMatchGrid from './components/MixMatchGrid';
import EditorialGallery from './components/EditorialGallery';
import Footer from './components/Footer';
import StickyCart from './components/StickyCart';
import SearchOverlay from './components/SearchOverlay';
import WishlistDrawer from './components/WishlistDrawer';
import CategoryPage from './components/CategoryPage';
import NewInPage from './components/NewInPage';
import SalePage from './components/SalePage';
import AboutPage from './components/AboutPage';

function HomePage() {
  return (
    <>
      <Hero />
      <KitchenSection />
      <LivingSection />
      <FeatureCards />
      <MixMatchGrid />
      <EditorialGallery />
      <Footer />
    </>
  );
}

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-cream-50 font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:category" element={<CategoryPage />} />
            <Route path="/:category/:subcategory" element={<CategoryPage />} />
            <Route path="/new-in" element={<NewInPage />} />
            <Route path="/sale" element={<SalePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <StickyCart />
          <SearchOverlay />
          <WishlistDrawer />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
