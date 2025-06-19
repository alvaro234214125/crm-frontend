import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

export default function UserFormModal({ visible, onClose, onSubmit, initialData, roles }) {
  const [showContent, setShowContent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roleId: "",
    status: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
        roleId: initialData.role?.id || "",
        status: initialData.status ?? true,
      });
    } else {
      setForm({
        name: "",
        email: "",
        password: "",
        roleId: roles?.[0]?.id || "",
        status: true,
      });
    }
  }, [initialData, roles]);

  useEffect(() => {
    if (visible) setTimeout(() => setShowContent(true), 10);
    else setShowContent(false);
  }, [visible]);

  if (!visible) return null;

  const handleClose = () => {
    setShowContent(false);
    setTimeout(onClose, 200);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.roleId) return;
    const data = {
      id: initialData?.id || null,
      name: form.name,
      email: form.email,
      password: form.password || null,
      status: form.status,
      role: { id: parseInt(form.roleId) },
    };
    onSubmit(data);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        showContent ? "bg-black/40" : "bg-black/0"
      }`}
    >
      <div
        className={`relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl transition-all duration-300
          ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          {initialData ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {initialData ? "Nueva contraseña (opcional)" : "Contraseña"}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="********"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select
              name="roleId"
              value={form.roleId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="status"
              checked={form.status}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <span>Usuario activo</span>
          </label>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {initialData ? "Actualizar" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}
