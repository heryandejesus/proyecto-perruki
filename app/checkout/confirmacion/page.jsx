import Link from 'next/link';

export default async function ConfirmacionPage({ searchParams }) {
  const params = await searchParams;
  const orderId = params?.order;

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-6" aria-hidden="true">🎉</p>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        ¡Pedido confirmado!
      </h1>
      
      <p className="text-gray-500 mb-2">
        Gracias por tu compra en CollarDog.
      </p>

      {orderId && (
        <p className="text-sm text-gray-400 mb-8">
          Número de pedido:{" "}
          <span className="font-mono text-gray-600">{orderId}</span>
        </p>
      )}
      
      {/* Se añadió el componente Link de Next.js correctamente formado */}
      <Link
        href="/"
        className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors inline-block"
      >
        Seguir comprando
      </Link>
    </div>
  );
}