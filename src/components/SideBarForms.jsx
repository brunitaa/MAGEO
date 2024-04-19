import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import * as Icon from 'react-bootstrap-icons';

function SidebarForms({ eventId }) {
    
  const navigate = useNavigate();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuProtocolo, setSubmenuProtocolo] = useState(false);
  const [submenuLogistica, setSubmenuLogistica] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar abierto por defecto

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };
  const toggleProtocolo = () => {
    setSubmenuProtocolo(!submenuProtocolo);
  };
  const toggleLogistica = () => {
    setSubmenuLogistica(!submenuLogistica);
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

  return (
    <aside className={` fixed top-0 bottom-0 lg:relative  bg-red-900 ${sidebarOpen ? '' : 'hidden'}`}>
    <div className="my-2 bg-gray-600 h-px"></div>
      <div className="p-2 lg:w-72 lg:flex lg:flex-col lg:justify-between h-full lg:h-auto">
              <div className="text-gray-100 text-xl">
                  <div className="p-2.5 mt-1 flex Ítems-center">
                      <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-red-800"></i>
                      <h1 className="font-bold text-gray-200 text-sm ml-3">SIEGEMUV</h1>
                      
                  </div>
                  <div className="my-2 bg-gray-600 h-px"></div>
              </div>
              <div className="p-2.5 mt-3 flex Ítems-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
              <Icon.HouseFill/>
                  <Link to="/homepage" className="text-sm ml-3 text-gray-200 font-bold">Home</Link>
              </div>
              <div className="my-2 bg-gray-600 h-px"></div>
              <div className="p-2.5 mt-3 flex Ítems-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
              <Icon.Envelope/>
                  <Link to="/form1" className="text-sm ml-3 text-gray-200 font-bold">Form 1</Link>
              </div>
              <div className="my-2 bg-gray-600 h-px"></div>             
              <div className="p-2.5 mt-3 flex Ítems-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white" onClick={toggleSubmenu}>
              <Icon.Envelope/>
                  <div className="flex justify-between w-full Ítems-center">
                  <Link to={`/form2/${eventId}`}  className="text-sm ml-3 text-gray-200 font-bold">Formulario 2</Link>
                      <span className={`text-sm ${submenuOpen ? 'rotate-180' : ''}`} id="arrow">
                          <i className="bi bi-chevron-down"></i>
                      </span>
                  </div>
              </div>
              
              <div className="my-2 bg-gray-600 h-px"></div>

              <div className="p-2.5 mt-3 flex Ítems-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
              <Icon.Envelope/>
                  <Link to={`/form3/${eventId}`}  className="text-sm ml-3 text-gray-200 font-bold">Form 3</Link>
              </div>
              <div className="my-2 bg-gray-600 h-px"></div>
          </div><div className="p-2.5 mt-3 flex Ítems-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white" onClick={handleLogout}>
              <i className="bi bi-box-arrow-in-right"></i>
              <span className="text-sm ml-3 text-gray-200 font-bold">Log Out</span>
          </div>
    </aside>
  );
}

export default SidebarForms;
