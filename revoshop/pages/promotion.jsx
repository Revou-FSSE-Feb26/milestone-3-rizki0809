const promotions = [
  {
    title: 'Summer Sale',
    detail: 'Get 20% off all electronics through the end of the month. Use code SUMMER20 at checkout.',
    badge: '20% OFF',
  },
  {
    title: 'Buy One Get One — Accessories',
    detail: 'Purchase any accessory and get a second one of equal or lesser value free.',
    badge: 'BOGO',
  },
  {
    title: 'Free Shipping Over $50',
    detail: 'Orders over $50 ship free anywhere. No code required, applied automatically at checkout.',
    badge: 'FREE SHIP',
  },
  {
    title: 'New Customer Discount',
    detail: 'First-time shoppers save 10% on their first order when they create an account.',
    badge: '10% OFF',
  },
];

export default function PromotionPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Promotions</h1>
      <p className="mt-2 text-gray-600">Current deals and offers running at RevoShop.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {promotions.map((promo) => (
          <div key={promo.title} className="rounded-xl border border-gray-200 p-6">
            <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
              {promo.badge}
            </span>
            <h2 className="mt-3 text-lg font-semibold text-gray-900">{promo.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{promo.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
