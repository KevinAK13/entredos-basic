import React, { useContext, useState } from 'react';
import { SlArrowLeft, SlMenu, SlArrowDown, SlArrowUp} from "react-icons/sl";
import { LiaSignOutAltSolid } from "react-icons/lia";


import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import avatarPlaceholder from '../../assets/img/avatar.png';

const UserProfile = () => {
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const properties = [
    { src: 'https://placehold.co/300x300', description: 'Propiedad 1' },
    { src: 'https://placehold.co/300x300', description: 'Propiedad 2' },
    { src: 'https://placehold.co/300x300', description: 'Propiedad 3' },
    { src: 'https://placehold.co/300x300', description: 'Propiedad 4' },
    { src: 'https://placehold.co/300x300', description: 'Propiedad 5' },
    { src: 'https://placehold.co/300x300', description: 'Propiedad 6' },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
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
              <a href="/profile" className="flex items-center rounded-lg px-4 py-2 text-sm font-light uppercase text-gray-700 hover:bg-gray-100">
                Propiedades
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center rounded-lg px-4 py-2 text-sm font-light uppercase text-gray-700 hover:bg-gray-100">
                Mensajes
              </a>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <span className="text-sm font-light uppercase">Cuenta</span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <SlArrowDown />
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a href="/profile/update" className="block rounded-lg px-4 py-2 text-sm font-light uppercase text-gray-700 hover:bg-gray-100">
                      Configuración
                    </a>
                  </li>
        
                  <li>
                    <button onClick={handleLogout} className="w-full rounded-lg px-4 py-2 text-sm font-light uppercase text-gray-700 hover:bg-gray-100 flex items-center">
                      <LiaSignOutAltSolid className="mr-2" />
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>

          <div className="mt-auto border-t border-gray-100 pt-4">
            <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
              <img
                alt=""
                src={currentUser?.avatar || avatarPlaceholder}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-light uppercase">
                  <strong className="block font-medium">{currentUser?.username || 'Usuario'}</strong>
                  <span>{currentUser?.email || 'email@example.com'}</span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* UserProfile Content */}
      <div className="lg:ml-64 flex-1 p-4 lg:p-6 mt-16 lg:mt-0">
        <div className="font-roboto bg-white text-black max-w-4xl mx-auto">
          <div className="text-center mt-8">
            <h1 className="text-3xl lg:text-4xl uppercase font-bold">{currentUser?.username}</h1>
            <p className="text-lg lg:text-xl uppercase tracking-tight font-extralight mt-2">Agente</p>
          </div>
          <div className="mt-6 flex flex-col lg:flex-row items-start lg:items-center px-4 lg:px-6">
            <div className="flex-shrink-0 lg:w-1/3">
              <img
                src={currentUser?.avatar || avatarPlaceholder}
                alt={currentUser?.username}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-12 lg:w-2/3">
              <p className="text-xl font-medium uppercase mb-2">Descripción</p>
              <p className="text-base lg:text-lg font-extralight leading-relaxed">
                Kevin Guerra Xochihua es un agente inmobiliario con más de 10 años de experiencia en la industria. Conocido por su dedicación y enfoque en el cliente, ha ayudado exitosamente a numerosas personas a encontrar su hogar ideal.
              </p>
              <div className="mt-6">
                <p className="text-xl font-medium uppercase mb-2">Contacto</p>
                <p className="font-extralight">+52 311 266 6998</p>
                <p className="font-extralight mt-2">{currentUser?.email}</p>
                <p className="font-extralight mt-2">Calle Principal 123, Ciudad, País</p>
              </div>
            </div>
          </div>
          <div className="mt-12 px-4 lg:px-6">
            <h2 className="text-2xl uppercase font-bold mb-4">Propiedades</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {properties.map((property, index) => (
                <div key={index} className="relative">
                  <img
                    src={property.src}
                    alt={`Propiedad ${index + 1}`}
                    className="w-full h-auto object-cover rounded-md"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-md">
                    <p className="text-sm font-light">{property.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
