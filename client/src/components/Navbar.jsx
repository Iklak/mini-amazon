import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/?search=${search}`);
    } else {
      navigate("/");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-400 hover:text-yellow-300"
        >
          Mini Amazon
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex w-1/3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-l-md border-none outline-none text-black bg-white"
          />
          <button
            className="bg-yellow-400 text-black px-5 rounded-r-md hover:bg-yellow-500"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/cart" className="hover:text-yellow-400">
                🛒 Cart ({cartCount})
              </Link>
              <Link to="/orders" className="hover:text-yellow-400">
                📦 My Orders
              </Link>

              <span className="text-yellow-400 font-semibold">
                Hello, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400 transition">
                Login
              </Link>

              <Link to="/register" className="hover:text-yellow-400 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
