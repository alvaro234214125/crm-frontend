import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function LayoutWithSidebar() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
