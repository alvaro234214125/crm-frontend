export default function UsersTable({ users, onDelete, onEdit }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500">
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-t border-gray-200 hover:bg-gray-50">
            <td className="py-2">{u.id}</td>
            <td className="py-2">{u.name}</td>
            <td className="py-2">{u.email}</td>
            <td className="py-2">{u.role?.name}</td>
            <td className="py-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  u.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {u.status ? "Activo" : "Inactivo"}
              </span>
            </td>
            <td className="flex gap-2 py-2">
              <button
                onClick={() => onEdit(u)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(u.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
