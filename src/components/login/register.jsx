import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/img/pc4.jpg';
import apiRequest from '../../lib/apiRequest';

const RegisterForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    if (newPassword) {
      setConfirmPasswordVisible(true);
    } else {
      setConfirmPasswordVisible(false);
    }
    setPasswordsMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (passwordError) {
      alert('Por favor, corrige los errores en la contraseña.');
      return;
    }

    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");

    try {
      const res = await apiRequest.post("/auth/register", { username, email, password }, { withCredentials: true });
      console.log(res.data);
      alert('¡Registro exitoso!');
      navigate('/login');
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 bg-white">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-4xl font-light text-gray-900">Únete a nosotros</h1>
          <p className="mt-4 text-gray-700">
            Regístrate para ver nuestras propiedades exclusivas.
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
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Correo Electrónico</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border-b border-gray-800 p-4 text-sm placeholder-gray-500 font-extralight focus:outline-none focus:border-black"
                placeholder="Correo Electrónico"
                required
                autoComplete="email"
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
                onChange={handlePasswordChange}
                required
                autoComplete="new-password"
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
            {passwordError && (
              <p className="text-black font-extralight text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${confirmPasswordVisible ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <label htmlFor="confirm-password" className="sr-only">Confirmar Contraseña</label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="confirm-password"
                name="confirmPassword"
                className={`w-full border-b p-4 text-sm placeholder-gray-500 font-extralight focus:outline-none ${passwordsMatch ? 'border-gray-800 focus:border-black' : 'border-black focus:border-black'}`}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                autoComplete="new-password"
              />
            </div>
            {!passwordsMatch && confirmPassword && (
              <p className="text-black font-extralight text-xs mt-2">Las contraseñas no coinciden.</p>
            )}
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
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Cargando...
                </span>
              ) : (
                'Registrarse'
              )}
            </button>
          </div>

          <div className="flex items-center justify-center mt-4">
            <p className="text-sm text-gray-700">
              ¿Ya tienes una cuenta?
              <a className="underline text-gray-900 ml-1" href="/login">Inicia sesión</a>
            </p>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Únete a Uribe Immobilien"
          src={img}
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
      </div>
    </section>
  );
};

export default RegisterForm
