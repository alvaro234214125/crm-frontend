import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Client from "./pages/Clients";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/help" element={<Help />} />
          <Route path="/client" element={<Client />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
