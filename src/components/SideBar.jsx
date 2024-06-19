import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as Icon from "react-bootstrap-icons";
import { motion } from "framer-motion";

function Sidebar({ sidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();

  const handleHomeClick = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/homepage");
    }
  };

  const sidebarWidth = sidebarOpen ? "w-64" : "w-20"; // Ajuste de ancho
  const arrowColor = sidebarOpen ? "text-white" : "text-univalleColorOne";

  return (
    <>
      <motion.button
        className={`fixed top-4 left-4 z-20 ${arrowColor}`}
        onClick={toggleSidebar}
        style={{ zIndex: 1000 }} // Asegurar que el botón esté por encima del sidebar
      >
        {sidebarOpen ? <Icon.ChevronLeft /> : <Icon.ChevronRight />}
      </motion.button>
      <motion.div
        className={`fixed top-0 left-0 h-screen ${sidebarWidth} bg-univalleColorOne z-10`}
        style={{ overflowY: "auto" }} // Hacer el sidebar scrollable
        initial={{ x: sidebarOpen ? 0 : -300, opacity: sidebarOpen ? 1 : 0 }}
        animate={{ x: sidebarOpen ? 0 : -300, opacity: sidebarOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="p-4 flex flex-col justify-between h-full">
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-univalleColorOne text-white"
            onClick={handleHomeClick}
          >
            <Icon.HouseFill />
            {sidebarOpen && (
              <span className="text-sm ml-3 text-gray-200 font-bold">Home</span>
            )}
          </div>

          <div className="my-4 bg-gray-600 h-px"></div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-univalleColorOne text-white">
            <Icon.Envelope />
            {sidebarOpen && (
              <Link
                to="/events"
                className="text-sm ml-3 text-gray-200 font-bold"
              >
                Solicitar Evento
              </Link>
            )}
          </div>
          <div className="my-4 bg-gray-600 h-px"></div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-univalleColorOne text-white">
            <Icon.Calendar2 />
            {sidebarOpen && (
              <Link
                to="/calendar"
                className="text-sm ml-3 text-gray-200 font-bold"
              >
                Calendario
              </Link>
            )}
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
                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-univalleColorOne text-white">
                  <Icon.People />
                  {sidebarOpen && (
                    <Link
                      to="/spectators"
                      className="text-sm ml-3 text-gray-200 font-bold"
                    >
                      Espectadores
                    </Link>
                  )}
                </div>
              </motion.div>
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
                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-univalleColorOne text-white">
                  <Icon.People />
                  {sidebarOpen && (
                    <Link
                      to="/formularios"
                      className="text-sm ml-3 text-gray-200 font-bold"
                    >
                      Formularios
                    </Link>
                  )}
                </div>
              </motion.div>
            </>
          )}
          <div className="my-4 bg-gray-600 h-px"></div>
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-univalleColorOne text-white"
            onClick={() => logout()}
          >
            <Icon.BoxArrowInRight />
            {sidebarOpen && (
              <span className="text-sm ml-3 text-gray-200 font-bold">
                Sierre Sesión
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Sidebar;
