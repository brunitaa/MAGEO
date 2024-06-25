import React from "react";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Label } from "../../../../components/ui/Label";
import { Input } from "../../../../components/ui";

function MaterialApoyo({
  materialFields,
  allMaterial,
  appendMaterial,
  removeMaterial,
  register,
  control,
  setValue,
}) {
  const focusedInput = ""; // Define esta variable según tus necesidades

  return (
    <>
      {/* 2.1 Mobiliario y Servicios */}
      <div
        className={`mb-2 p-4 border bg-white ${
          focusedInput === "title"
            ? "border-univalleColorOne"
            : "border-gray-300"
        } rounded-lg`}
      >
        <h3 className="text-2xl mb-4">2.2 Material de Apoyo Propios</h3>
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
            {materialFields.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  <select
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    {...register(`support_material[${index}].name`)}
                  >
                    <option value="">Selecciona un ítem</option>
                    {allMaterial.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <Controller
                    control={control}
                    name={`support_material[${index}].quantity`}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        required
                        placeholder="Cantidad"
                      />
                    )}
                  />
                </td>
                <td className="border px-4 py-2">
                  <Controller
                    control={control}
                    name={`support_material[${index}].unit`}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        required
                        placeholder="Unidad de Medida"
                      />
                    )}
                  />
                </td>
                <td className="border px-4 py-2">
                  <Controller
                    control={control}
                    name={`support_material[${index}].unit_price`}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        required
                        placeholder="Precio por Unidad"
                        onChange={(e) =>
                          setValue(
                            `support_material[${index}].unit_price`,
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
                    name={`support_material[${index}].observations`}
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
                    onClick={() => removeMaterial(index)}
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
        className="bg-univalleColorOne hover:bg-univalleColorOne text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() =>
          appendMaterial({
            name: "",
            quantity: "",
            unit: "",
            unit_price: "",
            observations: "",
          })
        }
        type="button"
        style={{ margin: "10px 20px" }}
      >
        Agregar fila
      </button>
    </>
  );
}

export default MaterialApoyo;
