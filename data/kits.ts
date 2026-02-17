export interface Kit {
  id: string;
  name: string;
  description: string;
  category: 'sleep' | 'energy' | 'gut' | 'skin';
  skus: string[];
  priceArs: number;
  discountPercent: number;
  image: string;
  benefits: string[];
}

export const kits: Kit[] = [
  {
    id: 'KIT001',
    name: 'Sleep Starter Kit',
    description: 'Combo perfecto para empezar a mejorar tu descanso naturalmente.',
    category: 'sleep',
    skus: ['SLP001', 'SLP002'], // Melatonin + Magnesium
    priceArs: 18500,
    discountPercent: 10,
    image: '/placeholder-kit-sleep-starter.svg',
    benefits: ['sleep-onset', 'relaxation', 'sleep-quality']
  },
  {
    id: 'KIT002',
    name: 'Deep Sleep Kit',
    description: 'Protocolo avanzado para descanso profundo y reparador.',
    category: 'sleep',
    skus: ['SLP001', 'SLP002', 'SLP004'], // Melatonin + Magnesium + Ashwagandha
    priceArs: 36000,
    discountPercent: 15,
    image: '/placeholder-kit-deep-sleep.svg',
    benefits: ['sleep-quality', 'stress-relief', 'recovery']
  },
  {
    id: 'KIT003',
    name: 'Energy Daily Kit',
    description: 'Energía sostenida para todo el día sin estimulantes.',
    category: 'energy',
    skus: ['ENR001', 'ENR003'], // B-Complex + CoQ10
    priceArs: 32000,
    discountPercent: 12,
    image: '/placeholder-kit-energy.svg',
    benefits: ['energy', 'metabolism', 'cellular-health']
  },
  {
    id: 'KIT004',
    name: 'Gut Balance Kit',
    description: 'Sistema completo para salud digestiva óptima.',
    category: 'gut',
    skus: ['GUT001', 'GUT002', 'GUT003'], // Probiotic + Prebiotic + Enzymes
    priceArs: 45000,
    discountPercent: 15,
    image: '/placeholder-kit-gut.svg',
    benefits: ['digestion', 'gut-flora', 'nutrient-absorption']
  },
  {
    id: 'KIT005',
    name: 'Skin Radiance Kit',
    description: 'Belleza desde adentro con nutrientes esenciales.',
    category: 'skin',
    skus: ['SKN001', 'SKN002'], // Collagen + Hyaluronic Acid
    priceArs: 39000,
    discountPercent: 12,
    image: '/placeholder-kit-skin.svg',
    benefits: ['skin-elasticity', 'hydration', 'anti-aging']
  },
  {
    id: 'KIT006',
    name: 'Recovery Kit',
    description: 'Recuperación integral para cuerpo y mente.',
    category: 'sleep',
    skus: ['SLP004', 'GUT004', 'ENR003'], // Ashwagandha + Glutamine + CoQ10
    priceArs: 52000,
    discountPercent: 18,
    image: '/placeholder-kit-recovery.svg',
    benefits: ['recovery', 'stress-relief', 'cellular-health']
  },
];
