import { FaUser, FaUserPlus, FaUserCheck } from "react-icons/fa";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import CustomersTable from "../components/CustomersTable";

const customerStats = [
    {
      label: "Clientes Totales",
      value: "5,423",
      change: "+5% este mes",
      icon: <FaUser className="text-green-500" />,
    },
    {
      label: "Miembros",
      value: "1,893",
      change: "-2% este mes",
      icon: <FaUserPlus className="text-pink-500" />,
    },
    {
      label: "Activos",
      value: "189",
      change: "",
      icon: <FaUserCheck className="text-yellow-500" />,
    },
  ];

export default function Clients() {
  return (
    <main className="flex-1 p-6">
      <Topbar />
      <StatsCards stats={customerStats}/>
      <CustomersTable />
    </main>
  );
}
