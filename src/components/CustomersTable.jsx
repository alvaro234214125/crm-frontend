const customers = [
  {
    name: "Jane Cooper",
    company: "Microsoft",
    phone: "(225) 555-0118",
    email: "jane@microsoft.com",
    country: "United States",
    status: "Activo",
  },
  {
    name: "Floyd Miles",
    company: "Yahoo",
    phone: "(205) 555-0100",
    email: "floyd@yahoo.com",
    country: "Kiribati",
    status: "Inactivo",
  },
  {
    name: "Ronald Richards",
    company: "Adobe",
    phone: "(302) 555-0107",
    email: "ronald@adobe.com",
    country: "Israel",
    status: "Inactivo",
  },
  {
    name: "Marvin McKinney",
    company: "Tesla",
    phone: "(252) 555-0126",
    email: "marvin@tesla.com",
    country: "Iran",
    status: "Activo",
  },
  {
    name: "Jerome Bell",
    company: "Google",
    phone: "(629) 555-0129",
    email: "jerome@google.com",
    country: "Réunion",
    status: "Activo",
  },
  {
    name: "Kathryn Murphy",
    company: "Microsoft",
    phone: "(406) 555-0120",
    email: "kathryn@microsoft.com",
    country: "Curaçao",
    status: "Inactivo",
  },
];

export default function CustomersTable() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Todos los Clientes</h2>
        <input
          type="text"
          placeholder="Buscar..."
          className="border px-4 py-1 rounded-md text-sm"
        />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Nombre</th>
            <th>Empresa</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>País</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, i) => (
            <tr key={i} className="border-t border-gray-200">
              <td className="py-2 font-medium">{c.name}</td>
              <td>{c.company}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.country}</td>
              <td>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    c.status === "Activo"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end gap-2 text-sm mt-4">
        <button className="px-3 py-1 border rounded">1</button>
        <button className="px-3 py-1 border rounded">2</button>
        <button className="px-3 py-1 border rounded">3</button>
        <span className="text-gray-400">...</span>
        <button className="px-3 py-1 border rounded">10</button>
      </div>
    </div>
  );
}
