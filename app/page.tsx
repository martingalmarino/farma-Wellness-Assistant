import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Home() {
  // Show top 8 products by popularity
  const topProducts = [...products]
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 mb-12 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tu Asistente de Bienestar Personal
          </h1>
          <p className="text-lg md:text-xl mb-8 text-primary-50">
            Responde 3 preguntas simples y recibe recomendaciones personalizadas de productos
            basadas en tus necesidades específicas.
          </p>
          <Link
            href="/assistant"
            className="inline-block bg-white text-primary-600 hover:bg-primary-50 font-bold py-4 px-8 rounded-lg transition-colors text-lg"
          >
            Comenzar Asistente 🚀
          </Link>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="font-bold text-lg mb-2">Personalizado</h3>
          <p className="text-gray-600 text-sm">
            Recomendaciones adaptadas a tus necesidades específicas de bienestar.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-bold text-lg mb-2">Rápido y Simple</h3>
          <p className="text-gray-600 text-sm">
            Solo 3 preguntas para obtener tus productos ideales en segundos.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-3xl mb-3">💡</div>
          <h3 className="font-bold text-lg mb-2">Basado en Ciencia</h3>
          <p className="text-gray-600 text-sm">
            Algoritmo que considera efectividad, popularidad y tu perfil único.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos Populares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProducts.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          ¿No sabes qué elegir?
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Nuestro asistente de bienestar te ayuda a encontrar los productos perfectos
          para tus objetivos de salud.
        </p>
        <Link
          href="/assistant"
          className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Usar el Asistente
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          <strong>Importante:</strong> Este es un demo de tecnología. La información proporcionada
          es solo con fines de bienestar general y no constituye consejo médico. Siempre consulta
          con un profesional de la salud antes de comenzar cualquier régimen de suplementos.
        </p>
      </div>
    </div>
  );
}
