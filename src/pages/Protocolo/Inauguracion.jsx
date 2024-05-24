import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Label } from "../../components/ui/Label";

function Inauguracion() {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([
    { name: "", degree: "", institution: "", position: "", observations: "" },
  ]);
  const [isOpenInauguracion, setIsOpenInauguracion] = useState(false);

  const toggleInauguracion = () => {
    setIsOpenInauguracion(!isOpenInauguracion);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newParticipants = [...participants];
    newParticipants[index][name] = value;
    setParticipants(newParticipants);
  };

  const handleAddRow = () => {
    setParticipants([
      ...participants,
      { name: "", degree: "", institution: "", position: "", observations: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    const newParticipants = [...participants];
    newParticipants.splice(index, 1);
    setParticipants(newParticipants);
  };

  return (
    <div className="flex">
      <div style={{ margin: "10px 20px" }}>
        <h3 className="text-2xl font-bold mb-4">
          3.2 Participantes en la Inauguración
        </h3>
        <div className="bg-white flex Ítems-center justify-between mt-4">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">
                  <Label>Nombre Completo</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Grado Académico</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Empresa / Institución</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Cargo</Label>
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
              {participants.map((participant, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="name"
                      value={participant.name}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Nombre Completo"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="degree"
                      value={participant.degree}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Grado Académico"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="institution"
                      value={participant.institution}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Empresa / Institución"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="position"
                      value={participant.position}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Cargo"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="observations"
                      value={participant.observations}
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

export default Inauguracion;
