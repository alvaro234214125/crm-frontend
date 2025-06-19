import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import RolesTable from "../components/RolesTable";
import RoleFormModal from "../components/RoleFormModal";
import Swal from "sweetalert2";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import { FaUsers } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

export default function RolesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (user && user.role?.name.toLowerCase() !== "admin") {
      navigate("/no-autorizado"); 
    }
  }, [user]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await api.get("/roles");
      setRoles(res.data);
    } catch (err) {
      console.error("Error al cargar roles", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (data.id) {
        await api.put(`/roles/${data.id}`, data);
        Swal.fire("Actualizado", "El rol ha sido actualizado", "success");
      } else {
        await api.post("/roles", { name: data.name });
        Swal.fire("Creado", "Nuevo rol creado", "success");
      }
      setShowForm(false);
      setEditData(null);
      fetchRoles();
    } catch (err) {
      console.error("Error al guardar rol", err);
      Swal.fire("Error", "No se pudo guardar el rol", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto eliminará el rol.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/roles/${id}`);
          fetchRoles();
          Swal.fire("Eliminado", "El rol fue eliminado", "success");
        } catch {
          Swal.fire("Error", "No se pudo eliminar el rol", "error");
        }
      }
    });
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const totalRoles = roles.length;

  const roleStats = [
    {
      label: "Roles Totales",
      value: `${totalRoles}`,
      change: "",
      icon: <FaUsers className="text-blue-500" />,
    },
  ];

  return (
    <main className="flex-1 p-6 bg-gray-100 min-h-screen">
      <Topbar />
      <StatsCards stats={roleStats} />
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Roles del Sistema</h2>
          <button
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md transition"
            onClick={() => {
              setEditData(null);
              setShowForm(true);
            }}
          >
            <FiPlus size={16} />
            <span className="font-medium">Nuevo Rol</span>
          </button>
        </div>
        <RolesTable
          roles={roles}
          onEdit={(role) => {
            setEditData(role);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      <RoleFormModal
        visible={showForm}
        onClose={() => {
          setShowForm(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        initialData={editData}
      />
    </main>
  );
}
