import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as Icon from "react-bootstrap-icons";
import { motion } from "framer-motion";

function Sidebar() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated, logout, user, isAdmin } = useAuth();

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

  const sidebarWidth = sidebarOpen ? "lg:w-202" : "lg:w-12";
  const arrowColor = sidebarOpen ? "text-white" : "text-red-500";

  return (
    <>
      <motion.button
        className={`fixed top-4 left-4 z-10 ${arrowColor}`}
        onClick={toggleSidebar}
        style={{ zIndex: 1000 }} // Añadido para asegurar que el botón esté por encima del sidebar
      >
        {sidebarOpen ? <Icon.ChevronLeft /> : <Icon.ChevronRight />}
      </motion.button>
      <br></br>
      <motion.div
        className={`fixed top-0 left-0 h-screen lg:relative ${sidebarWidth} bg-univalleColorOne`}
        style={{ position: "fixed", overflowY: "auto" }} // Añadido para hacer el sidebar scrollable
        initial={{ x: sidebarOpen ? 0 : -300, opacity: sidebarOpen ? 1 : 0 }}
        animate={{ x: sidebarOpen ? 0 : -300, opacity: sidebarOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="p-4 lg:flex lg:flex-col lg:justify-between h-full lg:h-auto">
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
                initial={{
                  x: sidebarOpen ? 0 : -300,
                  opacity: sidebarOpen ? 1 : 0,
                }}
                animate={{
                  x: sidebarOpen ? 0 : -300,
                  opacity: sidebarOpen ? 1 : 0,
                }}
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
            <span className="text-sm ml-3 text-gray-200 font-bold">
              Log Out
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Sidebar;
