const orders = [
    { id: "#001", customer: "John Doe", status: "Completado", total: "$120.00" },
    { id: "#002", customer: "Anna Smith", status: "Pendiente", total: "$95.00" },
    { id: "#003", customer: "Michael Brown", status: "Cancelado", total: "$78.50" },
  ];
  
  export default function QuickOverviewTable() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Ultimas ordenes</h2>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="pb-2">Order ID</th>
              <th className="pb-2">Cliente</th>
              <th className="pb-2">Estado</th>
              <th className="pb-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 font-medium">{o.id}</td>
                <td>{o.customer}</td>
                <td>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      o.status === "Completado"
                        ? "bg-green-100 text-green-600"
                        : o.status === "Pendiente"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td>{o.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }