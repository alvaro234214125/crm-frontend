import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import { useAuth } from "../../context/AuthContext";
import Topbar from "../Topbar";

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Topbar />

      <div className="flex flex-col lg:flex-row gap-6 ">
        <div className="w-full lg:w-[60%] bg-white rounded-xl shadow-lg p-6 space-y-6">
          <ProfileHeader user={user} />
          <ProfileForm user={user} />
        </div>

        <aside className="w-full lg:w-[40%] bg-white rounded-xl shadow-md p-6 space-y-4">
          <h3 className="text-lg font-semibold">Información adicional</h3>
          <ul className="text-sm text-gray-600 list-disc pl-4 space-y-2">
            <li>Último inicio de sesión: 18 de junio, 10:32 AM</li>
            <li>Estado de la cuenta: Activa</li>
            <li>Rol: {user?.role?.name || "Sin rol"}</li>
            <li>Verificación de correo: ✅</li>
            <li>Historial de cambios</li>
            <li>Preferencias del usuario</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
