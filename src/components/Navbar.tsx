// src/components/Navbar.tsx
import React, { useState } from "react";
import { Search, ShoppingCart, Menu, X, Heart, User } from "lucide-react";
import { Category, useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { products } = useProducts();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    if (filteredProducts.length > 0) {
      navigate("/search", { state: { products: filteredProducts } });
    }
  };

  const navLinks = [
    { category: "new-arrivals" as Category, label: "New Arrivals" },
    { category: "women" as Category, label: "Women" },
    { category: "men" as Category, label: "Men" },
    { category: "accessories" as Category, label: "Accessories" },
    { category: "sale" as Category, label: "Sale" },
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
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              ModernStore
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.category}
                to={`/${link.category}`}
                className="text-lg font-medium text-gray-900 hover:text-indigo-600"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="hidden sm:flex items-center space-x-4"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 min-w-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Search size={20} />
              </button>
            </form>
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Heart size={20} />
            </div>
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
