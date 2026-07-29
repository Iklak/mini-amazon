import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-3xl font-bold text-yellow-400 mb-10">Admin</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="hover:bg-slate-700 p-3 rounded-lg">
            📊 Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="hover:bg-slate-700 p-3 rounded-lg"
          >
            📦 Products
          </Link>

          <Link
            to="/admin/add-product"
            className="hover:bg-slate-700 p-3 rounded-lg"
          >
            ➕ Add Product
          </Link>

          <Link
            to="/admin/orders"
            className="hover:bg-slate-700 p-3 rounded-lg"
          >
            📋 Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
