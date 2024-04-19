import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth } from '../../firebase';
import { onAuthStateChanged } from "firebase/auth";
import RequerimientosServicios from "./RequerimientosServicios";
import Inauguracion from "./Inauguracion";
import Clausura from "./Clausura";
import Sidebar from "../../components/SideBar";
import {Label} from "../../components/ui/Label";


function Protocolo() {

    
    return(
      <>
      <div >

      <RequerimientosServicios></RequerimientosServicios>
       <Inauguracion></Inauguracion> <Clausura></Clausura>
      </div>
      
      
        </>
        

      


    );
}



export default Protocolo;
