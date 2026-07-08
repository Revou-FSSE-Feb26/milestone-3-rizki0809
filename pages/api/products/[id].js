import { getProductById, updateProduct, deleteProduct } from '@/lib/db';

function isAdmin(req) {
  return req.cookies?.revoshop_token && req.cookies?.revoshop_role === 'admin';
}

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = getProductById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  }

  if (req.method === 'PUT') {
    if (!isAdmin(req)) {
      return res.status(401).json({ message: 'Admin authentication required' });
    }
    const updated = updateProduct(id, req.body || {});
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    if (!isAdmin(req)) {
      return res.status(401).json({ message: 'Admin authentication required' });
    }
    const ok = deleteProduct(id);
    if (!ok) return res.status(404).json({ message: 'Product not found' });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
