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

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [userStats, setUserStats] = useState({
    total: 0,
    activos: 0,
    inactivos: 0,
  });

  const fetchUserStats = async () => {
    try {
      const res = await api.get("/users/stats");
      setUserStats(res.data);
    } catch (err) {
      console.error("Error al obtener estadísticas de usuarios", err);
    }
  };

  useEffect(() => {
    if (user && user.role?.name.toLowerCase() !== "admin") {
      navigate("/no-autorizado");
    }
  }, [user]);

  const fetchUsers = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const res = await api.get("/users", {
        params: { page: pageNumber, size },
      });
      setUsers(res.data.content);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    } catch (err) {
      console.error("Error al cargar usuarios", err);
    } finally {
      setLoading(false);
    }
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
    fetchUsers(page);
    fetchRoles();
    fetchUserStats();
  }, [page]);

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
      fetchUsers(page);
    } catch (err) {
      console.error("Error al guardar usuario", err);
      Swal.fire("Error", "No se pudo guardar el usuario", "error");
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
          fetchUsers(page);
          Swal.fire("Eliminado", "El usuario fue eliminado", "success");
        } catch {
          Swal.fire("Error", "No se pudo eliminar el usuario", "error");
        }
      }
    });
  };

  const activeUsers = users.filter((u) => u.status === true).length;
  const inactiveUsers = users.filter((u) => u.status === false).length;

  const stats = [
    {
      label: "Usuarios Totales",
      value: userStats.total,
      icon: <FaUserShield className="text-blue-500" />,
    },
    {
      label: "Usuarios Activos",
      value: userStats.activos,
      icon: <FaUserShield className="text-green-500" />,
    },
    {
      label: "Usuarios Inactivos",
      value: userStats.inactivos,
      icon: <FaUserShield className="text-red-500" />,
    },
  ];

  return (
    <main className="flex-1 p-6 bg-gray-100 min-h-screen">
      <Topbar />
      <StatsCards stats={stats} />

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

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-300 text-sm rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm">
            Página {page + 1} de {totalPages}
          </span>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={page + 1 >= totalPages}
            className="px-4 py-2 bg-gray-300 text-sm rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
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
