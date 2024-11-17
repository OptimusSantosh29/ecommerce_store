import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

export default function FeaturedProducts() {
  const { filteredProducts, activeCategory } = useProducts();
  const { addToCart } = useCart();

  const categoryTitles = {
    'all': 'Featured Products',
    'new-arrivals': 'New Arrivals',
    'women': "Women's Collection",
    'men': "Men's Collection",
    'accessories': 'Accessories',
    'sale': 'On Sale'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {categoryTitles[activeCategory]}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
              />
              {(product.isNew || product.isOnSale) && (
                <div className="absolute top-4 left-4">
                  {product.isNew && (
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      New
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium ml-2">
                      Sale
                    </span>
                  )}
                </div>
              )}
              <div className="absolute top-4 right-4 space-y-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  <Heart size={20} />
                </button>
                <button 
                  onClick={() => addToCart(product)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">{product.category}</p>
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <p className={`text-lg font-semibold ${product.isOnSale ? 'text-red-600' : 'text-indigo-600'}`}>
                  ${product.isOnSale ? product.salePrice : product.price}
                </p>
                {product.isOnSale && (
                  <p className="text-sm text-gray-500 line-through">${product.price}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}