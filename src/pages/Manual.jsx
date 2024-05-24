import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged,  getAuth  } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';

function Manual() {
  const [userRequests, setUserRequests] = useState([]);
  const navigate = useNavigate();
  
 

  return (
    <div className="flex">
      <aside>
        <Sidebar/>
      </aside>

   
    <section className="bg-gray-100 min-w-screen flex flex-col justify-center Ítems-center">
      <h1 className="text-3xl font-bold mb-4">PROXIMAMENTE</h1>
      </section>
    </div>
  );
}

export default Manual;
