import { useState, useEffect } from "react";

export default function RoleFormModal({ visible, onClose, onSubmit, initialData }) {
  const [name, setName] = useState("");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
    } else {
      setName("");
    }
  }, [initialData]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setShowContent(true), 10);
    } else {
      setShowContent(false);
    }
  }, [visible]);

  if (!visible) return null;

  const handleClose = () => {
    setShowContent(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        showContent ? "bg-black/30" : "bg-black/0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg w-full max-w-sm shadow-xl transform transition-all duration-300
        ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Editar Rol" : "Nuevo Rol"}
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del rol"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (name.trim() === "") return;
              const data = {
                id: initialData?.id || null,
                name,
              };
              onSubmit(data);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {initialData ? "Actualizar" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}
