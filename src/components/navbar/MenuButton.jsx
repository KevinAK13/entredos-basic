import React, { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import { LiaBarsSolid } from "react-icons/lia";
import { AnimatePresence } from "framer-motion"; // Asegúrate de importar AnimatePresence

const Button = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="flex items-center px-4 py-1.5 text-white text-2xl"
      >
        <LiaBarsSolid className="mr-2" />
        Menu
      </button>
      <AnimatePresence>
        {isSidebarOpen && <SidebarMenu onClose={toggleSidebar} />}
      </AnimatePresence>
    </div>
  );
};

export default Button;
