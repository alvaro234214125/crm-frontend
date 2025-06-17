import { Link } from "react-router-dom";

export default function MenuItem({ icon, label, active, collapsed, to }) {
  const content = (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors duration-300 ease-in-out ${
        active ? "bg-purple-100 text-purple-600" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span className="transition-opacity duration-300">{label}</span>}
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}