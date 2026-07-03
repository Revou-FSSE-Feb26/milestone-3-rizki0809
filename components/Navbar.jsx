import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const links = [
  { href: '/', label: 'Shop' },
  { href: '/promotion', label: 'Promotions' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand-600">
            <span className="inline-block rounded-lg bg-brand-500 px-2 py-1 text-white">R</span>
            RevoShop
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition hover:text-brand-600 ${
                  router.pathname === link.href ? 'text-brand-600' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className={`text-sm font-medium transition hover:text-brand-600 ${
                  router.pathname.startsWith('/admin') ? 'text-brand-600' : 'text-gray-600'
                }`}
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative text-gray-700 hover:text-brand-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M2.25 3a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3 3 0 002.905 2.23h6.988a3 3 0 002.905-2.23l1.386-5.194A.75.75 0 0019.98 7.5H6.878l-.396-1.486A1.876 1.876 0 004.658 4.5H2.25zM7.5 21a1.125 1.125 0 100-2.25A1.125 1.125 0 007.5 21zm9.75 0a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[11px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  Hi, <span className="font-semibold">{user.username}</span>
                  {isAdmin && <span className="ml-1 rounded bg-brand-100 px-1.5 py-0.5 text-xs text-brand-700">admin</span>}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
              >
                Login
              </Link>
            )}

            <button
              className="md:hidden text-gray-700"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col gap-3 pb-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700">
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link href="/admin" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700">
                Admin Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <button onClick={handleLogout} className="text-left text-sm font-medium text-gray-700">
                Logout ({user.username})
              </button>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-brand-600">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
