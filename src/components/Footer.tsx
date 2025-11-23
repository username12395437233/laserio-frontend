import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/store/languageStore';

export const Footer = () => {
  const { t } = useLanguageStore();

  return (
    <footer className="bg-header text-header-foreground mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact info */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.contacts')}</h3>
            <div className="text-sm opacity-80 space-y-1">
              <p>{t('footer.address')}</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">{t('common.email')}</h3>
            <div className="text-sm opacity-80 space-y-2">
              <Link to="#" className="block hover:opacity-60 transition-opacity">
                {t('footer.delivery')}
              </Link>
              <Link to="#" className="block hover:opacity-60 transition-opacity">
                {t('footer.terms')}
              </Link>
              <Link to="#" className="block hover:opacity-60 transition-opacity">
                {t('footer.privacy')}
              </Link>
            </div>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="w-32 h-32 bg-header-foreground/10 rounded-full flex items-center justify-center font-bold text-xl">
              LASER
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
