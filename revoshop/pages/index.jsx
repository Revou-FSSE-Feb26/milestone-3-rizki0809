import { useEffect, useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';

const CATEGORY_ALL = 'all';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(CATEGORY_ALL);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to load products');
        const data = await response.json();
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError('We could not load products right now. Please try again later.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return [CATEGORY_ALL, ...Array.from(unique)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (category === CATEGORY_ALL) return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-12 text-white sm:px-10">
        <h1 className="text-3xl font-bold sm:text-4xl">Welcome to RevoShop</h1>
        <p className="mt-2 max-w-xl text-brand-50">
          Discover everyday essentials at honest prices — curated picks across electronics, fashion, and home.
        </p>
      </section>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">All Products</h2>
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition ${
                  category === c
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-gray-300 text-gray-600 hover:border-brand-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">{error}</div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
