import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, User, ChevronDown, Zap, Video, Edit } from 'lucide-react';
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

  const roleConfig = {
    creator: { icon: User, label: 'Creator', profileName: 'Creator Profile' },
    brand: { icon: User, label: 'Brand', profileName: 'Brand Profile' },
    'big-creator': { icon: Video, label: 'Big Creator', profileName: 'Big Creator Profile' },
    editor: { icon: Edit, label: 'Editor', profileName: 'Editor Profile' }
  };

  const currentRoleConfig = roleConfig[role];

  const getNextRole = () => {
    const roles: (keyof typeof roleConfig)[] = ['creator', 'brand', 'big-creator', 'editor'];
    const currentIndex = roles.indexOf(role);
    const nextIndex = (currentIndex + 1) % roles.length;
    return roles[nextIndex];
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/campaigns', label: 'Campaigns' },
    { path: '/clip-hub', label: 'Clip Hub' },
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
                    <currentRoleConfig.icon className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">{currentRoleConfig.profileName}</span>
                    <span className="sm:hidden">{currentRoleConfig.label}</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card w-56">
                  <div className="px-2 py-1.5 text-sm font-medium text-foreground/60">
                    Switch Role
                  </div>
                  {Object.entries(roleConfig).map(([roleKey, config]) => (
                    <DropdownMenuItem
                      key={roleKey}
                      onClick={() => switchRole(roleKey as any)}
                      className={`flex items-center ${role === roleKey ? 'bg-accent' : ''}`}
                    >
                      <config.icon className="h-4 w-4 mr-2" />
                      <span>{config.label}</span>
                      {role === roleKey && <span className="ml-auto text-primary">✓</span>}
                    </DropdownMenuItem>
                  ))}
                  <div className="border-t border-border/50 mt-1 pt-1">
                    <DropdownMenuItem>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Logout
                    </DropdownMenuItem>
                  </div>
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