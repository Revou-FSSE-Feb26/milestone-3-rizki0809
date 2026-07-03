import { useState } from 'react';

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Browse products on the home page, open a product to view details, and click "Add to Cart". Once you are ready, go to your cart and click "Proceed to Checkout".',
  },
  {
    q: 'Do I need an account to check out?',
    a: 'Yes. The shopping cart and checkout pages are restricted to logged-in users. Create a session on the Login page before checking out.',
  },
  {
    q: 'Is my cart saved if I close the browser?',
    a: 'Yes, your cart is stored in your browser\'s local storage, so items remain even after you refresh or close the tab.',
  },
  {
    q: 'How can I become an admin?',
    a: 'Admin access is reserved for store managers who can add, edit, and remove products from the Admin Dashboard.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'This demo store simulates checkout and does not process real payments.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
      <p className="mt-2 text-gray-600">Everything you need to know about shopping with RevoShop.</p>

      <div className="mt-8 divide-y divide-gray-200 rounded-xl border border-gray-200">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium text-gray-900">{item.q}</span>
                <span className="text-brand-600">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <p className="px-5 pb-4 text-sm text-gray-600">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
