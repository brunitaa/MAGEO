import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import {Label} from "../components/ui/Label";
import SidebarForms from "../components/SideBarForms";

function EditRequestPage() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const navigate = useNavigate();

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
  
    const currentDate = new Date();  
    const eventDate = new Date(event.target.eventDate.value);
    
    let threeBusinessDaysAhead = new Date(eventDate);
    let businessDaysCount = 0;
    
    const isBusinessDay = (date) => {
      const day = date.getDay();
      return day !== 0 && day !== 6; 
    };
    
    while (businessDaysCount < 3) {
      if (isBusinessDay(threeBusinessDaysAhead)) {
        businessDaysCount++;
      }
      threeBusinessDaysAhead.setDate(threeBusinessDaysAhead.getDate() - 1);
    }
    
    if (currentDate >= threeBusinessDaysAhead) {
      alert("No es posible editar el evento si faltan menos de 3 días hábiles para su realización.");
      return;
    }

    const fechaEvento = new Date(event.target.eventDate.value);
    const fechaSolicitud = new Date();
    const unaSemanaEnMS = 7 * 24 * 60 * 60 * 1000; // Una semana en milisegundos
  
    if (fechaEvento - fechaSolicitud < unaSemanaEnMS) {
      alert("No se puede editar la solicitud cuando falta menos de una semana para el evento.");
      return;
    }
  
    try {
      const db = getFirestore();
      await updateDoc(doc(db, "eventos", eventId), {
        alcance: event.target.alcance.value,
        area: event.target.area.value,
        coordinacion: event.target.coordination.value,
        descripcion: event.target.eventDescription.value,
        dirigido: event.target.targetAudience.value,
        solicitud_evento:event.target.requestDate.value,
        fecha_evento: event.target.eventDate.value, 
        hora_evento: event.target.eventTime.value,
        lugar_externo: event.target.externalLocation.value,
        lugar_interno: event.target.eventInPlace.value,
        modalidad: event.target.eventMode.value,
        nombre_evento: event.target.eventName.value,
        nombre_solicitante: event.target.requesterName.value,
        objetivo: event.target.activityObjective.value,
        tipo_evento: event.target.eventType.value,
        unidad_solicitante: event.target.requesterDepartment.value,
      });
      alert("Evento actualizado correctamente!");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Ocurrió un error al actualizar el evento. Por favor, inténtalo de nuevo más tarde.");
    }
  };
  

  if (!eventData) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex">
       

    <SidebarForms eventId={eventId} />
    <section className="bg-grey-100 min-h-screen flex justify-center Ítems-center">
      <div className="min-h-screen">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-4">Editar Evento</h1>
          <div className="mb-4">
            <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
              Nombre del Evento
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="eventName"
              type="text"
              placeholder="Nombre del Evento"
              defaultValue={eventData.nombre_evento}
              required
            />
          </div>
            <div className="mb-4">
             <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDescription">
              Descripción del Evento
             </Label>
              <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="eventDescription"
                placeholder="Descripción del Evento"
                defaultValue={eventData.descripcion}
                required
              />
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
                  defaultValue={eventData.fecha_solicitud}
                  readOnly 
                />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventSede">
                  Sede
                </Label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="eventSede" type="text" defaultValue={"SCZ"} readOnly/>
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requesterName">
                  Nombre del Solicitante
                </Label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="requesterName" type="text" placeholder="Nombre del Solicitante"
                defaultValue={eventData.nombre_solicitante} 
                 required />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requesterDepartment">
                  Unidad o Departamento Solicitante
                </Label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="requesterDepartment" type="text" placeholder="Unidad o Departamento Solicitante" 
                defaultValue={eventData.unidad_solicitante} 
                required />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="area">
                  Área
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="area" 
                defaultValue={eventData.area} 
                required>
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
                id="eventDate" type="date"
                defaultValue={eventData.fecha_evento}
                required />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTime">
                  Horario del Evento
                </Label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="eventTime" type="time" required 
                defaultValue={eventData.hora_evento} 
                />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventMode">
                  Modalidad del Evento
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="eventMode" 
                defaultValue={eventData.modalidad} 
                required>
                  <option value="virtual">Virtual</option>
                  <option value="presencial">Presencial</option>
                  <option value="mixto">Mixto</option>
                </select>
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internalLocation">
                  Lugar o Medio Interno del Evento
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="eventInPlace"
                defaultValue={eventData.lugar_interno} >
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
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="externalLocation" type="text" defaultValue={eventData.lugar_externo}  />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventType">
                  Tipo de Evento
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="eventType"
                defaultValue={eventData.tipo_evento} 
                required>
                  <option value="Charla">Charla</option>
                  <option value="Concurso">Concurso</option>
                  <option value="Seminario">Seminario</option>
                  <option value="Simposium">Simposium</option>
                  <option value="Taller">Taller</option>
                  <option value="Conferencia">Conferencia</option>
                  <option value="Feria">Feria</option>
                  <option value="Firma de convenio">Firma de Convenio</option>
                  <option value="Posecion">Poseción</option>
                  <option value="Exposicion">Exposición</option>
                  <option value="Actividad Cultural">Actividad Cultural</option>
                  <option value="Otro">Otros(mencionar en Descripción)</option>
                </select>
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coordination">
                  Coordinación con
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 id="coordination" 
                 defaultValue={eventData.coordinacion} 
                 required>
                  <option value="Bienestar">Bienestar</option>
                  <option value="Comunicacion">Comunicación</option>
                  <option value="Direccion de Carrera">Dirección de Carrera</option>
                  <option value="Administracion y Marketing">Administración y Marketing</option>
                </select>
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetAudience">
                  Dirigido a
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="targetAudience" 
                defaultValue={eventData.dirigido} 
                required>
                  <option value="Estudiantes Univalle">Estudiantes Univalle</option>
                  <option value="Padres de Familia Univalle">Padres de Familia Univalle</option>
                  <option value="Administracion">Administración</option>
                  <option value="Docentes">Docentes</option>
                  <option value="Estudiantes colegio">Estudiantes de Colegio</option>
                  <option value="Padres familia colegios">Padres de Familia de Colegios</option>
                  <option value="Profesionales">Profesionales</option>
                  <option value="Sociedad">Sociedad</option>
                </select>
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="activityObjective">
                  Objetivo de la Actividad
                </Label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="activityObjective" type="text" placeholder="Objetivo de la Actividad" 
                defaultValue={eventData.objetivo} 
                required/>
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="externalLocation">
                 Alcance del Evento
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="alcance"
                defaultValue={eventData.alcance} 
                required>
                  <option value="regional">Regional</option>
                  <option value="Nacional">Nacional</option>
                </select>
              </div>
              </div>
          <div className="flex Ítems-center justify-between">
            <button className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </section>
    </div>
  );
}

export default EditRequestPage;
