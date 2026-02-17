'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { Kit } from '@/data/kits';
import { useCart } from '@/context/CartContext';

interface RecommendationPanelProps {
  products: Product[];
  kit: Kit | null;
  rationale: string[];
  warnings: string[];
}

export default function RecommendationPanel({
  products,
  kit,
  rationale,
  warnings,
}: RecommendationPanelProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const { addItem } = useCart();

  return (
    <div className="space-y-6">
      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          {warnings.map((warning, index) => (
            <p key={index} className="text-sm text-amber-800 mb-2 last:mb-0">
              {warning}
            </p>
          ))}
        </div>
      )}

      {/* Rationale */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-900 mb-2">¿Por qué estas recomendaciones?</h3>
        <ul className="space-y-1">
          {rationale.map((item, index) => (
            <li key={index} className="text-sm text-blue-800 flex items-start">
              <span className="mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Products */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">Productos Recomendados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.sku}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💊</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2 py-0.5 text-xs font-semibold text-primary-700 bg-primary-50 rounded mb-1">
                    {product.category.toUpperCase()}
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 mb-1">{product.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
                  <p className="text-xs text-gray-700 mb-2 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.priceArs.toLocaleString('es-AR')}
                    </span>
                    <button
                      onClick={() => addItem(product.sku)}
                      className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-1.5 px-4 rounded-lg transition-colors text-sm"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Kit */}
      {kit && (
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Kit Recomendado</h3>
          <div className="border-2 border-primary-200 bg-primary-50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-xl text-gray-900 mb-2">{kit.name}</h4>
                <p className="text-sm text-gray-700 mb-3">{kit.description}</p>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-primary-600">
                    ${kit.priceArs.toLocaleString('es-AR')}
                  </span>
                  <span className="inline-block px-3 py-1 text-sm font-bold text-white bg-primary-500 rounded-full">
                    {kit.discountPercent}% OFF
                  </span>
                </div>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-primary-200 to-primary-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">📦</span>
              </div>
            </div>
            <button
              onClick={() => {
                kit.skus.forEach((sku) => addItem(sku));
              }}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Agregar Kit Completo
            </button>
          </div>
        </div>
      )}

      {/* Collapsible explanation */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="w-full bg-gray-50 hover:bg-gray-100 px-4 py-3 flex items-center justify-between transition-colors"
        >
          <span className="font-semibold text-gray-900">Entender mi recomendación</span>
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform ${
              showExplanation ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showExplanation && (
          <div className="px-4 py-3 bg-white border-t border-gray-200">
            <p className="text-sm text-gray-700 mb-3">
              Nuestro asistente analiza tus respuestas y utiliza un algoritmo que considera:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="font-bold mr-2">55%</span>
                <span>Match con tus necesidades específicas basado en beneficios</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">25%</span>
                <span>Popularidad y satisfacción de otros usuarios</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">20%</span>
                <span>Calidad y efectividad del producto</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-xs text-gray-600">
                <strong>Importante:</strong> Esta información es solo una guía de bienestar general.
                No reemplaza el consejo médico profesional. Siempre consulta con un profesional de
                la salud antes de comenzar cualquier régimen de suplementos.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
