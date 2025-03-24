
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/');
    }
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleDashboardClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        {
          'bg-zinc-900/90 backdrop-blur-lg shadow-md': isScrolled,
          'bg-transparent': !isScrolled,
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400"
            >
              trisul.ai
            </motion.span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#about">About</NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="button-hover"
              >
                <Button 
                  variant="outline" 
                  className="rounded-md border-zinc-700 hover:border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-800/50 transition-all duration-300"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="button-hover"
              >
                <Button 
                  variant="outline" 
                  className="rounded-md border-zinc-700 hover:border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-800/50 transition-all duration-300"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="button-hover"
              >
                <Button 
                  variant="outline" 
                  className="rounded-md border-zinc-700 hover:border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-800/50 transition-all duration-300"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="button-pulse"
              >
                <Button 
                  className="rounded-md bg-blue-600 hover:bg-blue-700 shadow-glow shadow-blue-600/20 transition-all duration-300 hover:shadow-blue-600/40 hover:-translate-y-1"
                  onClick={handleLoginClick}
                >
                  Get Started <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="md:hidden text-foreground p-2 rounded-full hover:bg-zinc-800/50 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-zinc-300" />
          ) : (
            <Menu className="h-6 w-6 text-zinc-300" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-zinc-900 flex flex-col"
          >
            <div className="flex flex-col h-full p-6 pt-24">
              <nav className="flex flex-col space-y-6 text-center">
                <MobileNavLink href="#features" onClick={toggleMobileMenu}>Features</MobileNavLink>
                <MobileNavLink href="#testimonials" onClick={toggleMobileMenu}>Testimonials</MobileNavLink>
                <MobileNavLink href="#pricing" onClick={toggleMobileMenu}>Pricing</MobileNavLink>
                <MobileNavLink href="#about" onClick={toggleMobileMenu}>About</MobileNavLink>
                <div className="border-t border-zinc-800 pt-6 mt-6">
                  {user ? (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full mb-4 border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800/50 transition-all duration-300"
                        onClick={() => {
                          toggleMobileMenu();
                          navigate('/dashboard');
                        }}
                      >
                        Dashboard
                      </Button>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 shadow-glow shadow-blue-600/20 transition-all duration-300 hover:shadow-blue-600/40 hover:-translate-y-1"
                        onClick={() => {
                          toggleMobileMenu();
                          handleLogout();
                        }}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full mb-4 border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800/50 transition-all duration-300"
                        onClick={() => {
                          toggleMobileMenu();
                          navigate('/auth');
                        }}
                      >
                        Login
                      </Button>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 shadow-glow shadow-blue-600/20 transition-all duration-300 hover:shadow-blue-600/40 hover:-translate-y-1"
                        onClick={() => {
                          toggleMobileMenu();
                          navigate('/auth');
                        }}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    className="font-medium text-zinc-400 hover:text-zinc-200 transition-colors px-4 py-2 rounded-md hover:bg-zinc-800/50"
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
  <motion.a
    href={href}
    onClick={onClick}
    className="text-2xl font-display font-medium py-2 text-zinc-300 hover:text-white transition-colors"
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

export default Navbar;
