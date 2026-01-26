import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DisclaimerPage from "./pages/DisclaimerPage";
import Services from "./pages/Services";
import Programs from "./pages/Programs";
import AutismLoader from "./components/Loader/AutismLoader";
import { ArrowUp } from 'lucide-react';
import Pricing from './pages/Pricing';
import ClientIntakeForm from './pages/ClientIntakeForm';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import { supabase } from './lib/supabase';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import PaymentPage from './pages/PaymentPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const [adminUser, setAdminUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if current route is admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Check auth status on load
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setAdminUser(session?.user || null);
      setCheckingAuth(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAdminUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Initialize AOS only for non-admin routes
  useEffect(() => {
    if (!isAdminRoute) {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
      });
    }
  }, [isAdminRoute]);

  // Handle scroll events only for non-admin routes
  useEffect(() => {
    if (isAdminRoute) return; // Don't add scroll listener for admin routes

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminRoute]);

  // Show loader on route changes (except admin routes)
  useEffect(() => {
    // Don't show loader for admin routes (they're usually fast)
    if (isAdminRoute) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Reinitialize AOS after loading
      if (!isAdminRoute) {
        setTimeout(() => AOS.refresh(), 100);
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [location.pathname, isAdminRoute]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-sage"></div>
      </div>
    );
  }

  // Show loader during navigation (only for non-admin routes)
  if (isLoading && !isAdminRoute) {
    return <AutismLoader />;
  }

  return (
    <div className="App relative min-h-screen flex flex-col">
      {/* Only show Navbar on non-admin routes */}
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-grow">
        <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/service" element={<Services />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/consultation" element={<ClientIntakeForm />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<PaymentPage />} />
          {/* Admin Routes - No Navbar/Footer */}
          <Route path="/admin/login" element={
            adminUser ? 
            <Navigate to="/admin/dashboard" /> : 
            <AdminLogin onLogin={setAdminUser} />
          } />
          
          <Route path="/admin/dashboard" element={
            adminUser ? 
            <AdminDashboard /> : 
            <Navigate to="/admin/login" />
          } />
        </Routes>
      </main>

      {/* Only show Footer on non-admin routes */}
      {!isAdminRoute && <Footer />}

      {/* Only show Scroll to Top button on non-admin routes */}
      {!isAdminRoute && showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-40 p-3 rounded-full bg-brand-navy text-white shadow-lg transition-all duration-300 hover:bg-brand-sage transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;