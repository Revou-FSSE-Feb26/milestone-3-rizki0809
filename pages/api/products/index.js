import { getProducts, createProduct } from '@/lib/db';

function isAdmin(req) {
  return req.cookies?.revoshop_token && req.cookies?.revoshop_role === 'admin';
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const products = getProducts();
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    if (!isAdmin(req)) {
      return res.status(401).json({ message: 'Admin authentication required' });
    }
    const { title, price, description, category, image } = req.body || {};
    if (!title || price === undefined || price === null) {
      return res.status(400).json({ message: 'title and price are required' });
    }
    const product = createProduct({ title, price, description, category, image });
    return res.status(201).json(product);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
