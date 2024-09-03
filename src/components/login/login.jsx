import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/img/pc4.jpg';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiRequest.post("/auth/login", { username, password }, { withCredentials: true });

      updateUser(res.data.user);

      alert('¡Inicio de sesión exitoso!');
      navigate('/');  // Redirige al home después de iniciar sesión exitosamente
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 bg-white">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-4xl font-light text-gray-900">Inicia sesión</h1>
          <p className="mt-4 text-gray-700">
            Accede a tu cuenta para ver nuestras propiedades exclusivas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-6">
          <div>
            <label htmlFor="username" className="sr-only">Nombre de Usuario</label>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border-b border-gray-800 p-4 text-sm placeholder-gray-500 font-extralight focus:outline-none focus:border-black"
                placeholder="Nombre de Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full border-b border-gray-800 p-4 text-sm placeholder-gray-500 font-extralight focus:outline-none focus:border-black"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              {password && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer transition-opacity duration-300 ease-in-out" onClick={togglePasswordVisibility}>
                  {passwordVisible ? (
                    <span className="text-gray-800 text-xs uppercase transition-opacity duration-300 ease-in-out opacity-100">Ocultar</span>
                  ) : (
                    <span className="text-gray-800 text-xs uppercase transition-opacity duration-300 ease-in-out opacity-100">Mostrar</span>
                  )}
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className="text-black font-extralight text-xs">
              {error}
            </div>
          )}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="inline-block bg-black px-5 py-2 tracking-tagline text-sm rounded-sm font-light uppercase text-white transition-all duration-300 hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.48 0 0 6.48 0 12h4z"></path>
                  </svg>
                  <span className="ml-2">Iniciando...</span>
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
        <img
          alt="Bienes Raíces"
          src={img}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default LoginForm;
