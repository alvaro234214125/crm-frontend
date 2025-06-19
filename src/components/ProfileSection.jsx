import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ImageUser from "/imgs/user-circle-svgrepo-com.svg";

export default function ProfileSection({ collapsed }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className={`flex items-center gap-3 cursor-pointer transition-all ${
          collapsed ? "justify-center" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <img src={ImageUser} alt="User" className="w-12 h-12 rounded-full" />
        {!collapsed && user && (
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role.name}</p>
          </div>
        )}
      </div>

      {open && (
        <div
          className={`absolute bottom-16 ${
            collapsed ? "left-14" : "left-0"
          } bg-white border border-gray-200 rounded-lg shadow-xl w-44 z-10 animate-fade-in`}
        >
          <button
            onClick={() => navigate("/perfil")}
            className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            <FaUserCircle className="mr-2" /> Ver perfil
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm text-purple-500 hover:bg-purple-50 hover:text-purple-600 border-t border-purple-100"
          >
            <FaSignOutAlt className="mr-2" /> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
