import React, { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import {Label} from "../../components/ui/Label";

function MaterialApoyo() {
  const { eventId } = useParams();
  const [ÍtemsMaterialApoyo, setÍtemsMaterialApoyo] = useState([{ ÍtemName: "", quantity: 0, observations: "" }]);
  const [ÍtemsOtherMaterialApoyo, setÍtemsOtherMaterialApoyo] = useState([{ ÍtemName: "", quantity: 0, observations: "" }]);
  const [isOpenMaterialApoyo, setIsOpenMaterialApoyo] = useState(false);
  const [isOpenOtherMaterialApoyo, setIsOpenOtherMaterialApoyo] = useState(false);

  const toggleMaterialApoyo = () => {
    setIsOpenMaterialApoyo(!isOpenMaterialApoyo);
  };

  const toggleOtherMaterialApoyo = () => {
    setIsOpenOtherMaterialApoyo(!isOpenOtherMaterialApoyo);
  };

  const allÍtems = [
    "Folder amarillo tamaño oficio ",
    "Folder amarillo tamaño carta",
    "Hojas bond carta",
    "Hojas bond Oficio",
    "Lapicero azul",
    "Folders sectorizado logo univalle",
    "Certificados"
  ];

  const handleAddRow = (type) => {
    if (type === 'materialApoyo') {
      setÍtemsMaterialApoyo([...ÍtemsMaterialApoyo, { ÍtemName: "", quantity: 0, observations: "" }]);
    } else if (type === 'otherMaterialApoyo') {
      setÍtemsOtherMaterialApoyo([...ÍtemsOtherMaterialApoyo, { ÍtemName: "", quantity: 0, observations: "" }]);
    }
  };

  const handleRemoveRow = (type, index) => {
    if (type === 'materialApoyo') {
      const newÍtems = [...ÍtemsMaterialApoyo];
      newÍtems.splice(index, 1);
      setÍtemsMaterialApoyo(newÍtems);
    } else if (type === 'otherMaterialApoyo') {
      const newÍtems = [...ÍtemsOtherMaterialApoyo];
      newÍtems.splice(index, 1);
      setÍtemsOtherMaterialApoyo(newÍtems);
    }
  };

  const handleChange = (type, index, e) => {
    const { name, value } = e.target;
    if (type === 'materialApoyo') {
      const newÍtems = [...ÍtemsMaterialApoyo];
      newÍtems[index][name] = value;
      setÍtemsMaterialApoyo(newÍtems);
    } else if (type === 'otherMaterialApoyo') {
      const newÍtems = [...ÍtemsOtherMaterialApoyo];
      newÍtems[index][name] = value;
      setÍtemsOtherMaterialApoyo(newÍtems);
    }
  };

  return (
    <div className="flex" >
      

        <div>
          
        <h3 className="text-2xl font-bold mb-4" style={{ margin: '10px 20px' }}>2.3.1 Material de Apoyo (Propios)</h3>
        <div className="bg-white flex Ítems-center justify-between mt-4">
          <table className="table-auto">
            <thead>
              <tr>
              <th className="px-4 py-2"><Label>Ítem</Label></th>
                  <th className="px-4 py-2"><Label>Cantidad</Label></th>
                  <th className="px-4 py-2"><Label>Observaciones</Label></th>
                  <th className="px-4 py-2"><Label>Acción</Label></th> 
              </tr>
            </thead>
            <tbody>
              {ÍtemsMaterialApoyo.map((Ítem, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <select
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="ÍtemName"
                      value={Ítem.ÍtemName}
                      onChange={(e) => handleChange('materialApoyo', index, e)}
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
                      onChange={(e) => handleChange('materialApoyo', index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="observations"
                      value={Ítem.observations}
                      onChange={(e) => handleChange('materialApoyo', index, e)}
                      placeholder="Observaciones"
                    />
                  </td>
                  <td className="border px-4 py-2"> 
                    <button type="button"
                      className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleRemoveRow('materialApoyo', index)}
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
            onClick={() => handleAddRow('materialApoyo')}
            type="button"
            style={{ margin: '10px 20px' }} 
          >
            Agregar fila
          </button>
          <h3 className="text-2xl font-bold mb-4" style={{ margin: '10px 20px' }} >2.3.2 Otros Materiales de Apoyo (Propios)</h3>
          <div className="bg-white flex Ítems-center justify-between mt-4">
            <table className="table-auto">
              <thead>
                <tr>
                <th className="px-4 py-2"><Label>Ítem</Label></th>
                  <th className="px-4 py-2"><Label>Cantidad</Label></th>
                  <th className="px-4 py-2"><Label>Observaciones</Label></th>
                  <th className="px-4 py-2"><Label>Acción</Label></th> 
                </tr>
              </thead>
              <tbody>
                {ÍtemsOtherMaterialApoyo.map((Ítem, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="ÍtemName"
                        placeholder="Nombre del ítem"
                        value={Ítem.ÍtemName}
                        onChange={(e) => handleChange('otherMaterialApoyo', index, e)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="quantity"
                        min="0"
                        value={Ítem.quantity}
                        onChange={(e) => handleChange('otherMaterialApoyo', index, e)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        value={Ítem.observations}
                        onChange={(e) => handleChange('otherMaterialApoyo', index, e)}
                        placeholder="Observaciones"
                      />
                    </td>
                    <td className="border px-4 py-2"> 
                      <button type="button"
                        className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleRemoveRow('otherMaterialApoyo', index)}
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
              onClick={() => handleAddRow('otherMaterialApoyo')}
              type="button"
              style={{ margin: '10px 20px' }} 
            >
              Agregar fila
            </button>
        </div>

        
         
        
    </div>
  );
}

export default MaterialApoyo;
