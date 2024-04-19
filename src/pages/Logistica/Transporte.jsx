import React, { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import {Label} from "../../components/ui/Label";


function Transporte() {
  const { eventId } = useParams();
  const [transporte, setTransporte] = useState([{ tipo: "", cantidad: 0, unidad: "", precioUnitario: 0, observaciones: "" }]);

  const handleAddRow = () => {
    setTransporte([...transporte, { tipo: "", cantidad: 0, unidad: "", precioUnitario: 0, observaciones: "" }]);
  };

  const [isOpenTransporte, setIsOpenTransporte] = useState(false);
  const toggleTransporte = () => {
      setIsOpenTransporte(!isOpenTransporte);
    };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newTransporte = [...transporte];
    newTransporte[index][name] = value;
    setTransporte(newTransporte);
  };
  const handleRemoveRow = (index) => {
    
      const newTransporte = [...transporte];
      newTransporte.splice(index, 1);
      setTransporte(newTransporte);
  };

  return (
    <div className="flex">
    
       <div  >
           <h3 className="text-2xl font-bold mb-4">2.8 Transporte</h3>
           <form className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4 max-w-4xl mx-auto" >
           <table className="table-auto ">
             <thead>
               <tr>
                 <th className="px-4 py-2"><Label>Tipo de transporte</Label></th>
                 <th className="px-4 py-2"><Label>Cantidad</Label></th>
                 <th className="px-4 py-2"><Label>Unidad de Medida</Label></th>
                 <th className="px-4 py-2"><Label>Precio Unitario</Label></th>
                 <th className="px-4 py-2"><Label>Observaciones</Label></th>
                 <th className="px-4 py-2"><Label></Label></th>
               </tr>
             </thead>
             <tbody>
               {transporte.map((Ítem, index) => (
                 <tr key={index}>
                   <td className="border px-4 py-2">
                     <input
                       className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       type="text"
                       name="tipo"
                       value={Ítem.tipo}
                       onChange={(e) => handleChange(index, e)}
                       placeholder="Tipo de transporte"
                     />
                   </td>
                   <td className="border px-4 py-2">
                     <input
                       className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       type="number"
                       name="cantidad"
                       min="0"
                       value={Ítem.cantidad}
                       onChange={(e) => handleChange(index, e)}
                       placeholder="Cantidad"
                     />
                   </td>
                   <td className="border px-4 py-2">
                     <input
                       className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       type="text"
                       name="unidad"
                       value={Ítem.unidad}
                       onChange={(e) => handleChange(index, e)}
                       placeholder="Unidad"
                     />
                   </td>
                   <td className="border px-4 py-2">
                     <input
                       className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       type="number"
                       name="precioUnitario"
                       min="0"
                       value={Ítem.precioUnitario}
                       onChange={(e) => handleChange(index, e)}
                       placeholder="Precio Unitario"
                     />
                   </td>
                   <td className="border px-4 py-2">
                     <input
                       className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       type="text"
                       name="observaciones"
                       value={Ítem.observaciones}
                       onChange={(e) => handleChange(index, e)}
                       placeholder="Observaciones"
                     />
                   </td>
                   <td className="border px-4 py-2"> 
                      <button
                        type="button"
                        className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleRemoveRow('otrosMobiliario', index)}
                      >
                        Eliminar
                      </button>
                    </td>
                 </tr>
               ))}
             </tbody>
           </table>
           <button
            className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddRow}
            type="button"
            style={{ margin: '10px 20px' }} 
            >
            Agregar fila
          </button>
          </form>
         </div>
         
         
    </div>
    
  );
}

export default Transporte;
