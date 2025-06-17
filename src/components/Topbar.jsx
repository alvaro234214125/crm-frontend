import { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { FiChevronDown, FiPlus, FiUser, FiFileText, FiDollarSign, FiGlobe } from "react-icons/fi";

export default function Topbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const now = new Date();
  const hour = now.getHours();
  const dateString = now.toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const getGreeting = () => {
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const toggleMenu = () => setOpenMenu((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center mb-6 relative">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          {getGreeting()}, Alvaro! 👋🏼
        </h1>
        <p className="text-sm text-gray-500 capitalize">{dateString}</p>
      </div>

      <div className="flex items-center gap-4" ref={menuRef}>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md transition"
          >
            <FiPlus size={16} />
            <span className="font-medium">Nuevo</span>
            <FiChevronDown
              size={16}
              className={`transform transition-transform duration-300 ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all duration-300 origin-top-right z-20 ${
              openMenu
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition">
              <FiUser size={16} /> Crear cliente
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition">
              <FiFileText size={16} /> Nueva cotización
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition">
              <FiDollarSign size={16} /> Nueva factura
            </button>
          </div>
        </div>

        <button className="flex items-center gap-1 text-gray-600 hover:text-purple-600 text-sm">
          <FiGlobe size={18} /> ES
        </button>

        <button className="relative text-gray-600 hover:text-purple-600">
          <FaBell size={18} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </div>
  );
}