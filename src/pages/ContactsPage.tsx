import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguageStore } from '@/store/languageStore';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactsPage = () => {
  const { t } = useLanguageStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('nav.contacts')}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Телефон</h3>
                <a href="tel:+74951234567" className="text-accent hover:underline">
                  +7 (495) 123-45-67
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a href="mailto:info@lasercomponents.ru" className="text-accent hover:underline">
                  info@lasercomponents.ru
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Адрес</h3>
                <p className="text-muted-foreground">
                  г. Москва, ул. Примерная, д. 123
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Режим работы</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Понедельник - Пятница:</span>
                <span className="font-medium">9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Суббота - Воскресенье:</span>
                <span className="font-medium">Выходной</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactsPage;
