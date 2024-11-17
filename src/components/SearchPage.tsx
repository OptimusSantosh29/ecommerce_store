// src/components/SearchPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../context/ProductContext';

export default function SearchPage() {
  const location = useLocation();
  const products = location.state?.products;

  if (!products) {
    return <div>Invalid search query</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}