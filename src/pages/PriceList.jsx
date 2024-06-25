// pages/PriceList.jsx
import React, { useState } from "react";
import Section from "../components/Section";
import SidebarForms from "../components/SideBarForms";

const PriceList = () => {
  const mobiliarioYServicios = [
    { detail: "Faldón para mesa de 10 personas", unit: "pieza", price: 25 },
    {
      detail: "Juego de vajillas para almuerzo (por persona)",
      unit: "conjunto",
      price: 18,
    },
    {
      detail: "Juego de vajillas para desayuno (por persona)",
      unit: "conjunto",
      price: 12,
    },
    { detail: "Mantel para mesa de 10 personas", unit: "pieza", price: 20 },
    { detail: "Mesa cuadrada de plástico", unit: "pieza", price: 10 },
    { detail: "Mesa rectangular para 10 personas", unit: "pieza", price: 20 },
    { detail: "Silla de plastico", unit: "pieza", price: 2 },
  ];

  const alimentacion = [
    { detail: "Agua personal", unit: "unidad", price: 5 },
    { detail: "Cafe", unit: "unidad", price: 7 },
    { detail: "Café con leche", unit: "unidad", price: 7 },
    { detail: "Cuñape", unit: "unidad", price: 4 },
    { detail: "Empanada integral", unit: "unidad", price: 6 },
    { detail: "Galleta de avena", unit: "unidad", price: 3 },
    { detail: "Medio sándwich de pollo", unit: "unidad", price: 5 },
    { detail: "Panini", unit: "unidad", price: 20 },
    { detail: "Refresco de frutas", unit: "unidad", price: 18 },
    { detail: "Sándwich de pollo", unit: "unidad", price: 10 },
    { detail: "Soda pequeña personal 300 ml", unit: "unidad", price: 2.5 },
    { detail: "Soda personal 500 ml", unit: "unidad", price: 6 },
  ];

  const materialDeApoyo = [
    { detail: "Arreglo floral", unit: "pieza", price: 70 },
    { detail: "Adornos", unit: "pieza", price: 450 },
    { detail: "Souvenirs a comprar", unit: "pieza", price: 50 },
    { detail: "Credenciales personalizados", unit: "pieza", price: 22 },
    { detail: "papelógrafos", unit: "pieza", price: 6 },
    { detail: "marcadores", unit: "pieza", price: 3.5 },
    { detail: "cintas", unit: "pieza", price: 8 },
    { detail: "Boligrafo", unit: "pieza", price: 2 },
    { detail: "lapiz", unit: "pieza", price: 1.5 },
  ];

  const transporte = [
    {
      detail: "Taxi para 4 personas",
      unit: "servicio",
      price: 40,
      observation: "depende de la distancia",
    },
    {
      detail: "Bus de 20 a 24 personas (ida y vuelta)",
      unit: "servicio",
      price: 400,
      observation: "en area urbana",
    },
    {
      detail: "Taxi por hora",
      unit: "servicio",
      price: 50,
      observation: "n/a",
    },
    {
      detail: "Bus de 20 a 24 personas (ida y vuelta)",
      unit: "servicio",
      price: 600,
      observation: "en area rural depende la distancia",
    },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="flex bg-red-100">
      <SidebarForms sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-grow p-10  transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="container mx-auto p-4">
          <div className="bg-white p-4 mb-4 border-t-8 border-univalleColorOne rounded-lg">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
              Precios Preferenciales
            </h1>
            <p className="text-gray-600">
              Por favor, usen como guía estos precios, al momento de llenar los
              formularios de Logística y Protocolo.
            </p>
          </div>
          <Section
            title="MOBILIARIO Y SERVICIOS (ALQUILER/COMPRA)"
            items={mobiliarioYServicios}
          />
          <Section
            title="Alimentación (ALQUILER/COMPRA)"
            items={alimentacion}
          />
          <Section
            title="MATERIAL DE APOYO (ALQUILER/COMPRA)"
            items={materialDeApoyo}
          />
          <Section title="TRANSPORTE (ALQUILER/COMPRA)" items={transporte} />
        </div>
      </div>
    </div>
  );
};

export default PriceList;
