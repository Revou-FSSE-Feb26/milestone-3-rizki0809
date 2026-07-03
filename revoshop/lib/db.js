import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');

function readAll() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeAll(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

export function getProducts() {
  return readAll();
}

export function getProductById(id) {
  const products = readAll();
  return products.find((p) => p.id === Number(id)) || null;
}

export function createProduct(product) {
  const products = readAll();
  const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = {
    id: nextId,
    title: product.title || 'Untitled product',
    price: Number(product.price) || 0,
    description: product.description || '',
    category: product.category || 'general',
    image: product.image || `https://picsum.photos/seed/revoshop${nextId}/600/600`,
  };
  products.push(newProduct);
  writeAll(products);
  return newProduct;
}

export function updateProduct(id, updates) {
  const products = readAll();
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;
  products[index] = {
    ...products[index],
    ...updates,
    id: products[index].id,
    price: updates.price !== undefined ? Number(updates.price) : products[index].price,
  };
  writeAll(products);
  return products[index];
}

export function deleteProduct(id) {
  const products = readAll();
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) return false;
  products.splice(index, 1);
  writeAll(products);
  return true;
}
