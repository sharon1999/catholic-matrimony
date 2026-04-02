"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from './NavLink';
import { UserDropdown } from './UserDropdown';
import { MobileMenu } from './MobileMenu';

export interface NavItem {
  label: string;
  href: string;
}

const guestLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const userLinks: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Matches', href: '/matches' },
  { label: 'Messages', href: '/messages' },
  { label: 'Favorites', href: '/favorites' },
];

const adminLinks: NavItem[] = [
  ...userLinks,
  { label: 'Admin Dashboard', href: '/admin' },
];

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close menu on resize to prevent unusual states when switching orientation/screen sizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const isAuthenticated = status === 'authenticated';
  // Attempt to read role safely from session. Defaults to USER if not defined.
  const userRole = (session?.user as any)?.role || 'USER'; 
  
  const currentLinks = !isAuthenticated
    ? guestLinks
    : userRole === 'ADMIN'
      ? adminLinks
      : userLinks;

  const logoHref = isAuthenticated ? '/dashboard' : '/';

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={logoHref} className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md" aria-label="Home">
              <div className="w-8 h-8 rounded-md bg-rose-600 flex items-center justify-center">
                 <span className="text-white font-bold text-lg leading-none">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 tracking-tight leading-none">
                  St. Joseph's
                </span>
                <span className="text-xs font-medium text-rose-600 leading-tight">
                  Matrimony Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Center */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="flex space-x-1">
              {currentLinks.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : !isAuthenticated ? (
              <>
                <Link 
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                  Log in
                </Link>
                <Link 
                  href="/register"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                  Register
                </Link>
              </>
            ) : (
              <UserDropdown user={session?.user || {}} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        links={currentLinks}
        isAuthenticated={isAuthenticated}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={() => signOut({ callbackUrl: '/login' })}
      />
    </nav>
  );
};
