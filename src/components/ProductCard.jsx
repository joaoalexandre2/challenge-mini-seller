export default function ProductCard({ product }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-xl font-bold text-green-600 mb-4">{product.price}</p>
      <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
        Add to Cart
      </button>
    </div>
  );
}