import React from 'react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Subscribe to our newsletter</h2>
          <p className="mt-4 text-lg text-gray-600">
            Get the latest updates on new products and upcoming sales.
          </p>
          <div className="mt-8 flex max-w-md mx-auto items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 min-w-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700">
              Subscribe
              <Send className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}