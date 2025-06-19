import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token);
        navigate('/');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch {
      setError('Error de conexión, intenta más tarde.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfcfd] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-purple-100 rounded-full top-[-5rem] left-[-5rem] z-0 blur-3xl opacity-30"></div>
      <div className="absolute w-72 h-72 bg-purple-200 rounded-full bottom-[-4rem] right-[-4rem] z-0 blur-2xl opacity-30"></div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg z-10 p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-2">¡Bienvenido de nuevo!</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Ingresa tus datos para acceder al sistema.</p>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v0.01L12 13 2 4.01V4z" /><path d="M22 6.24V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6.24l9.4 7.14a1 1 0 001.2 0L22 6.24z" /></svg>
              </span>
              <input
                type="email"
                name="email"
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M4 8a4 4 0 014-4h8a4 4 0 014 4v10a4 4 0 01-4 4H8a4 4 0 01-4-4V8zm12-2H8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2z" clipRule="evenodd" /></svg>
              </span>
              <input
                type="password"
                name="password"
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="********"
              />
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-purple-500 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
            ¿No tienes una cuenta?
            <a href="#" className="text-purple-500 hover:underline font-medium">Regístrate</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;