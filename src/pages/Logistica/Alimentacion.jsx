import React, { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import {Label} from "../../components/ui/Label";


function Alimentacion() {
  const { eventId } = useParams();
  const [ÍtemsAlimentacion, setÍtemsAlimentacion] = useState([{ ÍtemName: "", quantity: 0, observations: "" }]);
  const [ÍtemsOtrosAlimentacion, setÍtemsOtrosAlimentacion] = useState([{ ÍtemName: "", quantity: 0, observations: "" }]);
  const [isOpenAlimentacion, setIsOpenAlimentacion] = useState(false);
  const [isOpenOtherAlimentacion, setIsOpenOtherAlimentacion] = useState(false);

  const toggleAlimentacion = () => {
    setIsOpenAlimentacion(!isOpenAlimentacion);
  };

  const toggleOtrosAlimentacion = () => {
    setIsOpenOtherAlimentacion(!isOpenOtherAlimentacion);
  };

  const allÍtems = [
    "NesCafé PZA",
    "Tés CAJA",        
    "Trimates CAJA",       
    "Agua en bidón BIDON",        
    "Galletas de agua PZA"       
  ];

  const handleAddRow = (type) => {
    if (type === 'alimentacion') {
      setÍtemsAlimentacion([...ÍtemsAlimentacion, { ÍtemName: "", quantity: 0, observations: "" }]);
    } else if (type === 'otrosAlimentacion') {
      setÍtemsOtrosAlimentacion([...ÍtemsOtrosAlimentacion, { ÍtemName: "", quantity: 0, observations: "" }]);
    }
  };

  const handleRemoveRow = (type, index) => {
    if (type === 'alimentacion') {
      const newÍtems = [...ÍtemsAlimentacion];
      newÍtems.splice(index, 1);
      setÍtemsAlimentacion(newÍtems);
    } else if (type === 'otrosAlimentacion') {
      const newÍtems = [...ÍtemsOtrosAlimentacion];
      newÍtems.splice(index, 1);
      setÍtemsOtrosAlimentacion(newÍtems);
    }
  };

  const handleChange = (type, index, e) => {
    const { name, value } = e.target;
    if (type === 'alimentacion') {
      const newÍtems = [...ÍtemsAlimentacion];
      newÍtems[index][name] = value;
      setÍtemsAlimentacion(newÍtems);
    } else if (type === 'otrosAlimentacion') {
      const newÍtems = [...ÍtemsOtrosAlimentacion];
      newÍtems[index][name] = value;
      setÍtemsOtrosAlimentacion(newÍtems);
    }
  };

  return (
    <div className="flex" >

        <div>
          <h3 className="text-2xl font-bold mb-4" style={{ margin: '10px 20px' }}>2.5.1 Alimentacion (Propios)</h3>
          <div className="bg-white flex Ítems-center justify-between mt-4">
          <table className="table-auto">
            {/* Table header */}
            <thead>
              <tr>
              <th className="px-4 py-2"><Label>Ítem</Label></th>
                  <th className="px-4 py-2"><Label>Cantidad</Label></th>
                  <th className="px-4 py-2"><Label>Observaciones</Label></th>
                  <th className="px-4 py-2"><Label>Acción</Label></th> 
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {ÍtemsAlimentacion.map((Ítem, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <select
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="ÍtemName"
                      value={Ítem.ÍtemName}
                      onChange={(e) => handleChange('alimentacion', index, e)}
                    >
                      <option value="">Selecciona un ítem</option>
                      {allÍtems.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>{option}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="quantity"
                      min="0"
                      value={Ítem.quantity}
                      onChange={(e) => handleChange('alimentacion', index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="observations"
                      value={Ítem.observations}
                      onChange={(e) => handleChange('alimentacion', index, e)}
                      placeholder="Observaciones"
                    />
                  </td>
                  <td className="border px-4 py-2"> 
                    <button type="button"
                      className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleRemoveRow('alimentacion', index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <button
            className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleAddRow('alimentacion')}
            type="button"
            style={{ margin: '10px 20px' }} 
          >
            Agregar fila
          </button>
          <h3 className="text-2xl font-bold mb-4" style={{ margin: '10px 20px' }}>2.5.2 Otros Alimentacion (Propios)</h3>
          <div className="bg-white flex Ítems-center justify-between mt-4">
          <table className="table-auto">
            {/* Table header */}
            <thead>
              <tr>
                 <th className="px-4 py-2"><Label>Ítem</Label></th>
                  <th className="px-4 py-2"><Label>Cantidad</Label></th>
                  <th className="px-4 py-2"><Label>Observaciones</Label></th>
                  <th className="px-4 py-2"><Label>Acción</Label></th> 
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {ÍtemsOtrosAlimentacion.map((Ítem, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="ÍtemName"
                      placeholder="Nombre del ítem"
                      value={Ítem.ÍtemName}
                      onChange={(e) => handleChange('otrosAlimentacion', index, e)}
                    >
                      
                    </input>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="quantity"
                      min="0"
                      value={Ítem.quantity}
                      onChange={(e) => handleChange('otrosAlimentacion', index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="observations"
                      value={Ítem.observations}
                      onChange={(e) => handleChange('otrosAlimentacion', index, e)}
                      placeholder="Observaciones"
                    />
                  </td>
                  <td className="border px-4 py-2"> 
                    <button type="button"
                      className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleRemoveRow('otrosAlimentacion', index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <button
            className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleAddRow('otrosAlimentacion')}
            type="button"
            style={{ margin: '10px 20px' }} 
          >
            Agregar fila
          </button>
        </div>

          
        
    </div>
  );
}

export default Alimentacion;
