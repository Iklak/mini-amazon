import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/product";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      console.log(data);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <h1 className="text-center text-3xl mt-20">Loading...</h1>;
  }

  if (!product) {
    return (
      <h1 className="text-center text-red-500 text-3xl mt-20">
        Product Not Found
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 mt-10">
      <div>
        <img
          src={
            product.images?.[0] || "https://placehold.co/500x500?text=No+Image"
          }
          alt={product.title}
          className="w-full rounded-xl shadow-lg"
        />
      </div>

      <div>
        <h1 className="text-4xl font-bold">{product.title}</h1>

        <p className="text-gray-500 mt-2">Brand: {product.brand}</p>

        <p className="text-3xl text-green-600 font-bold mt-5">
          ₹{product.price}
        </p>

        <p className="mt-6 text-gray-700">{product.description}</p>

        <p className="mt-5">
          Stock: <span className="font-bold">{product.stock}</span>
        </p>

        <button className="mt-8 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-semibold">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
