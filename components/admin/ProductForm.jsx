import { useState } from 'react';

const emptyForm = { title: '', price: '', description: '', category: '', image: '' };

export default function ProductForm({ initialValues, onSubmit, onCancel, submitLabel }) {
  const [form, setForm] = useState({ ...emptyForm, ...initialValues });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim()) {
      setError('Please provide a product title.');
      return;
    }

    if (form.price === '' || Number.isNaN(Number(form.price)) || Number(form.price) < 0) {
      setError('Please provide a valid price (0 or greater).');
      return;
    }

    if (!form.description.trim()) {
      setError('Please provide a product description.');
      return;
    }

    if (form.description.trim().length < 10) {
      setError('Description should be at least 10 characters.');
      return;
    }

    if (!form.category.trim()) {
      setError('Please provide a category.');
      return;
    }

    if (!form.image.trim()) {
      setError('Please provide an image URL.');
      return;
    }

    if (!/^https?:\/\/.+/i.test(form.image.trim())) {
      setError('Image URL must start with http:// or https://');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        category: form.category.trim(),
        image: form.image.trim(),
      });
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          value={form.title}
          onChange={handleChange('title')}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          placeholder="Product title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={form.price}
          onChange={handleChange('price')}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          placeholder="0.00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          value={form.category}
          onChange={handleChange('category')}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          placeholder="e.g. electronics"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          value={form.image}
          onChange={handleChange('image')}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          placeholder="https://..."
        />
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={form.description}
          onChange={handleChange('description')}
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          placeholder="Short product description"
        />
      </div>

      {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}

      <div className="sm:col-span-2 flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {isSubmitting ? 'Saving…' : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
