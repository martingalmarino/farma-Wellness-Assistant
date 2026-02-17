import { products, Product } from '@/data/products';

export interface CartItem {
  sku: string;
  quantity: number;
}

export interface CartOptimizationSuggestion {
  type: 'cross-sell' | 'free-shipping' | 'bundle';
  product: Product;
  reason: string;
}

const FREE_SHIPPING_THRESHOLD = 25000;

export const optimizeCart = (cartItems: CartItem[]): CartOptimizationSuggestion[] => {
  const suggestions: CartOptimizationSuggestion[] = [];

  // Get products in cart
  const cartSkus = cartItems.map((item) => item.sku);
  const cartProducts = products.filter((p) => cartSkus.includes(p.sku));

  // Calculate cart total
  const cartTotal = cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.sku === item.sku);
    return sum + (product?.priceArs || 0) * item.quantity;
  }, 0);

  // 1. Free shipping suggestion
  if (cartTotal < FREE_SHIPPING_THRESHOLD && cartTotal > 0) {
    const needed = FREE_SHIPPING_THRESHOLD - cartTotal;
    // Find a product close to the needed amount
    const candidate = products
      .filter((p) => p.inStock && !cartSkus.includes(p.sku))
      .filter((p) => p.priceArs <= needed + 3000 && p.priceArs >= needed - 3000)
      .sort((a, b) => Math.abs(a.priceArs - needed) - Math.abs(b.priceArs - needed))[0];

    if (candidate) {
      suggestions.push({
        type: 'free-shipping',
        product: candidate,
        reason: `Agrega este producto para alcanzar envío gratis (faltan $${needed.toLocaleString('es-AR')})`,
      });
    }
  }

  // 2. Cross-sell: if cart has sleep product but no general vitamin D or zinc
  const hasSleepProduct = cartProducts.some((p) => p.category === 'sleep');
  const hasVitaminDOrZinc = cartProducts.some(
    (p) => p.tags.includes('vitaminD') || p.tags.includes('zinc')
  );

  if (hasSleepProduct && !hasVitaminDOrZinc && suggestions.length < 2) {
    const vitaminD = products.find((p) => p.sku === 'GEN002' && !cartSkus.includes(p.sku));
    if (vitaminD) {
      suggestions.push({
        type: 'cross-sell',
        product: vitaminD,
        reason: 'La Vitamina D apoya la calidad del sueño y el estado de ánimo',
      });
    }
  }

  // 3. Cross-sell: if cart has energy product, suggest B-complex
  const hasEnergyProduct = cartProducts.some((p) => p.category === 'energy');
  const hasBComplex = cartProducts.some((p) => p.subcategory === 'vitamins' && p.category === 'energy');

  if (hasEnergyProduct && !hasBComplex && suggestions.length < 2) {
    const bComplex = products.find((p) => p.sku === 'ENR001' && !cartSkus.includes(p.sku));
    if (bComplex) {
      suggestions.push({
        type: 'cross-sell',
        product: bComplex,
        reason: 'El Complejo B potencia el metabolismo energético',
      });
    }
  }

  // 4. Cross-sell: if cart has gut product, suggest prebiotic if no prebiotic
  const hasGutProduct = cartProducts.some((p) => p.category === 'gut');
  const hasPrebiotic = cartProducts.some((p) => p.subcategory === 'prebiotic');

  if (hasGutProduct && !hasPrebiotic && suggestions.length < 2) {
    const prebiotic = products.find((p) => p.sku === 'GUT002' && !cartSkus.includes(p.sku));
    if (prebiotic) {
      suggestions.push({
        type: 'cross-sell',
        product: prebiotic,
        reason: 'Los prebióticos alimentan las bacterias buenas de tus probióticos',
      });
    }
  }

  // 5. General high-margin product if no other suggestions
  if (suggestions.length === 0 && cartTotal > 0) {
    const highMargin = products
      .filter((p) => p.inStock && !cartSkus.includes(p.sku) && p.marginScore > 75)
      .sort((a, b) => b.marginScore - a.marginScore)[0];

    if (highMargin) {
      suggestions.push({
        type: 'cross-sell',
        product: highMargin,
        reason: 'Complementa tu compra con este producto popular',
      });
    }
  }

  // Limit to max 2 suggestions
  return suggestions.slice(0, 2);
};
