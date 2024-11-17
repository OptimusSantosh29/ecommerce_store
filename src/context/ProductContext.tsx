import React, { createContext, useContext, useState } from 'react';

export type Category = 'all' | 'women' | 'men' | 'accessories' | 'new-arrivals' | 'sale';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  tags: Category[];
  isNew?: boolean;
  isOnSale?: boolean;
  salePrice?: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Classic White Sneakers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80',
    category: 'Shoes',
    tags: ['accessories'],
    isNew: true
  },
  {
    id: 2,
    name: 'Leather Crossbody Bag',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80',
    category: 'Accessories',
    tags: ['accessories', 'women']
  },
  {
    id: 3,
    name: 'Denim Jacket',
    price: 149.99,
    salePrice: 99.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80',
    category: 'Outerwear',
    tags: ['men'],
    isOnSale: true
  },
  {
    id: 4,
    name: 'Summer Dress',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80',
    category: 'Dresses',
    tags: ['women', 'new-arrivals']
  },
  {
    id: 5,
    name: 'Men\'s Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80',
    category: 'Accessories',
    tags: ['accessories', 'men', 'new-arrivals']
  },
  {
    id: 6,
    name: 'Women\'s Blazer',
    price: 189.99,
    salePrice: 149.99,
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80',
    category: 'Outerwear',
    tags: ['women', 'sale'],
    isOnSale: true
  }
];

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : activeCategory === 'new-arrivals'
    ? products.filter(product => product.isNew)
    : activeCategory === 'sale'
    ? products.filter(product => product.isOnSale)
    : products.filter(product => product.tags.includes(activeCategory));

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts,
      activeCategory,
      setActiveCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}