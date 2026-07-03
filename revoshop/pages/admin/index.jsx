import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import ProductForm from '@/components/admin/ProductForm';

export default function AdminDashboard() {
  const { user, isReady, isAdmin } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('idle'); // 'idle' | 'create' | 'edit'
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (isReady && !isAdmin) {
      router.replace('/login?reason=admin-required&redirect=/admin');
    }
  }, [isReady, isAdmin, router]);

  useEffect(() => {
    if (!isAdmin) return;
    fetchProducts();
  }, [isAdmin]);

  async function fetchProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to load products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Could not load products.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreate(values) {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to create product');
    }
    await fetchProducts();
    setMode('idle');
  }

  async function handleUpdate(values) {
    const response = await fetch(`/api/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to update product');
    }
    await fetchProducts();
    setMode('idle');
    setEditingProduct(null);
  }

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`)) return;
    const response = await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
    if (response.ok || response.status === 204) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
  }

  if (!isReady || !isAdmin) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-gray-500">
        Checking permissions…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Signed in as {user.username} · manage the RevoShop catalog</p>
        </div>
        {mode === 'idle' && (
          <button
            onClick={() => setMode('create')}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            + Add Product
          </button>
        )}
      </div>

      {mode === 'create' && (
        <div className="mt-6 rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">New Product</h2>
          <ProductForm submitLabel="Create Product" onSubmit={handleCreate} onCancel={() => setMode('idle')} />
        </div>
      )}

      {mode === 'edit' && editingProduct && (
        <div className="mt-6 rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Edit Product #{editingProduct.id}</h2>
          <ProductForm
            initialValues={editingProduct}
            submitLabel="Save Changes"
            onSubmit={handleUpdate}
            onCancel={() => {
              setMode('idle');
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Product</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Price</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  Loading products…
                </td>
              </tr>
            )}
            {!isLoading && error && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-red-600">
                  {error}
                </td>
              </tr>
            )}
            {!isLoading &&
              !error &&
              products.map((product) => (
                <tr key={product.id}>
                  <td className="flex items-center gap-3 px-4 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.title} className="h-10 w-10 flex-shrink-0 rounded object-contain" />
                    <span className="line-clamp-1 font-medium text-gray-900">{product.title}</span>
                  </td>
                  <td className="px-4 py-3 capitalize text-gray-600">{product.category}</td>
                  <td className="px-4 py-3 text-gray-900">${Number(product.price).toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setMode('edit');
                      }}
                      className="mr-3 font-medium text-brand-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            {!isLoading && !error && products.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No products yet. Click "Add Product" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
