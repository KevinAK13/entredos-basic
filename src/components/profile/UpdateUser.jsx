import React, { useContext, useState } from 'react';
import { SlArrowLeft, SlMenu, SlArrowDown } from "react-icons/sl";
import { LiaSignOutAltSolid } from "react-icons/lia";
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import avatarPlaceholder from '../../assets/img/avatar.png';

const UserProfile = () => {
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    avatar: currentUser?.avatar || '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: URL.createObjectURL(file) });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...formData };
      if (!formData.password) {
        delete updatedUser.password; // Do not update password if it's not filled
      }
      // Make API request to update user data
      await apiRequest.put(`/users/${currentUser.id}`, updatedUser);
      updateUser(updatedUser);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* Mobile Header with Toggle Button */}
      <div className="flex items-center justify-between lg:hidden bg-white p-4 border-b border-gray-200">
        <span className="text-xl font-bold uppercase">URIBE IMMOBILIEN</span>
        <button
          className="text-gray-500 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <SlMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full lg:w-64 bg-white border-r border-gray-200 z-40 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex h-screen flex-col justify-between bg-white p-4 lg:p-6 sidebar-content overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-center text-2xl font-bold uppercase text-stone-800 mb-4">
              URIBE IMMOBILIEN
            </span>
            <button
              className="lg:hidden text-gray-500 focus:outline-none"
              onClick={() => setIsSidebarOpen(false)}
            >
              <SlArrowLeft size={24} />
            </button>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="/profile" className="flex items-center px-4 py-2 text-sm uppercase text-gray-700 hover:bg-gray-100">
                Propiedades
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-sm uppercase text-gray-700 hover:bg-gray-100">
                Mensajes
              </a>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span className="text-sm uppercase">Cuenta</span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <SlArrowDown />
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a href="/profile/update" className="block px-4 py-2 text-sm uppercase text-gray-700 hover:bg-gray-100">
                      Configuración
                    </a>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full px-4 py-2 text-sm uppercase text-gray-700 hover:bg-gray-100 flex items-center">
                      <LiaSignOutAltSolid className="mr-2" />
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>

          <div className="mt-auto border-t border-gray-100 pt-4">
            <a href="#" className="flex items-center gap-1 p-4 hover:bg-gray-50">
              <img
                alt=""
                src={formData.avatar || avatarPlaceholder}
                className="h-10 w-10 object-cover"
              />
              <div>
                <p className="text-xs uppercase">
                  <strong className="block">{formData.username || 'Usuario'}</strong>
                  <span>{formData.email || 'email@example.com'}</span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* UserProfile Content */}
      <div className="lg:ml-64 flex-1 p-4 lg:p-6 mt-16 lg:mt-0">
        <div className="max-w-4xl mx-auto text-black">
          <div className="text-center mt-8">
            <h1 className="text-3xl lg:text-4xl font-bold uppercase">Editar Perfil</h1>
            <p className="text-lg lg:text-xl mt-2 uppercase">Actualiza tu información</p>
          </div>

   <div className="flex flex-col mt-12 items-center">
              <label className="text-sm font-medium uppercase mb-2">Foto de Perfil</label>
              <div className="relative">
                <img
                  src={formData.avatar || avatarPlaceholder}
                  alt="User avatar"
                  className="w-32 h-32 object-cover rounded-full border border-black"
                />
                <label
                  htmlFor="avatarUpload"
                  className="absolute bottom-0 right-0 bg-black text-white text-xs p-1 cursor-pointer"
                >
                  Cambiar
                </label>
                <input
                  type="file"
                  id="avatarUpload"
                  name="avatar"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

          <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium uppercase">Nombre</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 p-2 border-b border-black focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium uppercase">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 border-b border-black focus:outline-none"
              />
            </div>

         

            <div className="flex flex-col">
              <label className="text-sm font-medium uppercase">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 p-2 border-b border-black focus:outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 uppercase text-black border border-black hover:bg-black hover:text-white transition-all"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
