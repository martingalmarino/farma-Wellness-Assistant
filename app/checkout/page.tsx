'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { eventLogger } from '@/lib/eventLog';

export default function CheckoutPage() {
  const { items, clearCart, getTotal } = useCart();
  const [orderNumber] = useState(`FQ-${Date.now().toString().slice(-8)}`);
  const [enableReminder, setEnableReminder] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      eventLogger.log('checkout_simulated', {
        orderNumber,
        itemCount: items.length,
        total: getTotal(),
      });
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartProducts = items.map((item) => ({
    ...item,
    product: products.find((p) => p.sku === item.sku)!,
  }));

  const total = getTotal();

  // Calculate suggested repurchase date (30 days from now for supplements)
  const repurchaseDate = new Date();
  repurchaseDate.setDate(repurchaseDate.getDate() + 30);

  const handleComplete = () => {
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Orden Confirmada!</h1>
          <p className="text-gray-600 mb-2">
            Número de orden: <strong>{orderNumber}</strong>
          </p>
          <p className="text-gray-600 mb-8">
            Este es un demo. No se procesó ningún pago real.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Orden Confirmada!</h1>
          <p className="text-gray-600">Número de orden: <strong>{orderNumber}</strong></p>
          <p className="text-sm text-amber-600 mt-2">
            Este es un demo. No se procesó ningún pago real.
          </p>
        </div>

        {/* Order Summary */}
        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Resumen de tu Orden</h2>
          <div className="space-y-3">
            {cartProducts.map(({ product, quantity }) => (
              <div key={product.sku} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                    <span className="text-xl">💊</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">Cantidad: {quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-gray-900">
                  ${(product.priceArs * quantity).toLocaleString('es-AR')}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toLocaleString('es-AR')}</span>
          </div>
        </div>

        {/* Next Best Action: Replenishment Reminder */}
        <div className="bg-gradient-to-r from-blue-50 to-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center">
            <span className="mr-2">📅</span>
            Recordatorio de Recompra
          </h3>
          <p className="text-gray-700 text-sm mb-4">
            Los suplementos son más efectivos con uso constante. Te sugerimos recomprar alrededor
            del <strong>{repurchaseDate.toLocaleDateString('es-AR')}</strong>.
          </p>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={enableReminder}
              onChange={(e) => {
                setEnableReminder(e.target.checked);
                eventLogger.log('checkout_reminder_toggled', { enabled: e.target.checked });
              }}
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-gray-900 font-medium">
              Enviarme un recordatorio por email
            </span>
          </label>

          {enableReminder && (
            <div className="mt-4 p-3 bg-white rounded border border-primary-200">
              <p className="text-sm text-green-700 font-medium">
                ✓ Recordatorio activado para el {repurchaseDate.toLocaleDateString('es-AR')}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                (En un entorno real, esto enviaría un email automático)
              </p>
            </div>
          )}
        </div>

        {/* Additional Insights */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">💡 Consejos para Mejores Resultados</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Toma los suplementos a la misma hora cada día para crear un hábito.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Los resultados suelen ser visibles después de 2-4 semanas de uso constante.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Almacena en lugar fresco y seco, lejos de la luz directa.</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors text-center"
          >
            Volver al Inicio
          </Link>
          <button
            onClick={handleComplete}
            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Completar y Vaciar Carrito
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          <strong>Demo Notice:</strong> Esta es una simulación. No se procesaron pagos reales
          ni se enviaron productos. Los recordatorios de email no funcionan en este demo.
        </p>
      </div>
    </div>
  );
}
