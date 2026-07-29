import { useEffect, useState } from "react";
import { getProduct, deleteProduct } from "../../services/product";

function Products() {
  const [products, setProducts] = useState([]);
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this product?");

    if (!ok) return;

    try {
      const res = await deleteProduct(id);

      alert(res.message);

      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProduct();
      setProducts(res.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center border-t">
              <td className="p-3">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-16 h-16 object-cover mx-auto rounded"
                />
              </td>

              <td>{product.title}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>

              <td>
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
