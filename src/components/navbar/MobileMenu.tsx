import { NavLink } from './NavLink';
import { NavItem } from './Navbar';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  links: NavItem[];
  isAuthenticated: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const MobileMenu = ({ isOpen, links, isAuthenticated, onClose, onLogout }: MobileMenuProps) => {
  return (
    <div 
      className={`fixed inset-0 z-40 transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Overlay backdrop */}
      <div 
        className={`fixed inset-0 bg-gray-900/50 transition-opacity duration-300 ${
           isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white shadow-xl flex flex-col z-50 transform transition-transform duration-300">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 rounded-md bg-rose-600 flex items-center justify-center">
               <span className="text-white font-bold text-lg leading-none">S</span>
            </div>
            <span className="text-lg font-bold text-gray-900">St. Joseph&apos;s</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {links.map((link) => (
            <NavLink 
              key={link.href} 
              href={link.href} 
              label={link.label}
              onClick={onClose}
              isMobile
            />
          ))}
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50/50">
          {!isAuthenticated ? (
            <div className="space-y-3">
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center justify-center w-full px-4 py-2.5 text-rose-700 bg-rose-50 border border-rose-200 rounded-lg font-medium hover:bg-rose-100 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="flex items-center justify-center w-full px-4 py-2.5 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
               <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Account Options</div>
               <NavLink href="/profile" label="View Profile" onClick={onClose} isMobile />
               <NavLink href="/profile/edit" label="Edit Profile" onClick={onClose} isMobile />
               <NavLink href="/subscription" label="Subscription" onClick={onClose} isMobile />
               <button 
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="flex items-center w-full mt-4 px-4 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
               >
                 Logout
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
