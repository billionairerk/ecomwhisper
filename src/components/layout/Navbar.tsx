
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        {
          'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-subtle': isScrolled,
          'bg-transparent': !isScrolled,
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              ecomWhisper
            </span>
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
          <Button variant="outline" className="rounded-full">
            Login
          </Button>
          <Button className="rounded-full">
            Get Started <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white dark:bg-black transform transition-transform duration-300 ease-in-out',
          {
            'translate-x-0': isMobileMenuOpen,
            'translate-x-full': !isMobileMenuOpen,
          }
        )}
      >
        <div className="flex flex-col h-full p-6 pt-24">
          <nav className="flex flex-col space-y-6 text-center">
            <MobileNavLink href="#features" onClick={toggleMobileMenu}>Features</MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={toggleMobileMenu}>Testimonials</MobileNavLink>
            <MobileNavLink href="#pricing" onClick={toggleMobileMenu}>Pricing</MobileNavLink>
            <MobileNavLink href="#about" onClick={toggleMobileMenu}>About</MobileNavLink>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-6">
              <Button variant="outline" className="w-full mb-4">
                Login
              </Button>
              <Button className="w-full">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="font-medium text-foreground/80 hover:text-foreground transition-colors px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-2xl font-display font-medium py-2"
  >
    {children}
  </a>
);

export default Navbar;
