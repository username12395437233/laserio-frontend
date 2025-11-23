const API_BASE = 'https://tamasaya.ru/api/laserio';

export interface Category {
  id: number;
  name: string;
  slug: string;
  sort_order?: number;
  desc_product_count?: number;
  children?: Category[];
  products_preview?: ProductPreview[];
}

export interface ProductPreview {
  name: string;
  slug: string;
  primary_image_url?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price?: number;
  primary_image_url?: string;
  gallery?: string[];
  content_html?: string;
  specs_html?: string;
  doc_url?: string;
  has_docs?: boolean;
}

export interface CategoryResponse {
  category: Category;
  children?: Category[];
  featured?: Product[];
  products?: Product[];
  pagination?: {
    current_page: number;
    total_pages: number;
    total_items: number;
  };
}

export const api = {
  async getCategoryTree(): Promise<Category[]> {
    const response = await fetch(`${API_BASE}/categories/tree`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error('Failed to fetch category tree');
    return response.json();
  },

  async getCategory(slug: string, params?: { sort?: string; page?: number }): Promise<CategoryResponse> {
    const queryParams = new URLSearchParams();
    if (params?.sort) queryParams.set('sort', params.sort);
    if (params?.page) queryParams.set('page', params.page.toString());
    
    const url = `${API_BASE}/categories/${slug}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url, {
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  },

  async getProduct(slug: string): Promise<Product> {
    const response = await fetch(`${API_BASE}/products/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async createOrder(data: {
    customer: {
      fullName: string;
      company?: string;
      email: string;
      phone: string;
      comment?: string;
    };
    items: Array<{ product_id: number; qty: number }>;
  }): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      return await response.json();
    } catch (error) {
      // Fallback to mailto if endpoint doesn't exist
      throw error;
    }
  },
};
