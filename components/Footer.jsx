import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} RevoShop. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/promotion" className="hover:text-brand-600">Promotions</Link>
            <Link href="/faq" className="hover:text-brand-600">FAQ</Link>
            <Link href="/login" className="hover:text-brand-600">Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
