import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import { Navbar } from "./components/Navbar";
import HomePage from "./pages/HomePage";
import  LoginPage  from "./pages/LoginPage";
import Form1 from "./pages/Form1";
import Form2 from "./pages/Form2";
import HomePage2 from "./pages/HomePage2";
import Manual from "./pages/Manual";
import HomePageAdmin from "./admin/HomePageAdmin";
import RequestReview from "./admin/RequestReview";
import { useEffect } from "react";
import { app, db } from "./firebase"; 
import EventDetailsPage from "./admin/EventRequestRevie";
import EditRequestPage from "./pages/Editar";
import Form3 from "./pages/Form3";
import Sidebar from "./components/SideBar";
import Logistica from "./pages/Logistica/Logistica";
import Protocolo from "./pages/Protocolo/Protocolo";
import RequerimientosServicios from "./pages/Protocolo/RequerimientosServicios";
import Inauguracion from "./pages/Protocolo/Inauguracion";
import Clausura from "./pages/Protocolo/Clausura";
import Mobiliario from "./pages/Logistica/Mobiliario";
import MobiliarioAlquiler from "./pages/Logistica/MobiliarioAlquiler";
import MaterialApoyo from "./pages/Logistica/MaterialApoyo";
import MaterialApoyoAlquiler from "./pages/Logistica/MaterialApoyoAlquiler";
import Transporte from "./pages/Logistica/Transporte";
import Disertante from "./pages/Logistica/Disertante";
import Alimentacion from "./pages/Logistica/Alimentacion";
import AlimentacionAlquiler from "./pages/Logistica/AlimentacionAlquiler";

function App() {
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar></Navbar>
        <main className="flex-grow min-h-screen">
          <div className="mx-auto px-10 md:px-0 min--screen">
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/loginPage" element={<LoginPage />} />
              <Route path="/form1" element={<Form1 />} />
              <Route path="/homepage" element={<HomePage2 />} />
              <Route path="/manual" element={<Manual />} />
              <Route path="/admin/homepage" element={<HomePageAdmin />} />
              <Route path="/review" element={<RequestReview />} />
              <Route path="/form2/:eventId" element={<Form2 />} />
              <Route path="/form3/:eventId" element={<Form3 />} />
              <Route path="/logistica/:eventId" element={<Logistica />} />
              <Route path="/protocolo/:eventId" element={<Protocolo />} />
              <Route path="/protocolo/requerimientos" element={<RequerimientosServicios />} />
              <Route path="/protocolo/inauguracion" element={<Inauguracion />} />
              <Route path="/protocolo/clausura" element={<Clausura/>} />
              <Route path="/logistica/mobiliario" element={<Mobiliario/>} />
              <Route path="/logistica/mobiliarioAlquiler" element={<MobiliarioAlquiler/>} />
              <Route path="/logistica/material" element={<MaterialApoyo/>} />
              <Route path="/logistica/materialAlquiler" element={<MaterialApoyoAlquiler/>} />
              <Route path="/logistica/transporte" element={<Transporte/>} />
              <Route path="/logistica/disertante" element={<Disertante/>} />
              <Route path="/logistica/alimentacion" element={<Alimentacion/>} />
              <Route path="/logistica/alimentacionAlquiler" element={<AlimentacionAlquiler/>} />
              <Route path="/event/:eventId" element={<EventDetailsPage eventoSeleccionado={eventoSeleccionado} />} /> 
              <Route path="/edit-request/:eventId" element={<EditRequestPage  eventoSeleccionado={eventoSeleccionado} />} /> {/* Agrega esta ruta */}
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
