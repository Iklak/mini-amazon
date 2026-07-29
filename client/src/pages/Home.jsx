import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProduct } from "../services/product";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const fetchProduct = async () => {
    try {
      const data = await getProduct(search, page);
      console.log(data);
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [search, page]);
  if (loading) {
    return <h1 className="text-center text-3xl mt-20">Loading...</h1>;
  }
  if (products.length === 0) {
    return <h1 className="text-center text-3xl mt-20">No product found</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Latest Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-bold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-yellow-400 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
