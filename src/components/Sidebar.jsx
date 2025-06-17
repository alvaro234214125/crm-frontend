import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaUsers,
  FaBoxOpen,
  FaMoneyBill,
  FaHandshake,
  FaCommentDots,
  FaFileInvoice,
  FaCashRegister,
  FaTasks,
  FaCog,
  FaBars,
  FaQuestionCircle,
} from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";
import MenuItem from "./MenuItem";
import ProfileSection from "./ProfileSection";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: <HiOutlineViewGrid />, label: "Dashboard", to: "/" },
    { icon: <FaUsers />, label: "Clientes", to: "/client" },
    { icon: <FaHandshake />, label: "Contactos", to: "/contacts" },
    { icon: <FaCommentDots />, label: "Interacciones", to: "/interactions" },
    { icon: <FaFileInvoice />, label: "Cotizaciones", to: "/quotations" },
    { icon: <FaMoneyBill />, label: "Facturas", to: "/invoices" },
    { icon: <FaCashRegister />, label: "Pagos", to: "/payments" },
    { icon: <FaBoxOpen />, label: "Productos", to: "/products" },
    { icon: <FaTasks />, label: "Tareas", to: "/tasks" },
    { icon: <FaUsers />, label: "Usuarios", to: "/users" },
    { icon: <FaCog />, label: "Roles", to: "/roles" },
    { icon: <FaQuestionCircle />, label: "Soporte", to: "/help" },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white p-5 shadow-md transition-all duration-300 h-screen flex flex-col justify-between`}
    >
      <div>
        <div
          className={`mb-6 ${
            collapsed ? "flex justify-center" : "flex items-center justify-between"
          }`}
        >
          {!collapsed && <div className="text-2xl font-bold">Proyecto-CRM</div>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600 hover:text-purple-600"
          >
            <FaBars size={20} />
          </button>
        </div>

        <nav className="space-y-3">
          {menuItems.map(({ icon, label, to }) => (
            <MenuItem
              key={to}
              icon={icon}
              label={label}
              to={to}
              collapsed={collapsed}
              active={
                to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(to)
              }
            />
          ))}
        </nav>
      </div>

      <ProfileSection collapsed={collapsed} />
    </aside>
  );
}