import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutWithSidebar from "./layouts/LayoutWithSidebar";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Client from "./pages/Clients";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<LayoutWithSidebar />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/help" element={<Help />} />
          <Route path="/client" element={<Client />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
