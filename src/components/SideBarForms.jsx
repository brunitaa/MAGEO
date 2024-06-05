import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import * as Icon from "react-bootstrap-icons";
import { motion } from "framer-motion";

function SidebarForms() {
  const navigate = useNavigate();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const { isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar abierto por defecto
  const sidebarWidth = sidebarOpen ? "lg:w-202" : "lg:w-12";
  const arrowColor = sidebarOpen ? "text-white" : "text-red-500";

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirige al usuario a la página de inicio después de cerrar sesión
      console.log("Signed out successfully");
    } catch (error) {
      console.log("Error al cerrar sesión:", error.message);
    }
  };

  const handleHomeClick = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/homepage");
    }
  };

  return (
    <>
      <button
        className={`fixed top-4 left-4 z-10 ${arrowColor}`}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <Icon.ChevronLeft /> : <Icon.ChevronRight />}
      </button>
      <motion.aside
        className={`fixed top-0 left-0 h-screen lg:relative ${sidebarWidth} bg-univalleColorOne`}
        initial={{ x: sidebarOpen ? 0 : -300, opacity: sidebarOpen ? 1 : 0 }}
        animate={{ x: sidebarOpen ? 0 : -300, opacity: sidebarOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="my-2 bg-gray-600 h-px"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-2 lg:w-72 lg:flex lg:flex-col lg:justify-between h-full lg:h-auto"
        >
          <motion.div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
            onClick={handleHomeClick}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <Icon.HouseFill />
            <span className="text-sm ml-3 text-gray-200 font-bold transition duration-300">
              Home
            </span>
          </motion.div>
          <div className="my-2 bg-gray-600 h-px"></div>

          <motion.div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <Icon.Envelope />
            <Link
              to="/events"
              className="text-sm ml-3 text-gray-200 font-bold transition duration-300"
            >
              Solicitud de Evento
            </Link>
          </motion.div>
          <div className="my-2 bg-gray-600 h-px"></div>
          <motion.div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
            onClick={toggleSubmenu}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <Icon.Envelope />
            <div className="flex justify-between w-full items-center">
              <span className="text-sm ml-3 text-gray-200 font-bold transition duration-300">
                Logistica y Protocolo
              </span>
              <span
                className={`transform transition-transform duration-200 ${
                  submenuOpen ? "rotate-180" : ""
                }`}
              >
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </motion.div>
          {submenuOpen && (
            <motion.div
              className="pl-8 mt-2 space-y-2"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <Link
                to="/user/logistic"
                className="block text-sm text-gray-200 font-bold hover:bg-red-600 rounded-md px-4 py-2 transition duration-300"
              >
                Logística
              </Link>
              <Link
                to="/user/protocol"
                className="block text-sm text-gray-200 font-bold hover:bg-red-600 rounded-md px-4 py-2 transition duration-300"
              >
                Protocolo
              </Link>
            </motion.div>
          )}
          <div className="my-2 bg-gray-600 h-px"></div>
          <motion.div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <Icon.Envelope />
            <Link
              to="/advertisingPiece"
              className="text-sm ml-3 text-gray-200 font-bold transition duration-300"
            >
              Pieza Publicitaria
            </Link>
          </motion.div>
          <div className="my-2 bg-gray-600 h-px"></div>

          <motion.div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
            onClick={handleLogout}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-sm ml-3 text-gray-200 font-bold transition duration-300">
              Log Out
            </span>
          </motion.div>
        </motion.div>
      </motion.aside>
    </>
  );
}

export default SidebarForms;
