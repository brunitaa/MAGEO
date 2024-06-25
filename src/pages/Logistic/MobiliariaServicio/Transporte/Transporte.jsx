import React from "react";
import { Controller } from "react-hook-form";
import { Input, Label } from "../../../../components/ui";

function Transporte({
  transportFields,
  appendTransport,
  handleRemoveTransport,
  control,
  setValue,
  register,
}) {
  const focusedInput = ""; // Define esta variable según tus necesidades

  const handleAddTransport = () => {
    appendTransport({
      name: "",
      quantity: "",
      unit: "",
      unit_price: "",
      observations: "",
    });
  };

  return (
    <>
      <div
        className={`mb-2 p-4 border bg-white ${
          focusedInput === "title"
            ? "border-univalleColorOne"
            : "border-gray-300"
        } rounded-lg`}
      >
        <h3 className="text-2xl mb-4">2.5 Transporte</h3>
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
                <Label>Precio por Unidad</Label>
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
            {transportFields.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  <Controller
                    control={control}
                    name={`transport_services[${index}].name`}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Ítem"
                      />
                    )}
                  />
                </td>
                <td className="border px-4 py-2">
                  <Controller
                    control={control}
                    name={`transport_services[${index}].quantity`}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Cantidad"
                      />
                    )}
                  />
                </td>

                <td className="border px-4 py-2">
                  <Controller
                    control={control}
                    name={`transport_services[${index}].unit`}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Unidad de Medida"
                      />
                    )}
                  />
                </td>
                <td className="border px-4 py-2">
                  <Controller
                    control={control}
                    name={`transport_services[${index}].unit_price`}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Precio por Unidad"
                        onChange={(e) =>
                          setValue(
                            `transport_services[${index}].unit_price`,
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    )}
                  />
                </td>
                <td className="border px-4 py-2">
                  <Controller
                    control={control}
                    name={`transport_services[${index}].observations`}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Observaciones"
                      />
                    )}
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    type="button"
                    className="bg-univalleColorOne hover:bg-univalleColorOne text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleRemoveTransport(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para agregar fila */}
      <button
        className="bg-univalleColorOne hover:bg-univalleColorOne text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleAddTransport}
        type="button"
        style={{ margin: "10px 20px" }}
      >
        Agregar fila
      </button>
    </>
  );
}

export default Transporte;
