import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as Icon from "react-bootstrap-icons";
import { motion } from "framer-motion";

function SidebarForms({ sidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();
  const [submenuOpen, setSubmenuOpen] = useState(false); // Estado para controlar el submenu

  const handleHomeClick = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/homepage");
    }
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
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
        <div className="my-2 bg-gray-600 h-px"></div>
        <div className="p-2 lg:flex lg:flex-col lg:justify-between h-full lg:h-auto">
          <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-univalleColorOne text-white"
            onClick={handleHomeClick}
          >
            <Icon.HouseFill />
            <span className="text-sm ml-3 text-gray-200 font-bold transition duration-300">
              Home
            </span>
          </div>
          <div className="my-2 bg-gray-600 h-px"></div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-univalleColorOne text-white">
            <Icon.Envelope />
            <Link
              to="/events"
              className="text-sm ml-3 text-gray-200 font-bold transition duration-300"
            >
              Solicitud de Evento
            </Link>
          </div>
          <div className="my-2 bg-gray-600 h-px"></div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-univalleColorOne text-white">
            <Icon.Envelope />
            <div
              className="flex justify-between w-full items-center"
              onClick={toggleSubmenu}
            >
              <span className="text-sm ml-3 text-gray-200 font-bold transition duration-300">
                Logistica y Protocolo
              </span>
              <span
                className={`transform duration-200 ${
                  submenuOpen ? "rotate-180" : ""
                }`}
              >
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          {submenuOpen && (
            <div className="pl-8 mt-2 space-y-2">
              <Link
                to="/user/logistic"
                className="block text-sm text-gray-200 font-bold hover:bg-univalleColorOne rounded-md px-4 py-2 transition duration-300"
              >
                Logística
              </Link>
              <Link
                to="/user/protocol"
                className="block text-sm text-gray-200 font-bold hover:bg-univalleColorOne rounded-md px-4 py-2 transition duration-300"
              >
                Protocolo
              </Link>
            </div>
          )}

          <div className="my-2 bg-gray-600 h-px"></div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-univalleColorOne text-white">
            <Icon.Envelope />
            <Link
              to="/advertisingPiece"
              className="text-sm ml-3 text-gray-200 font-bold transition duration-300"
            >
              Pieza Publicitaria
            </Link>
          </div>
          <div className="my-2 bg-gray-600 h-px"></div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-univalleColorOne text-white">
            <Icon.BoxArrowInRight />
            <span
              className="text-sm ml-3 text-gray-200 font-bold"
              onClick={() => logout()}
            >
              Cierre Sesión
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default SidebarForms;
