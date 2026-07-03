import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetchProduct() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('not found');
        const data = await response.json();
        if (!data) throw new Error('not found');
        if (!cancelled) setProduct(data);
      } catch (err) {
        if (!cancelled) setError('Product not found.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function handleAddToCart() {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
          <div className="space-y-4">
            <div className="h-6 w-2/3 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
            <div className="h-24 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg text-gray-700">{error || 'Product not found.'}</p>
        <Link href="/" className="mt-4 inline-block text-brand-600 hover:underline">
          ← Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm text-gray-500 hover:text-brand-600">
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-10 sm:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
        </div>

        <div className="flex flex-col">
          {product.category && (
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              {product.category}
            </span>
          )}
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{product.title}</h1>
          {product.rating && (
            <p className="mt-1 text-sm text-gray-500">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}
          <p className="mt-4 text-3xl font-bold text-gray-900">${Number(product.price).toFixed(2)}</p>
          <p className="mt-4 leading-relaxed text-gray-600">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-md border border-gray-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              {added ? 'Added to cart ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
