import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mini Seller</h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-blue-300 transition">Home</Link></li>
          <li><Link to="/products" className="hover:text-blue-300 transition">Products</Link></li>
        </ul>
      </nav>
    </header>
  );
}