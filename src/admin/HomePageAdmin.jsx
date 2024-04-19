import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Sidebar from '../components/SideBar';
import * as Icon from 'react-bootstrap-icons';

const UserRequestsPage = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const isAdmin = uid === "y2jzv7LFycfxVaCNGBakaNkxDA23";
        
        if (isAdmin) {
          fetchAllRequests();
        } else {
          fetchUserRequests(uid);
        }
      } else {
        navigate("/");
        console.log("El usuario ha cerrado sesión");
      }
    });
  }, []);

  useEffect(() => {
    // Calculate counts
    const accepted = userRequests.filter(request => request.estado === 'Aceptado').length;
    const pending = userRequests.filter(request => request.estado === 'Pendiente').length;
    const rejected = userRequests.filter(request => request.estado === 'Rechazado').length;
    setAcceptedCount(accepted);
    setPendingCount(pending);
    setRejectedCount(rejected);
  }, [userRequests]);

  const fetchAllRequests = async () => {
    try {
      const db = getFirestore();
      const requestsRef = collection(db, 'eventos');
      const querySnapshot = await getDocs(requestsRef);

      const allRequestsData = [];
      querySnapshot.forEach(doc => {
        allRequestsData.push({ id: doc.id, ...doc.data() });
      });
      setUserRequests(allRequestsData);
    } catch (error) {
      console.error('Error al recuperar todas las solicitudes de eventos:', error);
    }
  };

  const fetchUserRequests = async (userID) => {
    try {
      const db = getFirestore();
      const requestsRef = collection(db, 'eventos');
      const q = query(requestsRef, where('userID', '==', userID));
      const querySnapshot = await getDocs(q);

      const userRequestsData = [];
      querySnapshot.forEach(doc => {
        userRequestsData.push({ id: doc.id, ...doc.data() });
      });
      setUserRequests(userRequestsData);
    } catch (error) {
      console.error('Error al recuperar las solicitudes de eventos del usuario:', error);
    }
  };

  return (
    <div className="flex">
       <Sidebar  />
    <section className="flex-grow  items-center">
      <h1 className="text-3xl font-bold mb-4" style={{ padding: '20px' }}>Lista de Solicitudes</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8 ">
        <div className="bg-green-100 p-4 rounded-md shadow-lg ">
          <h2 className="text-xl font-bold mb-2">Eventos Aceptados</h2>
          <p className="text-3xl">{acceptedCount}</p> 
        </div>
        <div className="bg-yellow-100 p-4 rounded-md shadow-lg">
          <h2 className="text-xl font-bold mb-2">Eventos Pendientes</h2>
          <p className="text-3xl">{pendingCount}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-md shadow-lg">
          
          <h2 className="text-xl font-bold mb-2">Eventos Rechazados</h2>
          <p className="text-3xl">{rejectedCount}</p>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Fecha de Envío
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Estado
            </th>
            
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userRequests.map((request) => (
            <tr key={request.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/event/${request.id}`}>{request.nombre_evento}</Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{request.fecha_solicitud }</td>
              <td className="px-6 py-4 whitespace-nowrap">{request.estado}</td>
              {/* Agrega más columnas según sea necesario */}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    </div>
  );
}

export default UserRequestsPage;
