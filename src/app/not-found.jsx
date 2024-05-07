import Link from 'next/link'

function NotFoundPage() {
  return (
    <section className='flex h-[calc(100vh-7rem)] justify-center items-center'>
      <div className='text-center'>
    <h1 className='text-3xl font-bold text-white'>404 - Página no encontrada</h1>
        <Link href="/" className='text-slate-300 text-xl mt-6'>
            volver al inicio
        </Link>
      </div>

    </section>
  )
}

export default NotFoundPage