import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import SidebarForms from "../components/SideBarForms";
import {Label} from "../components/ui/Label";

function Form3() {
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const navigate = useNavigate();
  const [eventId, setEventId] = useState(null);

  const [evento, setEvento] = useState({ fecha: "" });

  const handleChange = (e) => {
    setEvento({ fecha: e.target.value });
  };

  const [userRequests, setUserRequests] = useState([]);
  useEffect(() => {
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

  useEffect(() => {
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
    navigate(`/homepage`);
  };

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}/${month}/${year}`;
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
      fecha_solicitud: event.target.requestDate.value,
      sede: event.target.eventSede.value,
      nombre_solicitante: event.target.requesterName.value,
      unidad_departamento: event.target.requesterDepartment.value,
      area: event.target.area.value,
      nombre_pieza: event.target.pieceName.value,
      dirigido_a: {
        estudiantes_univalle: event.target.targetAudienceEstudiantes.checked,
        padres_familia_univalle: event.target.targetAudiencePadresFamiliaUnivalle.checked,
        administrativos: event.target.targetAudienceAdministrativos.checked,
        docentes: event.target.targetAudienceDocentes.checked,
        estudiantes_colegio: event.target.targetAudienceEstudiantesColegio.checked,
        padres_familia_colegios: event.target.targetAudiencePadresFamiliaColegios.checked,
        profesionales: event.target.targetAudienceProfesionales.checked,
        sociedad: event.target.targetAudienceSociedad.checked,
      },
      objetivo_pieza: event.target.pieceObjective.value,
      alcance: event.target.alcance.value,
      que_comunicar: event.target.whatToCommunicate.value,
      informacion_adicional: event.target.additionalInfo.value,
      enlace_registro: event.target.registrationLink.value,
    };

    try {
      const docRef = await addDoc(collection(db, "piezaPublicitaria"), formData);
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

    <section className=" flex-grow bg-grey-100 min-h-screen flex justify-center Ítems-center" style={{ margin: '10px 20px' }} >
      {/* Body */}
      <div className="justify-center min-w-screen">
        <div className="min-h-screen">
          <form style={{ margin: '10px 20px', width:800 }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 min-h-screen max-w-4xl mx-auto" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold mb-4">Formulario de Solicitud</h1>
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pieceName">
                Nombre de la Pieza
              </Label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pieceName" type="text" placeholder="Nombre de la Pieza" required />
            </div>
            <div className="grid grid-cols-2 gap-4 w-full h-full">
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requestDate">
                  Fecha de Solicitud
                </Label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="requestDate"
                  type="text"
                  value={currentDate}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventSede">
                  Sede
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="eventSede" required>
                  <option value="SCZ">SCZ</option>
                  {/* Add more options here */}
                </select>
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
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetAudience">
                  Dirigido a/Público Objetivo
                </Label>
                <div className="flex flex-col">
                  <Label className="inline-flex Ítems-center">
                    <input type="checkbox" id="targetAudienceEstudiantes" />
                    <span className="ml-2">Estudiantes Univalle</span>
                  </Label>
                  <Label className="inline-flex Ítems-center">
                    <input type="checkbox" id="targetAudiencePadresFamiliaUnivalle" />
                    <span className="ml-2">Padres de Familia Univalle</span>
                  </Label>
                  <Label className="inline-flex Ítems-center">
                    <input type="checkbox" id="targetAudienceAdministrativos" />
                    <span className="ml-2">Administrativos</span>
                  </Label>
                  <Label className="inline-flex Ítems-center">
                    <input type="checkbox" id="targetAudienceDocentes" />
                    <span className="ml-2">Docentes</span>
                  </Label>
                  <Label className="inline-flex Ítems-center">
                    <input type="checkbox" id="targetAudienceEstudiantesColegio" />
                    <span className="ml-2">Estudiantes de Colegio</span>
                  </Label>
                  <Label className="inline-flex Ítems-center">
                    <input type="checkbox" id="targetAudiencePadresFamiliaColegios" />
                    <span className="ml-2">Padres de Familia de Colegios</span>
                  </Label>
                  <Label className="inline-flex Ítems-center">
                    <input type="checkbox" id="targetAudienceProfesionales" />
                    <span className="ml-2">Profesionales</span>
                  </Label>
                  <Label className="inline-flex Ítems-center">
                    <input type="checkbox" id="targetAudienceSociedad" />
                    <span className="ml-2">Sociedad</span>
                  </Label>
                  {/* Add more options here */}
                </div>
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pieceObjective">
                  Objetivo de la Pieza
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="pieceObjective" required>
                  <option value="SCZ">Informar</option>
                  <option value="SCZ">Posicionar</option>
                  <option value="SCZ">Vender</option>
                  {/* Add more options here */}
                </select>
              </div>
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="externalLocation">
                 Alcance
                </Label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="alcance" required>
                  <option value="regional">Regional</option>
                  <option value="Nacional">Nacional</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatToCommunicate">
                Qué quiere comunicar? 
                <button 
                  className="ml-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  type="button"
                  title="Texto para su pieza, Diferenciación con la Competencia, Argumentos de Venta, Tipos de Convenios, Beneficios"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6-6h12a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2z"></path>
                  </svg>
                </button>
              </Label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="whatToCommunicate" 
                type="text" 
                placeholder="" 
                required 
              />
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatToCommunicate">
                Información Adicional 
                <button 
                  className="ml-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  type="button"
                  title="Incluya link de referencias visuales y/o documentos de apoyo."
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6-6h12a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2z"></path>
                  </svg>
                </button>
              </Label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="additionalInfo" 
                type="text" 
                placeholder="Si corresponde" 
    
              />
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationLink">
               Enlace de Registrro
              </Label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="registrationLink" type="text" placeholder="Si corresponde" />
            </div>
            <div className="flex Ítems-center justify-between">
              <button className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Enviar Solicitud
              </button>
              <button
                className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleRedirect}
              >
                Pagina Principal
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

export default Form3;
