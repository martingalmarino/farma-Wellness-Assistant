'use client';

import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product.sku);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image placeholder */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-4xl mb-2">💊</div>
          <p className="text-xs text-gray-500 font-medium">{product.brand}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category badge */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-primary-700 bg-primary-50 rounded">
            {product.category.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        {!compact && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Price */}
        <div className="mb-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.priceArs.toLocaleString('es-AR')}
          </span>
        </div>

        {/* Stock status */}
        {!product.inStock && (
          <p className="text-xs text-red-600 mb-2 font-medium">Sin stock</p>
        )}

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
        >
          {product.inStock ? 'Agregar' : 'No disponible'}
        </button>
      </div>
    </div>
  );
}
