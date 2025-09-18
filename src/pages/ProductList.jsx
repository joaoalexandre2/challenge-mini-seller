import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const mockProducts = [
  { id: 1, name: 'Product Example 1', price: '$99.90', image: 'https://via.placeholder.com/300x200?text=Product+1' },
  { id: 2, name: 'Product Example 2', price: '$149.90', image: 'https://via.placeholder.com/300x200?text=Product+2' },
  { id: 3, name: 'Product Example 3', price: '$199.90', image: 'https://via.placeholder.com/300x200?text=Product+3' },
];

export default function ProductList() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}