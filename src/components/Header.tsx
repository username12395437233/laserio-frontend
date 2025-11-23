import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Facebook, Mail, Phone } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useLanguageStore } from '@/store/languageStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { language, setLanguage, t } = useLanguageStore();

  return (
    <header className="sticky top-0 z-50 bg-header text-header-foreground shadow-md">
      {/* Top bar */}
      <div className="border-b border-header-foreground/10">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <a href="mailto:info@example.com" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">{t('common.email')}</span>
            </a>
            <span>/</span>
            <a href="tel:+74951234567" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{t('common.phone')}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Facebook className="w-4 h-4" />
            </a>
            <Button
              variant="ghost"
              size="sm"
              className="text-header-foreground hover:bg-header-foreground/10 h-7 px-2"
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            >
              {language.toUpperCase()}
            </Button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-32 h-12 bg-header-foreground/10 rounded flex items-center justify-center font-bold text-lg">
              LASER
            </div>
          </Link>

          {/* Cart button */}
          <div className="flex items-center gap-3">
            <Link to="/cart">
              <Button variant="outline" className="bg-header-foreground text-primary border-0 hover:bg-header-foreground/90 relative">
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span>{t('common.cart')}</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-header-foreground/10 rounded-full px-4 py-2 w-64">
              <Search className="w-4 h-4" />
              <Input
                type="text"
                placeholder={t('common.search')}
                className="bg-transparent border-0 focus-visible:ring-0 text-header-foreground placeholder:text-header-foreground/50 h-6 p-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-header-foreground/10">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-6 py-3 text-sm flex-wrap">
            <li>
              <Link to="/" className="hover:opacity-80 transition-opacity">
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:opacity-80 transition-opacity">
                {t('nav.categoryMap')}
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="hover:opacity-80 transition-opacity">
                {t('nav.catalog')}
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="hover:opacity-80 transition-opacity">
                {t('nav.contacts')}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
