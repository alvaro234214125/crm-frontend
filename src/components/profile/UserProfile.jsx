import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import { useAuth } from "../../context/AuthContext";

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="p-6  min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <ProfileHeader user={user} />
        <ProfileForm user={user} />
      </div>
    </div>
  );
}
