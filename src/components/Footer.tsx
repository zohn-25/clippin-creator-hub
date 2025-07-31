import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Zap } from 'lucide-react';

export const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'How it Works', href: '#' },
        { label: 'For Creators', href: '#' },
        { label: 'For Brands', href: '#' },
        { label: 'Success Stories', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press Kit', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="relative mt-20">
      {/* Background with border */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="h-8 w-8 text-primary" />
                <span className="text-2xl font-orbitron font-bold gradient-text">
                  Clippin
                </span>
              </div>
              
              <p className="text-muted-foreground mb-6 max-w-md">
                Revolutionizing the creator economy with performance-based payouts. 
                Connect, create, and earn based on real results.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-orbitron font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-muted-foreground text-sm mb-4 md:mb-0">
                © 2024 Clippin. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};