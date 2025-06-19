export default function ProfileHeader({ user }) {
    return (
      <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
        <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-semibold"><span className="text-purple-700">{user.name}</span></h2>
          <p className="text-sm text-gray-500">{user.role?.name}</p>
        </div>
      </div>
    );
  }
  