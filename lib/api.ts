import type {
  CategoryTreeNode,
  CategoryResponse,
  Product,
  OrderRequest,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://tamasaya.ru/api/laserio';

export async function fetchCategoriesTree(): Promise<CategoryTreeNode[]> {
  const res = await fetch(`${API_BASE}/categories/tree`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchCategory(slug: string): Promise<CategoryResponse> {
  const res = await fetch(`${API_BASE}/categories/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch category');
  return res.json();
}

export async function fetchProduct(slug: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function submitOrder(order: OrderRequest): Promise<void> {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error('Failed to submit order');
}

