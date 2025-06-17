const activities = [
    { user: "John Doe", action: "añadio un nuevo producto", time: "hace 2 horas" },
    { user: "Anna Smith", action: "completo una orden", time: "hace 4 horas" },
    { user: "Michael Brown", action: "creo un nuevo cliente", time: "Ayer" },
    { user: "Lisa Ray", action: "actualizo un producto", time: "hace 2 dias" },
  ];
  
  export default function RecentActivities() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Últimas actividades</h2>
        <ul className="space-y-4 text-sm text-gray-600">
          {activities.map((a, i) => (
            <li
              key={i}
              className="border-l-4 border-purple-400 pl-4 text-gray-700"
            >
              <span className="font-medium text-gray-800">{a.user}</span>{" "}
              {a.action}
              <span className="block text-xs text-gray-400">{a.time}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  
  }