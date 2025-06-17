import { FaHandsHelping } from "react-icons/fa";

export default function Help() {
  const integrantes = [
    { nombre: "Alvaro Cesar Diaz Chang", codigo: "I202224528" },
    { nombre: "Brayan Smith Cordova Tasayco", codigo: "I202221331" },
    { nombre: "Jean Paul Davila Manrique", codigo: "I233498223" },
    { nombre: "Johan Jair Monge Ruiz", codigo: "I202224539" },
    { nombre: "Pool Matias Espinoza Grandos", codigo: "I202224426" },
    { nombre: "Daniel Rolando Pizarro Quispe", codigo: "I202224275" },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <FaHandsHelping className="text-purple-600 text-3xl" />
        <h1 className="text-3xl font-bold text-purple-700">Información del Proyecto</h1>
      </div>

      <p className="text-gray-600 mb-6 text-lg">
        Estos son los integrantes que desarrollaron este proyecto:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {integrantes.map((i, idx) => (
          <div
            key={idx}
            className="bg-white shadow-sm rounded-xl p-4 border border-gray-100 hover:shadow-md transition duration-300"
          >
            <h2 className="font-semibold text-lg text-gray-800">{i.nombre}</h2>
            <p className="text-sm text-gray-500 mt-1">{i.codigo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
