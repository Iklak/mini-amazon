import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/admin";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-xl">
          <h2>Products</h2>
          <p className="text-3xl">{stats.totalProducts}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl">
          <h2>Orders</h2>
          <p className="text-3xl">{stats.totalOrders}</p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-xl">
          <h2>Users</h2>
          <p className="text-3xl">{stats.totalUsers}</p>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-xl">
          <h2>Revenue</h2>
          <p className="text-3xl">₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
