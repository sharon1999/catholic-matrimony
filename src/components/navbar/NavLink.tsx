"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  isMobile?: boolean;
}

export const NavLink = ({ href, label, onClick, isMobile }: NavLinkProps) => {
  const pathname = usePathname();
  // Basic active check. Can be enhanced for nested routes if needed.
  const isActive = pathname === href || (pathname?.startsWith(href) && href !== '/');

  const baseClasses = "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2";
  
  const desktopClasses = `px-4 py-2 rounded-md text-sm font-medium ${
    isActive 
      ? 'bg-rose-50 text-rose-700' 
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
  }`;
  
  const mobileClasses = `block px-4 py-3 rounded-md text-base font-medium ${
    isActive 
      ? 'bg-rose-50 text-rose-700 border-l-4 border-rose-600' 
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
  }`;

  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
};
