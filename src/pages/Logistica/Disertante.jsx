import React, { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import {Label} from "../../components/ui/Label";


function Disertante() {
  const { eventId } = useParams();
  const [disertantes, setDisertantes] = useState([{ 
    nombre: "", 
    diaLlegada: "", 
    horaLlegada: "", 
    diaRetorno: "", 
    horaRetorno: "", 
    alojamiento: "", 
    responsable: "" 
  }]);
  const [contador, setContador] = useState(2);

  const handleAddRow = () => {
    setDisertantes([...disertantes, { 
      nombre: "", 
      diaLlegada: "", 
      horaLlegada: "", 
      diaRetorno: "", 
      horaRetorno: "", 
      alojamiento: "", 
      responsable: "" 
    }]);
    setContador(contador + 1);
  };

  const handleDeleteRow = (index) => {
    const newDisertantes = [...disertantes];
    newDisertantes.splice(index, 1);
    setDisertantes(newDisertantes);
    setContador(contador - 1);
  };

  const [isOpenDisertante, setIsOpenDisertante] = useState(false);
  const toggleDisertante = () => {
    setIsOpenDisertante(!isOpenDisertante);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newDisertantes = [...disertantes];
    newDisertantes[index][name] = value;
    setDisertantes(newDisertantes);
  };

  return (
    <div className="flex">
    
         <div className="flex-grow">
           <h3 style={{ margin: '10px 20px' }} className="text-2xl font-bold mb-4"> 2.7 Disertantes</h3>
           <div className="bg-white flex Ítems-center justify-between mt-4">
           <table className="table-auto w-full"  >
  <tbody>
  
    {disertantes.map((Ítem, index) => (
      
      <><tr key={index}>
        
        
        <td className="border px-4 py-2">
          <div className="mb-4">
            <Label className="block text-gray-700 text-sm font-bold mb-2">Nombre del disertante</Label>
            <input
              className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="nombre"
              value={Ítem.nombre}
              onChange={(e) => handleChange(index, e)}
              placeholder="Nombre del disertante" />
          </div>
        </td>
        <td className="border px-4 py-2">
          <div className="mb-4">
            <Label className="block text-gray-700 text-sm font-bold mb-2">Día de llegada</Label>
            <input
              className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              name="diaLlegada"
              value={Ítem.diaLlegada}
              onChange={(e) => handleChange(index, e)}
              placeholder="Día de llegada" />
          </div>
        </td>
      </tr><tr key={`row-${index}-2`}>
          <td className="border px-4 py-2">
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2">Hora de llegada</Label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="time"
                name="horaLlegada"
                value={Ítem.horaLlegada}
                onChange={(e) => handleChange(index, e)}
                placeholder="Hora de llegada" />
            </div>
          </td>
          <td className="border px-4 py-2">
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2">Día de retorno</Label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                name="diaRetorno"
                value={Ítem.diaRetorno}
                onChange={(e) => handleChange(index, e)}
                placeholder="Día de retorno" />
            </div>
          </td>
        </tr><tr key={`row-${index}-3`}>
          <td className="border px-4 py-2">
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2">Hora de retorno</Label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="time"
                name="horaRetorno"
                value={Ítem.horaRetorno}
                onChange={(e) => handleChange(index, e)}
                placeholder="Hora de retorno" />
            </div>
          </td>
          <td className="border px-4 py-2">
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2">Alojamiento</Label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="alojamiento"
                value={Ítem.alojamiento}
                onChange={(e) => handleChange(index, e)}
                placeholder="Alojamiento" />
            </div>
          </td>
        </tr><tr key={`row-${index}-4`}>
          <td className="border px-4 py-2">
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2">Responsable de recojo y retorno</Label>
              <input
                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="responsable"
                value={Ítem.responsable}
                onChange={(e) => handleChange(index, e)}
                placeholder="Responsable de recojo y retorno" />
            </div>
          </td>
          <td className="border px-4 py-2">
            <button
              className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleDeleteRow(index)}
              type="button"
            >
              Eliminar
            </button>
          </td>
        </tr></>
    ))}
  </tbody>
</table>
</div>

           <button
             className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             onClick={handleAddRow}
             type="button"
             style={{ margin: '10px 20px' }} 
           >
             Agregar Disertante {contador}
           </button>
         </div>
       
    </div>
  );
}

export default Disertante;
