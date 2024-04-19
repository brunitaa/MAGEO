import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui";
import { onAuthStateChanged,  getAuth  } from "firebase/auth";
import { auth , db} from '../firebase';
import { useNavigate } from 'react-router-dom'; 
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore"; 
import SidebarForms from "../components/SideBarForms";
import {Label} from "../components/ui/Label";

function Form1() {
  const [currentDate, setCurrentDate] = useState(getCurrentDate()); 
  const navigate = useNavigate();
  const [eventId, setEventId] = useState(null);

  const [evento, setEvento] = useState({ fecha: "" });

  const handleChange = (e) => {
    setEvento({ fecha: e.target.value });
  };

  

  const [userRequests, setUserRequests] = useState([]);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("uid", uid)
        } else {
          navigate("/")
          console.log("user is logged out")
        }
      });
     
}, [])

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("uid", uid)
        } else {
          navigate("/")
          console.log("user is logged out")
        }
      });
     
}, [])

const handleRedirect = () => {
  navigate(`/form2/${eventId}`);
};

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

const db = getFirestore();

const handleSubmit = async (event) => {
  event.preventDefault();

  const auth = getAuth();
  const user = auth.currentUser;
  const userID = user.uid;

  // Extract form data
  const formData = {
    userID: userID,
    alcance: event.target.alcance.value,
    area: event.target.area.value,
    coordinacion: event.target.coordination.value,
    descripcion: event.target.eventDescription.value,
    dirigido: event.target.targetAudience.value,
    estado: "Pendiente",
    fecha_evento: event.target.eventDate.value,
    fecha_solicitud: event.target.requestDate.value,
    hora_evento: event.target.eventTime.value,
    lugar_externo: event.target.externalLocation.value,
    lugar_interno: event.target.eventInPlace.value,
    modalidad: event.target.eventMode.value,
    nombre_evento: event.target.eventName.value,
    nombre_solicitante: event.target.requesterName.value,
    objetivo: event.target.activityObjective.value,
    sede: event.target.eventSede.value,
    tipo_evento: event.target.eventType.value,
    unidad_solicitante: event.target.requesterDepartment.value,
  };

  const fechaEvento = new Date(event.target.eventDate.value);
  const fechaSolicitud = new Date();
  const unaSemanaEnMS = 7 * 24 * 60 * 60 * 1000; // Una semana en milisegundos

  if (fechaEvento - fechaSolicitud < unaSemanaEnMS) {
    alert("No se puede enviar la solicitud cuando falta menos de una semana para el evento.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "eventos"), formData);
    setEventId(docRef.id);
    alert("Solicitud enviada correctamente!");

    // Convertir el objeto formData a JSON
    const formDataJSON = JSON.stringify(formData);
    console.log("Form Data JSON:", formDataJSON);
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Ocurrió un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.");
  }
};
  return (
    <div className="flex">
       

       <SidebarForms eventId={eventId} />


       
    <section className="flex-grow bg-grey-100 min-h-screen flex justify-center items-center">
        {/* Body */}
        <div className="justify-center min-h-screen">
          <div className="min-h-screen">
            <form style={{ margin: '10px 20px' }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 min-h-screen max-w-4xl mx-auto" onSubmit={handleSubmit}>
              <h1 className="text-3xl font-bold mb-4">Formulario de Solicitud</h1>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
                  Nombre del Evento
                </Label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="eventName" type="text" placeholder="Nombre del Evento" required />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDescription">
                  Descripción del Evento
                </Label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="eventDescription" placeholder="Descripción del Evento" required />
              </div>
              <div className="grid grid-cols-2 gap-4 w-full h-full">
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
                    Fecha de Solicitud
                  </Label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="requestDate"
                    type="date"
                    value={currentDate}
                    readOnly />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventSede">
                    Sede
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventSede" type="text" value={"SCZ"} readOnly />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requesterName">
                    Nombre del Solicitante
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="requesterName" type="text" placeholder="Nombre del Solicitante" required />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requesterDepartment">
                    Unidad o Departamento Solicitante
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="requesterDepartment" type="text" placeholder="Unidad o Departamento Solicitante" required />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="area">
                    Área
                  </Label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="area" required>
                    <option value="academica">Académica </option>
                    <option value="marketing">Marketing </option>
                    <option value="comunicacion">Comunicación </option>
                    <option value="interaccion">Interacción </option>
                    <option value="postgrado">Postgrado </option>
                    <option value="administrativo">Administrativo </option>
                  </select>
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
                    Fecha del Evento
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventDate" type="date" required />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTime">
                    Horario del Evento
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventTime" type="time" required />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventMode">
                    Modalidad del Evento
                  </Label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventMode" required>
                    <option value="virtual">Virtual</option>
                    <option value="presencial">Presencial</option>
                    <option value="mixto">Mixto</option>
                  </select>
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internalLocation">
                    Lugar o Medio Interno del Evento
                  </Label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="eventInPlace">
                    <option value="Mod1 P1 Salade de Consejo">Mod. 1 - P1 - Sala de Consejo</option>
                    <option value="Mod1 P1 Sala de ReunionAdministrativa">Mod. 1 - P1 - Sala de Reunión Dirección Administrativa</option>
                    <option value="Mod1 P1 Sala de Conferencia">Mod. 1 - P1 - Sala de Conferencia</option>
                    <option value="Mod1 P2 Sala de ReunionVecerectorado">Mod. 1 - P2 - Sala de Reunión Vicerectorado </option>
                    <option value="Mod1 P7 Laboratorio_Neuromarketing">Mod. 1 - P7 - Laboratorio NeuroMarketing</option>
                    <option value="Mod1 P5 Aula Smart">Mod. 1 - P5 - Aula Smart</option>
                    <option value="Mod2 P1 Laboratorio de Cata Sensorial">Mod. 2 - P1 - Laboratorio de Cata Sensorial</option>
                    <option value="Mod2 PB Laboratorio Gastronomia">Mod. 2 - PB - Laboratorios Gastronomia </option>
                    <option value="Mod3 PB Auditorio 1">Mod. 3 - PB - Auditorio 1</option>
                    <option value="Mod3 PB Auditotio 2">Mod. 3 - PB - Auditorio 2</option>
                    <option value="Mod3A Exterior Pasarela">Mod. 3 - Exterior Pasarela</option>
                    <option value="Mod3A P2 Aula de Video Conferencia">Mod. 3A - P2 - Aula de Video Conferencia</option>
                    <option value="Mod3A_PB_Hall_de_Ingreso">Mod. 3A - PB - Hall de Ingreso </option>
                    <option value="Mod3B Pasillo">Mod. 3B - PB - Pasillo </option>
                    <option value="Mod3C P3 Laboratorio Mesa Anatómica">Mod. 3C - P3 - Laboratorio Mesa Anatómica</option>
                    <option value="Mod4 P4 FabLab">Mod. 4 - P4 - FabLab </option>
                    <option value="Mod4 PB Centro de Computo">Mod. 4 - PB - Centro de Computo</option>
                    <option value="Mod7 PB Laboratorio de Tecnologia">Mod. 7 - PB - Laboratorio de Tecnologia </option>
                    <option value="EXT. Teatro al Aire Libre">EXT. Teatro al Aire Libre </option>
                    <option value="EXT. Frontis del campus">EXT. Frontis del Campus </option>
                    <option value="Boulevard">EXT. Boulevard </option>
                    <option value="Cancha de futbol">Cancha de Futbol </option>
                    <option value="Comedor">EXT - Comedor </option>
                    <option value="Teams">Teams </option>
                  </select>
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="externalLocation">
                    Lugar o Medio Externo del Evento
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="externalLocation" type="text" placeholder="Lugar o Medio Externo del Evento" />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventType">
                    Tipo de Evento
                  </Label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventType" required>
                    <option value="charla">Charla</option>
                    <option value="concurso">Concurso</option>
                    <option value="seminario">Seminario</option>
                    <option value="simposium">Simposium</option>
                    <option value="taller">Taller</option>
                    <option value="conferencia">Conferencia</option>
                    <option value="feria">Feria</option>
                    <option value="firmaconvenio">Firma de Convenio</option>
                    <option value="posecion">Poseción</option>
                    <option value="exposicion">Exposición</option>
                    <option value="cultural">Actividad Cultural</option>
                    <option value="otro">Otros(mencionar en Descripción)</option>
                  </select>
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coordination">
                    Coordinación con
                  </Label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="coordination" required>
                    <option value="bienestar">Bienestar</option>
                    <option value="comunicacion">Comunicación</option>
                    <option value="direccion_carrera">Dirección de Carrera</option>
                    <option value="administracion_marketing">Administración y Marketing</option>
                  </select>
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetAudience">
                    Dirigido a
                  </Label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="targetAudience" required>
                    <option value="estudiantes_univalle">Estudiantes Univalle</option>
                    <option value="padres_familia_univalle">Padres de Familia Univalle</option>
                    <option value="administracion">Administración</option>
                    <option value="docentes">Docentes</option>
                    <option value="estudiantes_colegio">Estudiantes de Colegio</option>
                    <option value="padres_familia_colegios">Padres de Familia de Colegios</option>
                    <option value="profesionales">Profesionales</option>
                    <option value="sociedad">Sociedad</option>
                  </select>
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="activityObjective">
                    Objetivo de la Actividad
                  </Label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="activityObjective" type="text" placeholder="Objetivo de la Actividad" required />
                </div>
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="externalLocation">
                    Alcance del Evento
                  </Label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="alcance" required>
                    <option value="regional">Regional</option>
                    <option value="Nacional">Nacional</option>
                  </select>
                </div>

              </div>
              <div className="flex Ítems-center justify-between">
                <button className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Enviar Solicitud
                </button>
                <button
                  className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleRedirect}
                >
                  Formulario 2
                </button>
              </div>
            </form>
            <p className="text-center text-gray-800 text-xs">
              &copy;2024 SIEGEMUV. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </section>
      </div>

  );
}

export default Form1;
