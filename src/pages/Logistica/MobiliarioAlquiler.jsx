import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Label } from "../../components/ui/Label";

function MobiliarioAlquiler() {
  const { eventId } = useParams();
  const [Ítems, setÍtems] = useState([
    { ÍtemName: "", quantity: 0, observations: "" },
  ]);
  const [isOpenMoviliarios, setIsOpenMoviliarios] = useState(false);
  const [isOpenOtherMobiliarios, setIsOpenOtherMobiliarios] = useState(false);
  const toggleMobiliario = () => {
    setIsOpenMoviliarios(!isOpenMoviliarios);
  };

  const toggleOtrosMobiliarios = () => {
    setIsOpenOtherMobiliarios(!isOpenOtherMobiliarios);
  };
  const handleAddRow = () => {
    setÍtems([...Ítems, { ÍtemName: "", quantity: 0, observations: "" }]);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newÍtems = [...Ítems];
    newÍtems[index][name] = value;
    setÍtems(newÍtems);
  };
  return (
    <div>
      <div style={{ margin: "10px 20px" }}>
        <h3 className="text-2xl font-bold mb-4" style={{ margin: "10px 20px" }}>
          2.2.1 Mobiliario y Servicios (Alquiler/Compra)
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
                  <Label>Unidad de Medida</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Precio Unitario</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Observaciones</Label>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">
                  Faldón para mesa de 10 personas{" "}
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="25"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  Juego de vajillas para almuerzo (por persona){" "}
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Conjunto"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="18"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  Juego de vajillas para desayuno (por persona){" "}
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Conjunto"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="18"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  Mantel para mesa de 10 personas{" "}
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="10"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Mesa cuadrada de plástico </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="20"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  Mesa rectangular para 10 personas{" "}
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="20"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Silla de plastico </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="2"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        <h3 className="text-2xl font-bold mb-4">
          2.2.2 Otros Mobiliario y Servicios (Alquiler/Compra)
        </h3>
        <div className="flex bg-white Ítems-center justify-between mt-4">
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
                  <Label>Unidad de Medida</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Precio Unitario</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Observaciones</Label>
                </th>
              </tr>
            </thead>
            <tbody>
              {Ítems.map((Ítem, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="ÍtemName"
                      value={Ítem.ÍtemName}
                      onChange={(e) => handleChange(index, e)}
                    />
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
                      type="number"
                      name="unidad"
                      min="0"
                      value={Ítem.quantity}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="price"
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

      <div></div>
    </div>
  );
}

export default MobiliarioAlquiler;
