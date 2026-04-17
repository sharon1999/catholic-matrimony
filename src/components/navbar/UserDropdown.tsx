/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FiUser, FiChevronDown, FiSettings, FiCreditCard, FiLogOut } from 'react-icons/fi';

interface UserDropdownProps {
  user: {
    name?: string | null;
    image?: string | null;
  }
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 p-1 pl-2 rounded-full hover:bg-gray-50 transition-colors border border-transparent"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
      >
        <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate hidden lg:block">
          {user.name || 'Account'}
        </span>
        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center overflow-hidden ring-2 ring-white">
          {user.image ? (
            <img src={user.image} alt={user.name || 'User'} className="w-full h-full object-cover" />
          ) : (
            <FiUser className="w-4 h-4" />
          )}
        </div>
        <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 ring-1 ring-black ring-opacity-5 z-50 transform opacity-100 scale-100 transition-all origin-top-right"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <div className="px-4 py-3 border-b border-gray-50 mb-1">
            <p className="text-sm text-gray-500">Signed in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">{user.name || 'User'}</p>
          </div>

          <div className="py-1">
            <Link 
              href="/profile" 
              className="group flex flex-row items-center px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700 transition-colors" 
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              <FiUser className="mr-3 h-4 w-4 text-gray-400 group-hover:text-rose-500" />
              View Profile
            </Link>
            <Link 
              href="/profile/edit" 
              className="group flex flex-row items-center px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700 transition-colors" 
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              <FiSettings className="mr-3 h-4 w-4 text-gray-400 group-hover:text-rose-500" />
              Edit Profile
            </Link>
            <Link 
              href="/subscription" 
              className="group flex flex-row items-center px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700 transition-colors" 
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              <FiCreditCard className="mr-3 h-4 w-4 text-gray-400 group-hover:text-rose-500" />
              Subscription
            </Link>
          </div>

          <div className="border-t border-gray-50 mt-1 pt-1">
            <button 
              onClick={handleLogout}
              className="group flex w-full flex-row items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              role="menuitem"
            >
              <FiLogOut className="mr-3 h-4 w-4 text-red-500" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
