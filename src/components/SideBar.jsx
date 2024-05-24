import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as Icon from "react-bootstrap-icons";
import { motion } from "framer-motion";

function Sidebar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user, isAdmin } = useAuth(); // Obtener el estado de administrador
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleHomeClick = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/homepage");
    }
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 h-screen lg:relative bg-red-900 ${
        sidebarOpen ? "" : "hidden"
      }`}
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="p-4 lg:w-72 lg:flex lg:flex-col lg:justify-between h-full lg:h-auto">
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
          onClick={handleHomeClick}
        >
          <Icon.HouseFill />
          <span className="text-sm ml-3 text-gray-200 font-bold">Home</span>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
          <Icon.Question />
          <Link to="/manual" className="text-sm ml-3 text-gray-200 font-bold">
            Preguntas
          </Link>
        </div>
        <div className="my-4 bg-gray-600 h-px"></div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
          <Icon.Envelope />
          <Link to="/events" className="text-sm ml-3 text-gray-200 font-bold">
            Solicitar Evento
          </Link>
        </div>
        {isAdmin && (
          <>
            <div className="my-4 bg-gray-600 h-px"></div>
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
                <Icon.People />
                <Link
                  to="/spectators"
                  className="text-sm ml-3 text-gray-200 font-bold"
                >
                  Espectadores
                </Link>
              </div>
            </motion.div>
          </>
        )}
        <div className="my-4 bg-gray-600 h-px"></div>
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
          onClick={() => logout()}
        >
          <Icon.BoxArrowInRight />
          <span className="text-sm ml-3 text-gray-200 font-bold">Log Out</span>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
