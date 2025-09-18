import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">Welcome to Mini Seller</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">Discover amazing products for your daily life!</p>
        <Link to="/products" className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition">
          View Products
        </Link>
      </main>
      <Footer />
    </div>
  );
}