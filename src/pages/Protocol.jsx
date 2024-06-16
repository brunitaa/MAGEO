import React, { useEffect, useState } from "react";
import { Label } from "../components/ui/Label";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useprotocolRequest } from "../context/ProtocolContext";
import SidebarForms from "../components/SideBarForms";
import "animate.css";
import { Input } from "../components/ui";

function Protocol() {
  const params = useParams();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [ÍtemsRequerimientosServicios, setÍtemsRequerimientosServicios] =
    useState([
      {
        ÍtemName: "",
        quantity: 0,
        supplier: "",
        unit: "",
        unit_price: "",
        observations: "",
      },
    ]);
  const [Participants, setParticipants] = useState([
    {
      participant_number: "",
      name: "",
      academic_degree: "",
      company_institution: "",
      position: "",
      observations: "",
    },
  ]);

  const [Participants2, setParticipants2] = useState([
    {
      participant_number: "",
      name: "",
      academic_degree: "",
      company_institution: "",
      position: "",
      observations: "",
    },
  ]);
  const [Master, setMaster] = useState([
    {
      participant_number: "",
      name: "",
      academic_degree: "",
      company_institution: "",
      position: "",
      observations: "",
    },
  ]);
  const { createProtocol, getProtocol, updateProtocol } = useprotocolRequest();

  const handleAddRow = () => {
    setÍtemsRequerimientosServicios([
      ...ÍtemsRequerimientosServicios,
      { ÍtemName: "", quantity: 0, observations: "" },
    ]);
  };

  const handleAddParticipant = () => {
    setParticipants([
      ...Participants,
      {
        participant_number: "",
        name: "",
        academic_degree: "",
        company_institution: "",
        position: "",
        observations: "",
      },
    ]);
  };
  const handleAddParticipant2 = () => {
    setParticipants2([
      ...Participants2,
      {
        participant_number: "",
        name: "",
        academic_degree: "",
        company_institution: "",
        position: "",
        observations: "",
      },
    ]);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const handleRemoveRow = (index) => {
    const newÍtems = [...ÍtemsRequerimientosServicios];
    newÍtems.splice(index, 1);
    setÍtemsRequerimientosServicios(newÍtems);
  };

  const handleRemoveParticipant = (index) => {
    const newParticipant = [...Participants];
    newParticipant.splice(index, 1);
    setParticipants(newParticipant);
  };
  const handleRemoveParticipant2 = (index) => {
    const newParticipant = [...Participants2];
    newParticipant.splice(index, 1);
    setParticipants2(newParticipant);
  };

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log(params.id);
        updateProtocol(params.id, {
          ...data,
        });
        setSuccessMessage("Cambios guardados exitosamente");
      } else {
        console.log(data);
        createProtocol({
          ...data,
        });
        setSuccessMessage("Creado Exitosamente");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const loadEvent = async () => {
      if (params.id) {
        const protocol = await getProtocol(params.id);
        console.log(protocol);

        // Asegúrate de que event.schedules exista y sea un array antes de asignarlo
        if (
          protocol.master_of_ceremonies &&
          Array.isArray(protocol.master_of_ceremonies)
        ) {
          protocol.master_of_ceremonies.forEach((master, index) => {
            setValue(
              `master_of_ceremonies[${index}].first_name`,
              master.first_name
            );
            setValue(
              `master_of_ceremonies[${index}].last_name`,
              master.last_name
            );
            setValue(`master_of_ceremonies[${index}].email`, master.email);
            setValue(`master_of_ceremonies[${index}].phone`, master.phone);
            setValue(`master_of_ceremonies[${index}].status`, master.status);
          });
        }

        if (protocol.closing_data && Array.isArray(protocol.closing_data)) {
          protocol.closing_data.forEach((closing, index) => {
            setValue(
              `closing_data[${index}].participant_number`,
              closing.participant_number
            );
            setValue(`closing_data[${index}].name`, closing.name);
            setValue(
              `closing_data[${index}].academic_degree`,
              closing.academic_degree
            );
            setValue(
              `closing_data[${index}].company_institution`,
              closing.company_institution
            );
            setValue(`closing_data[${index}].position`, closing.position);
            setValue(
              `closing_data[${index}].observations`,
              closing.observations
            );
          });
        }
        if (
          protocol.inauguration_data &&
          Array.isArray(protocol.inauguration_data)
        ) {
          protocol.inauguration_data.forEach((inauguration, index) => {
            setValue(
              `inauguration_data[${index}].participant_number`,
              inauguration.participant_number
            );
            setValue(`inauguration_data[${index}].name`, inauguration.name);
            setValue(
              `inauguration_data[${index}].academic_degree`,
              inauguration.academic_degree
            );
            setValue(
              `inauguration_data[${index}].company_institution`,
              inauguration.company_institution
            );
            setValue(
              `inauguration_data[${index}].position`,
              inauguration.position
            );
            setValue(
              `inauguration_data[${index}].observations`,
              inauguration.observations
            );
          });
        }
        if (
          protocol.service_requirements &&
          Array.isArray(protocol.service_requirements)
        ) {
          protocol.service_requirements.forEach((service, index) => {
            setValue(
              `service_requirements[${index}].item_number`,
              service.item_number
            );
            setValue(
              `service_requirements[${index}].supplier`,
              service.supplier
            );
            setValue(`service_requirements[${index}].name`, service.name);
            setValue(
              `service_requirements[${index}].quantity`,
              service.quantity
            );
            setValue(`service_requirements[${index}].unit`, service.unit);
            setValue(
              `service_requirements[${index}].unit_price`,
              service.unit_price
            );
            setValue(
              `service_requirements[${index}].observations`,
              service.observations
            );
          });
        }
      }
    };
    loadEvent();
  }, []);

  return (
    <>
      <div className="flex bg-red-100">
        <SidebarForms></SidebarForms>
        <div>
          <div style={{ margin: "10px 20px" }}>
            <form
              style={{ margin: "10px 20px" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="bg-white p-4 mb-4 border-t-8 border-univalleColorOne rounded-lg">
                <h1 className="text-3xl  mb-2">Protocolo</h1>
                <p className="text-gray-600">
                  Por favor, completa la siguiente información sobre el
                  protocolo de tu evento.
                </p>
              </div>
              <div
                className={`mb-2 p-4 border bg-white ${
                  focusedInput === "title"
                    ? "border-univalleColorOne"
                    : "border-gray-300"
                } rounded-lg`}
              >
                <h1 className="text-3xl  mb-2">
                  3.1 Requerimientos y Servicios
                </h1>

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
                        <Label>Proveedor</Label>
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
                    {ÍtemsRequerimientosServicios.map((Ítem, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="ÍtemName"
                            {...register(`service_requirements[${index}].name`)}
                            required
                          ></Input>
                        </td>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="unit_price"
                            placeholder="Precio por Unidad"
                            {...register(
                              `service_requirements[${index}].quantity`
                            )}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              setValue(
                                `service_requirements[${index}].quantity`,
                                value
                              );
                            }}
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Proveedor"
                            {...register(
                              `service_requirements[${index}].supplier`
                            )}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Unidad de Medida"
                            {...register(`service_requirements[${index}].unit`)}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="unit_price"
                            placeholder="Precio por Unidad"
                            {...register(
                              `service_requirements[${index}].unit_price`
                            )}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              setValue(
                                `service_requirements[${index}].unit_price`,
                                value
                              );
                            }}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Observaciones"
                            {...register(
                              `service_requirements[${index}].observations`
                            )}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            type="button"
                            className="bg-red-800 hover:bg-red-700 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleRemoveRow(index)}
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
                className="bg-red-800 hover:bg-red-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleAddRow}
                type="button"
                style={{ margin: "10px 20px" }}
              >
                Agregar fila
              </button>
              <div
                className={`mb-2 p-4 border bg-white ${
                  focusedInput === "title"
                    ? "border-univalleColorOne"
                    : "border-gray-300"
                } rounded-lg`}
              >
                <h3 className="text-2xl  mb-4">
                  3.2 Participantes en la Inauguración
                </h3>

                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">
                        <Label>Nombre</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Numero de Telefono</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Titulo Academico</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Institución de la Empresa</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Posición</Label>
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
                    {Participants.map((participant, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            {...register(`inauguration_data[${index}].name`)}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="quantity"
                            min="0"
                            {...register(
                              `inauguration_data[${index}].participant_number`
                            )}
                            required
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Titulo Academico"
                            {...register(
                              `inauguration_data[${index}].academic_degree`
                            )}
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Posición"
                            {...register(
                              `inauguration_data[${index}].position`
                            )}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Institución de la Empresa"
                            {...register(
                              `inauguration_data[${index}].company_institution`
                            )}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Observaciones"
                            {...register(
                              `inauguration_data[${index}].observations`
                            )}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            type="button"
                            className="bg-red-800 hover:bg-red-700 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleRemoveParticipant(index)}
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
                className="bg-red-800 hover:bg-red-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleAddParticipant}
                type="button"
                style={{ margin: "10px 20px" }}
              >
                Agregar fila
              </button>
              <div
                className={`mb-2 p-4 border bg-white ${
                  focusedInput === "title"
                    ? "border-univalleColorOne"
                    : "border-gray-300"
                } rounded-lg`}
              >
                <h3 className="text-2xl  mb-4">
                  3.3 Participantes en la Clausura
                </h3>

                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">
                        <Label>Nombre</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Numero de Telefono</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Titulo Academico</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Institución de la Empresa</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Posición</Label>
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
                    {Participants2.map((participant, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            {...register(`closing_data[${index}].name`)}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="quantity"
                            min="0"
                            {...register(
                              `closing_data[${index}].participant_number`
                            )}
                            required
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Titulo Academico"
                            {...register(
                              `closing_data[${index}].academic_degree`
                            )}
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Posición"
                            {...register(`closing_data[${index}].position`)}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Institución de la Empresa"
                            {...register(
                              `closing_data[${index}].company_institution`
                            )}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Observaciones"
                            {...register(`closing_data[${index}].observations`)}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            type="button"
                            className="bg-red-800 hover:bg-red-700 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleRemoveParticipant2(index)}
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
                className="bg-red-800 hover:bg-red-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleAddParticipant2}
                type="button"
                style={{ margin: "10px 20px" }}
              >
                Agregar fila
              </button>
              <div
                className={`mb-2 p-4 border bg-white ${
                  focusedInput === "title"
                    ? "border-univalleColorOne"
                    : "border-gray-300"
                } rounded-lg`}
              >
                <h3 className="text-2xl  mb-4">3.4 Maestro de Ceremonia</h3>

                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">
                        <Label>Nombre</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Apellido</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Email</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Telefono</Label>
                      </th>
                      <th className="px-4 py-2">
                        <Label>Estado</Label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Master.map((master, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            {...register(
                              `master_of_ceremonies[${index}].first_name`
                            )}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="last_name"
                            placeholder="Apellido"
                            {...register(
                              `master_of_ceremonies[${index}].last_name`
                            )}
                            required
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Email"
                            {...register(
                              `master_of_ceremonies[${index}].email`
                            )}
                          />
                        </td>

                        <td className="border px-4 py-2">
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="observations"
                            placeholder="Telefono"
                            {...register(
                              `master_of_ceremonies[${index}].phone`
                            )}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder={"Si o No?"}
                            required
                            {...register(
                              `master_of_ceremonies[${index}].status`
                            )}
                          >
                            <option value="true">Si</option>
                            <option value="false">No</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {successMessage && (
                <div className="bg-green-500 text-white p-2 mb-4 rounded animate__animated animate__fadeIn">
                  {successMessage}
                </div>
              )}
              <br />
              <button
                type="submit"
                className="bg-univalleColorOne hover:bg-red-800 text-white  py-2 px-4 rounded"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Protocol;
