import Link from "next/link"

const MotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-9xl font-bold text-gray-700 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-600 mb-4">
          ¡Ups! Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-sky-default text-white rounded-md hover:bg-sky-500 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default MotFoundPage