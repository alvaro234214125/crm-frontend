export default function RolesTable({ roles, onEdit, onDelete }) {
    return (
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r) => (
            <tr key={r.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="py-2 font-medium">{r.id}</td>
              <td>{r.name}</td>
              <td className="flex gap-2 py-2">
                <button
                  onClick={() => onEdit(r)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(r.id)}
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
  