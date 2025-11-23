export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  desc_product_count?: number;
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
  price: number;
  description?: string;
  specs?: string;
  doc_url?: string;
  primary_image_url?: string;
  gallery?: string[];
}

export interface CategoryResponse {
  category: Category;
  children?: Category[];
  featured?: Product[];
  products?: Product[];
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface CategoryTreeNode extends Category {
  children?: CategoryTreeNode[];
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface OrderRequest {
  customer: {
    full_name: string;
    company?: string;
    email: string;
    phone: string;
    comment?: string;
  };
  items: {
    product_id: number;
    qty: number;
  }[];
}

