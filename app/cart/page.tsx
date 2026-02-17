'use client';

import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { optimizeCart, type CartOptimizationSuggestion } from '@/lib/cartOptimizer';
import { eventLogger } from '@/lib/eventLog';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCart();
  const [suggestions, setSuggestions] = useState<CartOptimizationSuggestion[]>([]);

  useEffect(() => {
    if (items.length > 0) {
      const optimizations = optimizeCart(items);
      setSuggestions(optimizations);
      eventLogger.log('cart_viewed', { itemCount: items.length, total: getTotal() });
    }
  }, [items, getTotal]);

  const cartProducts = items.map((item) => ({
    ...item,
    product: products.find((p) => p.sku === item.sku)!,
  }));

  const subtotal = getTotal();
  const shipping = subtotal >= 25000 ? 0 : 2500;
  const total = subtotal + shipping;

  const handleAddSuggestion = (sku: string) => {
    updateQuantity(sku, 1);
    eventLogger.log('cart_suggestion_added', { sku });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">
            ¿No sabes qué elegir? Prueba nuestro asistente de bienestar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assistant"
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Usar Asistente
            </Link>
            <Link
              href="/"
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartProducts.map(({ product, quantity }) => (
            <div
              key={product.sku}
              className="bg-white rounded-lg border border-gray-200 p-4 flex items-center space-x-4"
            >
              {/* Product image */}
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💊</span>
              </div>

              {/* Product info */}
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2 py-0.5 text-xs font-semibold text-primary-700 bg-primary-50 rounded mb-1">
                  {product.category.toUpperCase()}
                </span>
                <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.brand}</p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  ${product.priceArs.toLocaleString('es-AR')}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(product.sku, quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                >
                  −
                </button>
                <span className="font-bold text-gray-900 w-8 text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.sku, quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeItem(product.sku)}
                className="text-red-600 hover:text-red-800 p-2"
                aria-label="Eliminar producto"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Summary and Suggestions */}
        <div className="space-y-6">
          {/* Optimization suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Sugerencias del Asistente
              </h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-white rounded p-3 border border-blue-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">
                          {suggestion.product.name}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">{suggestion.reason}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900 ml-2">
                        ${suggestion.product.priceArs.toLocaleString('es-AR')}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddSuggestion(suggestion.product.sku)}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded transition-colors text-sm"
                    >
                      Agregar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Resumen del Pedido</h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Envío</span>
                <span>{shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-AR')}`}</span>
              </div>
              {subtotal < 25000 && (
                <p className="text-xs text-amber-600">
                  Agrega ${(25000 - subtotal).toLocaleString('es-AR')} más para envío gratis
                </p>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Simular Checkout
            </Link>

            <Link
              href="/"
              className="block w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors text-center"
            >
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
