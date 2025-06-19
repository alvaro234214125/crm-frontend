import { useState } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";

export default function ProfileForm({ user }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/users/${user.id}`, {
        name: form.name,
        email: form.email,
        password: form.password || undefined,
      });
      Swal.fire("Actualizado", "Tus datos han sido actualizados", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo actualizar el perfil", "error");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Nombre completo</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Correo electrónico</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Nueva contraseña</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Deja vacío para no cambiarla"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
      >
        Guardar cambios
      </button>
    </div>
  );
}
