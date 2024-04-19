import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarForms from "../components/SideBarForms";
import Sidebar from "../components/SideBar";

function RequestReview() {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    
    const sampleRequests = [
      { id: 1, name: "Solicitud 1", date: "2024-03-24", status: "pendiente" },
      { id: 2, name: "Solicitud 2", date: "2024-03-22", status: "aceptado" },
      { id: 3, name: "Solicitud 3", date: "2024-03-20", status: "rechazado" }
    ];
    setRequests(sampleRequests);
  }, []);

  return (
    <div className="flex">
       

       <Sidebar />
    <section className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Solicitudes</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Nombre</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Fecha de Envío</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Estado</th>
           {/* <th scope="col" className="relative px-6 py-3"><span className="sr-only">Editar</span></th>*/}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map(request => (
            <tr key={request.id}>
              <td className="px-6 py-4 whitespace-nowrap">{request.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{request.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{request.status}</td>
             {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/edit-request/${request.id}`} className="text-indigo-600 hover:text-indigo-900">Editar</Link>
              </td>*/}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    </div>
  );
}

export default RequestReview;
