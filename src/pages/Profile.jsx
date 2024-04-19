import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/SideBar';

const UserRequestsPage = () => {
  const [userRequests, setUserRequests] = useState([]);
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
    const fetchUserRequests = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userID = user.uid;
          const db = getFirestore();
          const requestsRef = collection(db, 'eventos');
          const q = query(requestsRef, where('userID', '==', userID));
          const querySnapshot = await getDocs(q);

          const userRequestsData = [];
          querySnapshot.forEach(doc => {
            userRequestsData.push({ id: doc.id, ...doc.data() });
          });
          setUserRequests(userRequestsData);
        } else {
          console.log("No hay usuario autenticado");
          navigate("/");
        }
      } catch (error) {
        console.error('Error fetching user requests:', error);
      }
    };

    fetchUserRequests();
  }, [navigate]);

  const handleEditRequest = (eventId) => {
    navigate(`/edit-request/${eventId}`);
  };

  return (
    <div className="flex">
      
        <Sidebar/>
      
      <section className="flex-grow" style={{ margin: '10px 20px' }}>
        
        <h1 className="text-3xl font-bold mb-4" style={{ padding: '20px' }}>Mis Solicitudes</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Envío</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comentarios</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userRequests.map(request => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">{request.nombre_evento}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.fecha_solicitud}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.estado}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.comentario}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.estado === 'Pendiente' || request.estado === 'Aceptado' ? (
                    <Link to={`/edit-request/${request.id}`} className="text-indigo-600 hover:text-indigo-900">Editar</Link>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default UserRequestsPage;
