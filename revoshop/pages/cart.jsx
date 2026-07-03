import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, isReady, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();

  if (isReady && items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">Browse the shop and add some products to your cart.</p>
        <Link href="/" className="mt-6 inline-block rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
      <p className="mt-1 text-sm text-gray-600">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>

      <div className="mt-8 divide-y divide-gray-200 rounded-xl border border-gray-200">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.title} className="h-16 w-16 flex-shrink-0 object-contain" />
            <div className="flex-1">
              <Link href={`/product/${item.id}`} className="line-clamp-1 text-sm font-medium text-gray-900 hover:text-brand-600">
                {item.title}
              </Link>
              <p className="text-sm text-gray-500">${Number(item.price).toFixed(2)} each</p>
            </div>
            <div className="flex items-center rounded-md border border-gray-300">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-2 py-1 text-gray-600 hover:bg-gray-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 text-gray-600 hover:bg-gray-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <p className="w-20 text-right text-sm font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-400 hover:text-red-600"
              aria-label="Remove item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0c.844.027 1.526.734 1.526 1.58v.113a49.19 49.19 0 00-6.325 0v-.113c0-.846.682-1.553 1.526-1.58zm-2.293 6.267a.75.75 0 00-1.5.062l.375 12a.75.75 0 101.499-.046l-.374-12zm5.834.062a.75.75 0 10-1.5-.062l-.375 12a.75.75 0 101.5.046l.375-12z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="text-lg font-bold text-gray-900">Total: ${totalPrice.toFixed(2)}</div>
        <Link
          href="/checkout"
          className="rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
