import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/store/languageStore';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const { t } = useLanguageStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Лазерные и оптоэлектронные компоненты
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Профессиональные решения для тепловизионных систем, навигации и измерительного оборудования
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  {t('nav.catalog')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  {t('nav.categoryMap')}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-accent rounded-full"></div>
                </div>
                <h3 className="font-semibold mb-2">Широкий ассортимент</h3>
                <p className="text-sm text-muted-foreground">
                  Более 1000 наименований компонентов от ведущих производителей
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-accent rounded-full"></div>
                </div>
                <h3 className="font-semibold mb-2">Техническая поддержка</h3>
                <p className="text-sm text-muted-foreground">
                  Квалифицированная помощь в выборе компонентов
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-accent rounded-full"></div>
                </div>
                <h3 className="font-semibold mb-2">Быстрая доставка</h3>
                <p className="text-sm text-muted-foreground">
                  Оперативная отгрузка со склада в Москве
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Начните работу с каталогом</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Воспользуйтесь картой каталога для быстрого поиска нужных компонентов или начните просмотр с основных категорий
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/categories">
                <Button size="lg">
                  Карта каталога
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
