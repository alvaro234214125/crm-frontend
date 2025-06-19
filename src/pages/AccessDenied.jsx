import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center h-screen animate-fade-in">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <div className="text-red-400 mb-4 text-6xl flex justify-center">
          <FaLock />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Acceso denegado</h1>
        <p className="text-gray-600 mb-6">No tienes permisos para ver esta página.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg bg-red-400 text-white font-semibold hover:bg-red-500 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </main>
  );
}
