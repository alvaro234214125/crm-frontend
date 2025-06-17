import { FaDollarSign, FaUsers, FaShoppingCart } from "react-icons/fa";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import RevenueChart from "../components/RevenueChart";
import RecentActivities from "../components/RecentActivities";
import QuickOverviewTable from "../components/QuickOverviewTable";

const stats = [
  {
    label: "Ingresos Totales",
    value: "$75,900",
    change: "+8.2% este me",
    icon: <FaDollarSign className="text-green-500" />,
  },
  {
    label: "Nuevos Clientes",
    value: "1,205",
    change: "+4.5% este mes",
    icon: <FaUsers className="text-blue-500" />,
  },
  {
    label: "Ordenes",
    value: "984",
    change: "-1.2% este me",
    icon: <FaShoppingCart className="text-purple-500" />,
  },
];

export default function Dashboard() {
  return (
    <main className="flex-1 p-6">
      <Topbar />
      <StatsCards stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <RecentActivities />
      </div>
      <div className="mt-6">
        <QuickOverviewTable />
      </div>
    </main>
  );
}