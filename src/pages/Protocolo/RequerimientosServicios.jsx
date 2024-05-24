import React, { useState } from "react";
import { Label } from "../../components/ui/Label";
import { useParams, useNavigate } from "react-router-dom";

function RequerimientosServicios() {
  const { eventId } = useParams();
  const [ÍtemsRequerimientosServicios, setÍtemsRequerimientosServicios] =
    useState([{ ÍtemName: "", quantity: 0, observations: "" }]);
  const [isOpenRequerimientosServicios, setIsRequerimientosServicios] =
    useState(false);

  const toggleRequerimientosServicios = () => {
    setIsRequerimientosServicios(!isOpenRequerimientosServicios);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newRequerimientos = [...ÍtemsRequerimientosServicios];
    newRequerimientos[index][name] = value;
    setÍtemsRequerimientosServicios(newRequerimientos);
  };

  const handleAddRow = () => {
    setÍtemsRequerimientosServicios([
      ...ÍtemsRequerimientosServicios,
      { ÍtemName: "", quantity: 0, observations: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    const newÍtems = [...ÍtemsRequerimientosServicios];
    newÍtems.splice(index, 1);
    setÍtemsRequerimientosServicios(newÍtems);
  };

  const allÍtems = [
    "Testera",
    "Marbetes",
    "Banderas (Bolivia, Santa Cruz, Pueblos Indígenas del Oriente, Univalle)",
    "Invitaciones",
    "Programa del evento",
    "Atención sala de Consejo",
  ];

  return (
    <div className="flex">
      <div style={{ margin: "10px 20px" }}>
        <h3 className="text-2xl font-bold mb-4">
          3.1 Requerimientos y Servicios
        </h3>
        <div className="bg-white flex Ítems-center justify-between mt-4">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">
                  <Label>Ítem</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Cantidad</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Observaciones</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Acción</Label>
                </th>
              </tr>
            </thead>
            <tbody>
              {ÍtemsRequerimientosServicios.map((Ítem, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <select
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="ÍtemName"
                      value={Ítem.ÍtemName}
                      onChange={(e) => handleChange(index, e)}
                    >
                      <option value="">Selecciona un ítem</option>
                      {allÍtems.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
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
                      onChange={(e) => handleChange(index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="observations"
                      value={Ítem.observations}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Observaciones"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Button
                      type="Button"
                      className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleRemoveRow(index)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button
          className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddRow}
          type="Button"
          style={{ margin: "10px 20px" }}
        >
          Agregar fila
        </Button>
      </div>
    </div>
  );
}

export default RequerimientosServicios;
