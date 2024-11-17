import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, User } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

type Category = 'all' | 'women' | 'men' | 'accessories' | 'new-arrivals' | 'sale';

interface NavLinkProps {
  category: Category;
  label: string;
  onClick: (category: Category) => void;
  isActive: boolean;
}

const NavLink = ({ category, label, onClick, isActive }: NavLinkProps) => (
  <Link
    to={category === 'all' ? '/' : `/${category}`}
    onClick={() => onClick(category)}
    className={`${
      isActive 
        ? 'text-indigo-600 font-medium'
        : 'text-gray-600 hover:text-indigo-600'
    } transition-colors`}
  >
    {label}
  </Link>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeCategory, setActiveCategory } = useProducts();
  const { cart } = useCart();
  const navigate = useNavigate();

  const navLinks = [
    { category: 'new-arrivals' as Category, label: 'New Arrivals' },
    { category: 'women' as Category, label: 'Women' },
    { category: 'men' as Category, label: 'Men' },
    { category: 'accessories' as Category, label: 'Accessories' },
    { category: 'sale' as Category, label: 'Sale' },
  ];

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button
              className="sm:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link 
              to="/"
              onClick={() => setActiveCategory('all')}
              className="text-2xl font-bold text-indigo-600"
            >
              ModernStore
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.category}
                category={link.category}
                label={link.label}
                onClick={setActiveCategory}
                isActive={activeCategory === link.category}
              />
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none focus:outline-none ml-2 w-40"
              />
            </div>
            <button className="p-2 hover:text-indigo-600">
              <Heart size={24} />
            </button>
            <button className="p-2 hover:text-indigo-600">
              <User size={24} />
            </button>
            <Link to="/cart" className="p-2 hover:text-indigo-600 relative">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.category}
                to={`/${link.category}`}
                onClick={() => {
                  setActiveCategory(link.category);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 ${
                  activeCategory === link.category
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}