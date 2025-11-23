import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LaserIO - Laser & Optoelectronic Components',
  description: 'Browse our catalog of laser and optoelectronic components',
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Laser & Optoelectronic Components
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover our comprehensive catalog of high-quality components
        </p>
        <Link
          href="/categories"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Browse Catalog
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Wide Selection</h2>
          <p className="text-gray-600">
            Thousands of products from leading manufacturers
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Quality Assured</h2>
          <p className="text-gray-600">
            All products meet industry standards and specifications
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Expert Support</h2>
          <p className="text-gray-600">
            Our team is ready to help you find the right solution
          </p>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <Link
          href="/categories"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition font-semibold"
        >
          Explore Catalog
        </Link>
      </section>
    </div>
  );
}
