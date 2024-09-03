import React from "react";
import { motion } from "framer-motion";
import { FiHome, FiUsers, FiFileText, FiFolder, FiX, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const Sidebar = ({ onClose }) => {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-950 text-white w-72 h-screen fixed top-0 left-0 z-50 overflow-y-auto shadow-lg"
    >
      {/* Header con logo y botón de cerrar */}
      <div className="flex justify-between items-center py-8 border-b border-gray-900">

        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <FiX size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-6">
        <ul className="space-y-3">
          <li>
            <a href="/" className="flex items-center p-2 text-white hover:bg-gray-800 rounded-lg">
              <FiHome className="mr-3" />
              Home
            </a>
          </li>

          <li>
            <a href="/properties" className="flex items-center p-2 text-white hover:bg-gray-800 rounded-lg">
              <FiMapPin className="mr-3" />
              Properties
            </a>
          </li>

          <li>
            <a href="/agents" className="flex items-center p-2 text-white hover:bg-gray-800 rounded-lg">
              <FiUsers className="mr-3" />
              Agents
            </a>
          </li>

          <li>
            <a href="/services" className="flex items-center p-2 text-white hover:bg-gray-800 rounded-lg">
              <FiFileText className="mr-3" />
              Services
            </a>
          </li>
          
          <li>
            <a href="/contact" className="flex items-center p-2 text-white hover:bg-gray-800 rounded-lg">
              <FiPhone className="mr-3" />
              Contact Us
            </a>
          </li>

          <li>
            <a href="/about" className="flex items-center p-2 text-white hover:bg-gray-800 rounded-lg">
              <FiFolder className="mr-3" />
              About Us
            </a>
          </li>
          
          <li>
            <a href="/newsletter" className="flex items-center p-2 text-white hover:bg-gray-800 rounded-lg">
              <FiMail className="mr-3" />
              Newsletter
            </a>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
