import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import {Label} from "../components/ui/Label";
import { onAuthStateChanged,  getAuth  } from "firebase/auth";
import Sidebar from '../components/SideBar';

const EventDetailsPage = () => {
  const navigate= useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [observation, setObservation] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const isAdmin = uid === "y2jzv7LFycfxVaCNGBakaNkxDA23";
        
        if (isAdmin) {
          console.log("Es admin")
        } else {
          navigate("/homepage");
        }
      } else {
        navigate("/")
        console.log("El usuario ha cerrado sesión");
      }
    });
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const db = getFirestore();
        const eventRef = doc(db, 'eventos', eventId);
        const eventSnapshot = await getDoc(eventRef);
        if (eventSnapshot.exists()) {
          setEvent(eventSnapshot.data());
        } else {
          console.error('No se encontró el evento con el ID proporcionado');
        }
      } catch (error) {
        console.error('Error al obtener el evento:', error);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleAccept = async () => {
    try {
      const userObservation = prompt('Escribe una observación:');
      if (userObservation === null) return; 
      setLoading(true);
      const db = getFirestore();
      const eventRef = doc(db, 'eventos', eventId);
      await updateDoc(eventRef, { estado: 'Aceptado', comentario: userObservation });
      setLoading(false);
      setEvent({ ...event, estado: 'Aceptado', observacion: userObservation });
      setAlertMessage('Evento aceptado exitosamente');
    } catch (error) {
      console.error('Error al aceptar el evento:', error);
    }
  };

  const handleReject = async () => {
    try {
      const userObservation = prompt('Escribe una observación:');
      if (userObservation === null) return; 
      setLoading(true);
      const db = getFirestore();
      const eventRef = doc(db, 'eventos', eventId);
      await updateDoc(eventRef, { estado: 'Rechazado', comentario: userObservation });
      setLoading(false);
      setEvent({ ...event, estado: 'Rechazado', observacion: userObservation });
      setAlertMessage('Evento rechazado exitosamente');
    } catch (error) {
      console.error('Error al rechazar el evento:', error);
    }
  };

  

  if (!event) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex">
       

       <Sidebar />
    <section className="bg-grey-100 min-h-screen flex justify-center items-center">
      <div className="min-h-screen">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto" >
          <h1 className="text-3xl font-bold mb-4">Analizar Evento</h1>
          <div className="mb-4">
            <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
              Nombre del Evento
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="eventName"
              type="text"
              placeholder="Nombre del Evento"
              defaultValue={event.nombre_evento}
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
                defaultValue={event.descripcion}
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
                  defaultValue={new Date(event.fecha_solicitud.seconds * 1000).toLocaleDateString()}
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
                defaultValue={event.nombre_solicitante} 
                 required />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requesterDepartment">
                  Unidad o Departamento Solicitante
                </Label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="requesterDepartment" type="text" placeholder="Unidad o Departamento Solicitante" 
                defaultValue={event.unidad_solicitante} 
                required />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="area">
                  Área
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="area" 
                defaultValue={event.area} 
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
                defaultValue={new Date(event.fecha_evento.seconds * 1000).toLocaleDateString()}
                required />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTime">
                  Horario del Evento
                </Label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="eventTime" type="time" required 
                defaultValue={event.hora_evento} 
                />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventMode">
                  Modalidad del Evento
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="eventMode" 
                defaultValue={event.modalidad} 
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
                defaultValue={event.lugar_interno} >
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
                id="externalLocation" type="text" defaultValue={event.lugar_externo}  />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventType">
                  Tipo de Evento
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="eventType"
                defaultValue={event.tipo_evento} 
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
                 defaultValue={event.coordinacion} 
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
                defaultValue={event.dirigido} 
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
                defaultValue={event.objetivo} 
                required/>
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="externalLocation">
                 Alcance del Evento
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="alcance"
                defaultValue={event.alcance} 
                required>
                  <option value="regional">Regional</option>
                  <option value="Nacional">Nacional</option>
                </select>
              </div>
              </div>
          {/* Botones para aceptar y rechazar */}
          <div className="flex Ítems-center justify-between mb-4">
            <button className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleAccept} disabled={loading}>
              Aceptar
            </button>
            <button className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleReject} disabled={loading}>
              Rechazar
            </button>
          </div>
          
          {/* Campo para escribir observaciones */}
          <div className="mb-4">
            <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="observation">
              Observación
            </Label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="observation"
              placeholder="Escribe una observación"
              defaultValue={event.comentario}
              onChange={(e) => setObservation(e.target.value)}
            />
          </div>
        </form>
      </div>
    </section>
    </div>
  );
};

export default EventDetailsPage;
