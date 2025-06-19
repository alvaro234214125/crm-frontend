import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import { FaUserShield } from "react-icons/fa";
import UsersTable from "../components/UsersTable";
import { FiPlus } from "react-icons/fi";
import UserFormModal from "../components/UserFormModal";

export default function Users() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (user && user.role?.name.toLowerCase() !== "admin") {
      navigate("/no-autorizado");
    }
  }, [user]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error al cargar usuarios", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto eliminará el usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/users/${id}`);
          fetchUsers();
          Swal.fire("Eliminado", "El usuario fue eliminado", "success");
        } catch {
          Swal.fire("Error", "No se pudo eliminar el usuario", "error");
        }
      }
    });
  };

  const fetchRoles = async () => {
    try {
      const res = await api.get("/roles");
      setRoles(res.data);
    } catch (err) {
      console.error("Error al cargar roles", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (data.id) {
        await api.put(`/users/${data.id}`, data);
        Swal.fire("Actualizado", "El usuario ha sido actualizado", "success");
      } else {
        await api.post("/users", data);
        Swal.fire("Creado", "Nuevo usuario creado", "success");
      }
      setShowForm(false);
      setEditData(null);
      fetchUsers();
    } catch (err) {
      console.error("Error al guardar usuario", err);
      Swal.fire("Error", "No se pudo guardar el usuario", "error");
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === true).length;
  const inactiveUsers = users.filter((u) => u.status === false).length;

  const userStats = [
    {
      label: "Usuarios Totales",
      value: totalUsers,
      icon: <FaUserShield className="text-blue-500" />,
    },
    {
      label: "Usuarios Activos",
      value: activeUsers,
      icon: <FaUserShield className="text-green-500" />,
    },
    {
      label: "Usuarios Inactivos",
      value: inactiveUsers,
      icon: <FaUserShield className="text-red-500" />,
    },
  ];

  return (
    <main className="flex-1 p-6 bg-gray-100 min-h-screen">
      <Topbar />
      <StatsCards stats={userStats} />
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Usuarios del Sistema</h2>
          <button
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md transition"
            onClick={() => {
              setEditData(null);
              setShowForm(true);
            }}
          >
            <FiPlus size={16} />
            <span className="font-medium">Nuevo Usuario</span>
          </button>
        </div>

        <UsersTable
          users={users}
          onDelete={handleDelete}
          onEdit={(u) => {
            setEditData(u);
            setShowForm(true);
          }}
        />
      </div>
      <UserFormModal
        visible={showForm}
        onClose={() => {
          setShowForm(false);
          setEditData(null);    
        }}
        onSubmit={handleSubmit}
        initialData={editData}
        roles={roles}
      />
    </main>
  );
}
