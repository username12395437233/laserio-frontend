import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Контакты — LASER components',
  description: 'Контактная информация LASER components',
};

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Контакты', href: '/contacts' },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Контакты</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Свяжитесь с нами</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <a href="mailto:info@example.com" className="hover:text-accent transition-colors">
                info@example.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <a href="tel:+74951234567" className="hover:text-accent transition-colors">
                +7 (495) 123-45-67
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Адрес</h2>
          <p className="text-muted-foreground">
            Москва, ул. Примерная, д. 1
          </p>
        </div>
      </div>
    </div>
  );
}

