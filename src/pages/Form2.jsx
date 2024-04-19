import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import {Card} from "../components/ui/Card";
import {Label} from "../components/ui/Label";
import  Logistica  from "./Logistica/Logistica";
import Protocolo from "./Protocolo/Protocolo";
import SidebarForms from "../components/SideBarForms";
import Mobiliario from "./Logistica/Mobiliario";
import MobiliarioAlquiler from "./Logistica/MobiliarioAlquiler";
import MaterialApoyo from "./Logistica/MaterialApoyo";
import MaterialApoyoAlquiler from "./Logistica/MaterialApoyoAlquiler";
import Alimentacion from "./Logistica/Alimentacion";
import AlimentacionAlquiler from "./Logistica/AlimentacionAlquiler";
import Disertante from "./Logistica/Disertante";
import Transporte from "./Logistica/Transporte";

function Form2() {
  const { eventId } = useParams();
  
  const [eventData, setEventData] = useState(null);
  const navigate = useNavigate();
  const [isOpenGeneral, setIsOpenGeneral] = useState(false);
  const [isOpenProtocolo, setIsOpenProtocolo] = useState(false);
  const [isOpenLogistics, setIsOpenLogistics] = useState(false);
  const [Ítems, setÍtems] = useState([{ ÍtemName: "", quantity: 0, observations: "" }]);

  const toggleGeneralAccordion = () => {
    setIsOpenGeneral(!isOpenGeneral);
  };

  const handleRedirect = () => {
    navigate(`/form3/${eventId}`);
  };

  const toggleProtocoloAccordion = () => {
    setIsOpenProtocolo(!isOpenProtocolo);
  };

  const toggleLogisticsAccordion = () => {
    setIsOpenLogistics(!isOpenLogistics);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
        console.log("user is logged out");
      }
    });
  }, [navigate]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const db = getFirestore();
        const eventRef = doc(db, "eventos", eventId);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          const data = eventSnap.data();
          setEventData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "eventos", eventId), {
      });
      alert("Evento actualizado correctamente!");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Ocurrió un error al actualizar el evento. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  if (!eventData) {
    return <div className="flex">
       

    <SidebarForms eventId={eventId} /><h1 className="text-3xl font-bold mb-4">Debe llenar el Formulario 1 primero</h1> </div>;
  }

  return (
    <div className="flex">      

       <SidebarForms eventId={eventId} />

    <section className=" flex-grow min-w-screen max-h-md flex justify-center Ítems-center">
      <div className="min-w-screen">
        <form style={{ margin: '10px 20px'}} className="min-w-screen bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4 max-w-4xl mx-auto" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-4">Formulario de Logística, Protocolo y Comunicación</h1>          
            <Card>
              <h3 className="text-3xl font-bold mb-4">1. Datos Generales del Evento</h3>
              <div className="grid grid-cols-2 gap-4 w-full h-full">
                <div className="mb-4">
                  <Label className="block text-red-900 text-sm font-bold mb-2" htmlFor="eventName">
                    Nombre del Evento
                  </Label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventName"
                    type="text"
                    placeholder="Nombre del Evento"
                    defaultValue={eventData.nombre_evento}
                    required
                    readOnly />
                </div>
                <div className="mb-4">
                  <Label className="block text-red-900 text-sm font-bold mb-2" htmlFor="eventDate">
                    Fecha de Solicitud
                  </Label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="requestDate"
                    type="date"
                    defaultValue={eventData.fecha_solicitud}
                    readOnly />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventSede">
                    Sede
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventSede" type="text" defaultValue={"SCZ"} readOnly />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requesterName">
                    Nombre del Solicitante
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="requesterName" type="text" placeholder="Nombre del Solicitante"
                    defaultValue={eventData.nombre_solicitante}
                    readOnly
                    required />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requesterDepartment">
                    Unidad o Departamento Solicitante
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="requesterDepartment" type="text" placeholder="Unidad o Departamento Solicitante"
                    defaultValue={eventData.unidad_solicitante}
                    readOnly
                    required />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
                    Fecha del Evento
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventDate" type="date"
                    defaultValue={eventData.fecha_evento}
                    readOnly
                    required />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTime">
                    Horario del Evento
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventTime" type="time" required
                    defaultValue={eventData.hora_evento} readOnly />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internalLocation">
                    Lugar o Medio Interno del Evento
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventInPlace"
                    defaultValue={eventData.lugar_interno} readOnly>
                  </input>
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="externalLocation">
                    Lugar o Medio Externo del Evento
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="externalLocation" type="text" defaultValue={eventData.lugar_externo} readOnly />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full h-full">
                <div className=" mb-4 ">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactPerson">
                    Persona de Contacto/Coordinador
                  </Label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="contactPerson"
                    defaultValue="Persona de contacto" />
                </div>
                <div className="w-full sm:w-auto">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cel">
                    Celular
                  </Label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="cel"
                    type="text"
                    defaultValue="Celular" />
                </div>
              </div>
            </Card>
            <br></br>
           

            <Card>
                <h1 className="text-3xl font-bold mb-4"> II. Logistica</h1>
                <Mobiliario></Mobiliario>
                <MobiliarioAlquiler></MobiliarioAlquiler>
                <MaterialApoyo></MaterialApoyo>
                <MaterialApoyoAlquiler></MaterialApoyoAlquiler>
                <Alimentacion></Alimentacion>
                <AlimentacionAlquiler></AlimentacionAlquiler>
                <Disertante></Disertante>
                <Transporte></Transporte>
              

            
            </Card>
            <br></br>
            <Card>
                <h1 className="text-3xl font-bold mb-4"> III. Protocolo</h1>
                <Protocolo></Protocolo>
              

            
            </Card>
            <div className="flex Ítems-center justify-between mt-4">
              <button className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              style={{ margin: '10px 20px' }} 
              >                
                Guardar Cambios
              </button>             
            </div>
        </form>
      </div>
    </section>
    </div>
  );
}

export default Form2;
