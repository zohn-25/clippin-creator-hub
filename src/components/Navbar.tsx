import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, User, ChevronDown, Zap } from 'lucide-react';
import { useRole } from '@/hooks/useRole';
import { WalletModal } from './WalletModal';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Navbar = () => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const { role, switchRole } = useRole();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/campaigns', label: 'Campaigns' },
    { path: '/clips-hub', label: 'Clip Hub' },
    { path: '/why-choose-us', label: 'Why Choose Us' },
    { path: '/contact-us', label: 'Contact Us' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-orbitron font-bold gradient-text">
                Clippin
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-rajdhani font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Wallet Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsWalletOpen(true)}
                className="glow-button bg-gradient-card border-white/20 hover:border-primary/50"
              >
                <Wallet className="h-4 w-4 mr-2" />
                💰
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-card border-white/20 hover:border-primary/50"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span className="capitalize">{role}</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card">
                  <DropdownMenuItem
                    onClick={() => switchRole(role === 'creator' ? 'brand' : 'creator')}
                  >
                    Switch to {role === 'creator' ? 'Brand' : 'Creator'}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        role={role}
      />
    </>
  );
};