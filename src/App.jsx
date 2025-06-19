import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutWithSidebar from "./layouts/LayoutWithSidebar";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Client from "./pages/Clients";
import Login from "./pages/Login";
import Role from "./pages/RolesPage";
import Users from "./pages/Users";
import AccessDenied from "./pages/AccessDenied";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { Users2 } from "lucide-react";
import UserProfile from "./components/profile/UserProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<LayoutWithSidebar />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/help"
              element={
                <PrivateRoute>
                  <Help />
                </PrivateRoute>
              }
            />
            <Route
              path="/client"
              element={
                <PrivateRoute>
                  <Client />
                </PrivateRoute>
              }
            />
            <Route
              path="/roles"
              element={
                <PrivateRoute>
                  <Role />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route path="/perfil" element={<UserProfile />} />
            <Route path="/no-autorizado" element={<AccessDenied />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
