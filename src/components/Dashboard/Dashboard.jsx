import { useEffect, useState } from 'react'

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [expandedProductId, setExpandedProductId] = useState(null);

    useEffect(() => {
        const Fetchproduct = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.status}`);
                }

                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Unable to load products:', error);
                setError('Unable to load products. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }

        Fetchproduct();
    }, [])

  return (
    <main className="bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Products</h1>
                <p className="text-xl font-bold text-slate-600 border-2 border-slate-300 px-3 py-1 rounded-md">Total products: {products.length}</p>
            </div>
            {isLoading ? (
                <div className="flex items-center justify-center gap-3 py-12 text-slate-600" role="status">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-orange-500" />
                    <span>Loading products...</span>
                </div>
            ) : error ? (
                <p className="text-slate-600">{error}</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
                        >
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="mb-4 h-48 w-full rounded-md bg-slate-50 object-contain p-3"
                            />
                            <h2 className="mb-2 text-base font-semibold leading-6 text-slate-900">{product.title}</h2>
                            <p className="mb-2 text-lg font-bold text-orange-600">${product.price.toFixed(2)}</p>
                            <p className="mb-3 text-sm font-medium text-slate-700">Rating: {product.rating} / 5</p>
                            <p className="text-sm leading-6 text-slate-600">{product.description}</p>
                            <button
                                type="button"
                                aria-expanded={expandedProductId === product.id}
                                onClick={() => setExpandedProductId(
                                    expandedProductId === product.id ? null : product.id,
                                )}
                                className="mt-4 text-sm font-semibold text-orange-600 hover:text-orange-700"
                            >
                                {expandedProductId === product.id ? 'Hide details' : 'View details'}
                            </button>
                            {expandedProductId === product.id && (
                                <div className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-sm text-slate-600">
                                    <p>Category: {product.category}</p>
                                    <p>Brand: {product.brand || 'Not specified'}</p>
                                    <p>Stock: {product.stock}</p>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </div>
    </main>
  )
}

export default Dashboard
