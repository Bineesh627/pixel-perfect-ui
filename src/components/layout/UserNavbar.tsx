import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function UserNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/predictions', label: 'All Predictions' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg text-foreground">TruthGuard</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{user?.username}</span>
                </div>
                {user?.isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium ${
                    isActive(link.href) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 text-sm pt-2 border-t border-border">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.username}</span>
                  </div>
                  {user?.isAdmin && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex gap-2 pt-2 border-t border-border">
                  <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
