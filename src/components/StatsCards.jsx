export default function StatsCards({ stats }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm font-medium">{s.label}</h2>
                <p className="text-3xl font-bold">{s.value}</p>
                {s.change && (
                  <p
                    className={`text-sm ${
                      s.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {s.change}
                  </p>
                )}
              </div>
              <div className="text-4xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }