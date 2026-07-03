import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirect = typeof router.query.redirect === 'string' ? router.query.redirect : '/';
  const reason = router.query.reason;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await login(username.trim(), password);
      router.push(user.role === 'admin' ? '/admin' : redirect);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function fillDemo(role) {
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('johnd');
      setPassword('m38rmF$');
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">Log in to RevoShop</h1>
      <p className="mt-1 text-sm text-gray-600">
        Access your cart and checkout. Admins can also manage products.
      </p>

      {reason === 'admin-required' && (
        <div className="mt-4 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-800">
          That page requires an admin account. Please log in as an admin.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="e.g. johnd"
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600">
        <p className="font-semibold text-gray-700">Demo credentials</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => fillDemo('admin')}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-left hover:border-brand-400"
          >
            Admin — admin / admin123
          </button>
          <button
            onClick={() => fillDemo('user')}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-left hover:border-brand-400"
          >
            User (FakeStoreAPI) — johnd / m38rmF$
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/" className="text-brand-600 hover:underline">
          ← Back to shop
        </Link>
      </p>
    </div>
  );
}
