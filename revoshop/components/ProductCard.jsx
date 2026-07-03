import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-48 items-center justify-center bg-gray-50 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.category && (
          <span className="text-xs uppercase tracking-wide text-brand-600">{product.category}</span>
        )}
        <h3 className="line-clamp-2 text-sm font-medium text-gray-900">{product.title}</h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900">${Number(product.price).toFixed(2)}</span>
          <span className="text-xs font-medium text-brand-600 opacity-0 transition group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
