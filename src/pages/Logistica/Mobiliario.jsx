import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Label } from "../../components/ui/Label";

function Mobiliario() {
  const { eventId } = useParams();
  const [ÍtemsMobiliario, setÍtemsMobiliario] = useState([
    { ÍtemName: "", quantity: 0, observations: "" },
  ]);
  const [ÍtemsOtrosMobiliario, setÍtemsOtrosMobiliario] = useState([
    { ÍtemName: "", quantity: 0, observations: "" },
  ]);
  const [isOpenMobiliarios, setIsOpenMobiliarios] = useState(false);
  const [isOpenOtherMobiliarios, setIsOpenOtherMobiliarios] = useState(false);

  const toggleMobiliario = () => {
    setIsOpenMobiliarios(!isOpenMobiliarios);
  };

  const toggleOtrosMobiliarios = () => {
    setIsOpenOtherMobiliarios(!isOpenOtherMobiliarios);
  };

  const allÍtems = [
    "Mesas cuadradas de madera",
    "Sillas metálicas",
    "Data y Sonido",
    "Micrófonos",
    "Atril",
    "Puntero",
    "Red Wifi",
    "Punto de Red para retransmisiones",
    "Soporte Técnico",
    "Transporte",
    "Punto registro",
    "Puntos de corriente",
  ];

  const handleAddRow = (type) => {
    if (type === "mobiliario") {
      setÍtemsMobiliario([
        ...ÍtemsMobiliario,
        { ÍtemName: "", quantity: 0, observations: "" },
      ]);
    } else if (type === "otrosMobiliario") {
      setÍtemsOtrosMobiliario([
        ...ÍtemsOtrosMobiliario,
        { ÍtemName: "", quantity: 0, observations: "" },
      ]);
    }
  };

  const handleRemoveRow = (type, index) => {
    if (type === "mobiliario") {
      const newÍtems = [...ÍtemsMobiliario];
      newÍtems.splice(index, 1);
      setÍtemsMobiliario(newÍtems);
    } else if (type === "otrosMobiliario") {
      const newÍtems = [...ÍtemsOtrosMobiliario];
      newÍtems.splice(index, 1);
      setÍtemsOtrosMobiliario(newÍtems);
    }
  };

  const handleChange = (type, index, e) => {
    const { name, value } = e.target;
    if (type === "mobiliario") {
      const newÍtems = [...ÍtemsMobiliario];
      newÍtems[index][name] = value;
      setÍtemsMobiliario(newÍtems);
    } else if (type === "otrosMobiliario") {
      const newÍtems = [...ÍtemsOtrosMobiliario];
      newÍtems[index][name] = value;
      setÍtemsOtrosMobiliario(newÍtems);
    }
  };

  return (
    <div className="flex">
      <div style={{ margin: "10px 20px" }}>
        <h3 className="text-2xl font-bold mb-4" style={{ margin: "10px 20px" }}>
          {" "}
          2.1.1 Mobiliario y Servicios (Propios)
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
              {ÍtemsMobiliario.map((Ítem, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <select
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="ÍtemName"
                      value={Ítem.ÍtemName}
                      onChange={(e) => handleChange("mobiliario", index, e)}
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
                      onChange={(e) => handleChange("mobiliario", index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="observations"
                      value={Ítem.observations}
                      onChange={(e) => handleChange("mobiliario", index, e)}
                      placeholder="Observaciones"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Button
                      type="Button"
                      className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleRemoveRow("mobiliario", index)}
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
          onClick={() => handleAddRow("mobiliario")}
          type="Button"
          style={{ margin: "10px 20px" }}
        >
          Agregar fila
        </Button>

        <h3 className="text-2xl font-bold mb-4">
          2.1.2 Otros Mobiliario y Servicios (Propios)
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
              {ÍtemsOtrosMobiliario.map((Ítem, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="ÍtemName"
                      placeholder="Nombre del ítem"
                      value={Ítem.ÍtemName}
                      onChange={(e) =>
                        handleChange("otrosMobiliario", index, e)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="quantity"
                      min="0"
                      value={Ítem.quantity}
                      onChange={(e) =>
                        handleChange("otrosMobiliario", index, e)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="observations"
                      value={Ítem.observations}
                      onChange={(e) =>
                        handleChange("otrosMobiliario", index, e)
                      }
                      placeholder="Observaciones"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Button
                      type="Button"
                      className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => handleRemoveRow("otrosMobiliario", index)}
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
          onClick={() => handleAddRow("otrosMobiliario")}
          type="Button"
          style={{ margin: "10px 20px" }}
        >
          Agregar fila
        </Button>
      </div>
    </div>
  );
}

export default Mobiliario;
