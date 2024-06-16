import React, { useEffect, useState } from "react";
import { Label } from "../components/ui";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogisticRequest } from "../context/LogisticContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import SidebarForms from "../components/SideBarForms";
dayjs.extend(utc);
import "animate.css";
import { Input } from "../components/ui";
import { useEventRequest } from "../context/EventsContext";

function Logistic() {
  const params = useParams();
  const handleEventChange = (event) => {
    const selectedEvent = events.find((e) => e._id === event.target.value);
    setSelectedEventName(selectedEvent ? selectedEvent.event_name : "");
    setValue("event_id", event.target.value);
  };
  const navigate = useNavigate();
  const [selectedEventName, setSelectedEventName] = useState("");
  const handleFocus = (field) => setFocusedInput(field);
  const handleBlur = () => setFocusedInput(null);
  const { events, getMyEvents } = useEventRequest();
  const [focusedInput, setFocusedInput] = useState(null);
  const [mueblesServicios, setmueblesServicios] = useState([
    {
      ÍtemName: "",
      quantity: 0,
      supplier: "",
      unit: "",
      unit_price: "",
      observations: "",
    },
  ]);
  const [disertantes, setDisertantes] = useState([
    {
      name: "",
      arrival_date_and_time: "",
      return_date_and_time: "",
      accommodation: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      responsible_person: {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
      },
    },
  ]);
  const [materialApoyo, setmaterialApoyo] = useState([
    {
      ÍtemName: "",
      quantity: 0,
      supplier: "",
      unit: "",
      unit_price: "",
      observations: "",
    },
  ]);
  const [foodServices, setFoodServices] = useState([
    {
      ÍtemName: "",
      quantity: 0,
      supplier: "",
      unit: "",
      unit_price: "",
      observations: "",
    },
  ]);
  const [transport, setTransport] = useState([
    {
      ÍtemName: "",
      quantity: 0,
      supplier: "",
      unit: "",
      unit_price: "",
      observations: "",
    },
  ]);

  const { createLogistic, getLogistic, updateLogistic } = useLogisticRequest();

  const handleAddRow = () => {
    setmueblesServicios([
      ...mueblesServicios,
      {
        ÍtemName: "",
        quantity: 0,
        supplier: "",
        unit: "",
        unit_price: "",
        observations: "",
      },
    ]);
  };
  const handleAddDisertante = () => {
    setDisertantes([
      ...disertantes,
      {
        name: "",
        arrival_date_and_time: "",
        return_date_and_time: "",
        accommodation: {
          name: "",
          address: "",
          email: "",
          phone: "",
        },
        responsible_person: {
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
        },
      },
    ]);
  };

  const handleAddMateril = () => {
    setmaterialApoyo([
      ...materialApoyo,
      {
        name: "",
        quantity: 0,
        supplier: "",
        unit: "",
        unit_price: "",
        observations: "",
      },
    ]);
  };
  const handleAddTransport = () => {
    setTransport([
      ...transport,
      {
        name: "",
        quantity: 0,
        supplier: "",
        unit: "",
        unit_price: "",
        observations: "",
      },
    ]);
  };

  const handleAddFood = () => {
    setFoodServices([
      ...foodServices,
      {
        name: "",
        quantity: 0,
        supplier: "",
        unit: "",
        unit_price: "",
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
    const newÍtems = [...mueblesServicios];
    newÍtems.splice(index, 1);
    setmueblesServicios(newÍtems);
  };
  const handleRemoveTransport = (index) => {
    const newTransport = [...transport];
    newTransport.splice(index, 1);
    setTransport(newTransport);
  };

  const handleRemoveMaterial = (index) => {
    const newMaterial = [...materialApoyo];
    newMaterial.splice(index, 1);
    setmaterialApoyo(newMaterial);
  };
  const handleRemoveFood = (index) => {
    const newFood = [...foodServices];
    newFood.splice(index, 1);
    setFoodServices(newFood);
  };
  const handleRemoveDisertante = (index) => {
    const newDisertantes = [...disertantes];
    newDisertantes.splice(index, 1);
    setDisertantes(newDisertantes);
  };

  const [successMessage, setSuccessMessage] = useState("");
  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log(params.id);
        await updateLogistic(params.id, {
          ...data,
        });
        setSuccessMessage("Cambios guardados exitosamente");
      } else {
        console.log(data);
        await createLogistic({
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
    getMyEvents();
    const loadEvent = async () => {
      if (params.id) {
        const logistic = await getLogistic(params.id);
        console.log(logistic);
        setValue("state", logistic.state);
        const firstEvent =
          logistic.events_id.length > 0 ? logistic.event_id[0]._id : "";
        setValue("event_id", firstEvent);

        if (
          logistic.furniture_services &&
          Array.isArray(logistic.furniture_services)
        ) {
          logistic.furniture_services.forEach((furniture, index) => {
            setValue(
              `furniture_services[${index}].item_number`,
              furniture.item_number
            );
            setValue(
              `furniture_services[${index}].supplier`,
              furniture.supplier
            );
            setValue(`furniture_services[${index}].name`, furniture.name);
            setValue(
              `furniture_services[${index}].quantity`,
              furniture.quantity
            );
            setValue(`furniture_services[${index}].unit`, furniture.unit);
            setValue(
              `furniture_services[${index}].unit_price`,
              furniture.unit_price
            );
            setValue(
              `furniture_services[${index}].observations`,
              furniture.observations
            );
          });
        }
        if (
          logistic.transport_services &&
          Array.isArray(logistic.transport_services)
        ) {
          logistic.transport_services.forEach((transport, index) => {
            setValue(
              `transport_services[${index}].item_number`,
              transport.item_number
            );
            setValue(
              `transport_services[${index}].supplier`,
              transport.supplier
            );
            setValue(`transport_services[${index}].name`, transport.name);
            setValue(
              `transport_services[${index}].quantity`,
              transport.quantity
            );
            setValue(`transport_services[${index}].unit`, transport.unit);
            setValue(
              `transport_services[${index}].unit_price`,
              transport.unit_price
            );
            setValue(
              `transport_services[${index}].observations`,
              transport.observations
            );
          });
        }
        if (logistic.food_services && Array.isArray(logistic.food_services)) {
          logistic.food_services.forEach((food, index) => {
            setValue(`food_services[${index}].item_number`, food.item_number);
            setValue(`food_services[${index}].supplier`, food.supplier);
            setValue(`food_services[${index}].academic_name`, food.name);
            setValue(`food_services[${index}].quantity`, food.quantity);
            setValue(`food_services[${index}].unit`, food.unit);
            setValue(`food_services[${index}].unit_price`, food.unit_price);
            setValue(`food_services[${index}].observations`, food.observations);
          });
        }
        if (
          logistic.support_material &&
          Array.isArray(logistic.support_material)
        ) {
          logistic.support_material.forEach((support, index) => {
            setValue(
              `support_material[${index}].item_number`,
              support.item_number
            );
            setValue(`support_material[${index}].supplier`, support.supplier);
            setValue(`support_material[${index}].academic_name`, support.name);
            setValue(`support_material[${index}].quantity`, support.quantity);
            setValue(`support_material[${index}].unit`, support.unit);
            setValue(
              `support_material[${index}].unit_price`,
              support.unit_price
            );
            setValue(
              `support_material[${index}].observations`,
              support.observations
            );
          });
        }
        if (logistic.speakers && Array.isArray(logistic.speakers)) {
          logistic.speakers.forEach((speaker, index) => {
            setValue(`speakers[${index}].name`, speaker.name);

            // Asigna la fecha de llegada y formatea correctamente
            setValue(
              `speakers[${index}].arrival_date_and_time`,
              speaker.arrival_date_and_time
                ? dayjs(speaker.arrival_date_and_time)
                    .utc()
                    .format("YYYY-MM-DDTHH:mm")
                : "" // Asegúrate de manejar correctamente los casos en los que no hay fecha
            );

            // Asigna la fecha de retorno
            setValue(
              `speakers[${index}].return_date_and_time`,
              speaker.return_date_and_time
                ? dayjs(speaker.return_date_and_time)
                    .utc()
                    .format("YYYY-MM-DDTHH:mm")
                : "" // Asegúrate de manejar correctamente los casos en los que no hay fecha
            );
            const responsible_person = speaker.responsible_person;
            if (responsible_person) {
              console.log("HHH");
              setValue(
                `speakers[${index}].responsible_person.first_name`,
                responsible_person.first_name
              );
              setValue(
                `speakers[${index}].responsible_person.phone`,
                responsible_person.phone
              );
              setValue(
                `speakers[${index}].responsible_person.email`,
                responsible_person.email
              );
              setValue(
                `speakers[${index}].responsible_person.last_name`,
                responsible_person.last_name
              );
            }

            const accommodation = speaker.accommodation;
            if (accommodation) {
              console.log("HHH");
              setValue(
                `speakers[${index}].accommodation.address`,
                accommodation.address
              );
              setValue(
                `speakers[${index}].accommodation.phone`,
                accommodation.phone
              );
              setValue(
                `speakers[${index}].accommodation.email`,
                accommodation.email
              );
              setValue(
                `speakers[${index}].accommodation.name`,
                accommodation.name
              );
            }
          });
        }
      }
    };
    loadEvent();
  }, []);

  return (
    <div className="flex bg-red-100">
      <SidebarForms></SidebarForms>
      <div>
        <form style={{ margin: "10px 20px" }} onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white p-4 mb-4 border-t-8 border-univalleColorOne rounded-lg">
            <h1 className="text-3xl  mb-2">Logística</h1>
            <p className="text-gray-600">
              Por favor, completa la siguiente información sobre la logística de
              tu evento.
            </p>
          </div>
          <div className="flex gap-4">
            <div
              className={`mb-2 p-4 border bg-white ${
                focusedInput === "title"
                  ? "border-univalleColorOne"
                  : "border-gray-300"
              } rounded-lg`}
            >
              <Label>
                Evento:
                <select
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                    focusedInput === "event_id"
                      ? "border-univalleColorOne"
                      : "border-gray-300"
                  }`}
                  {...register("event_id")}
                  defaultValue={events.length > 0 ? events[0]._id : ""}
                  required
                  onFocus={() => handleFocus("event_id")}
                  onChange={handleEventChange}
                >
                  <option value="">Selecciona el evento </option>
                  {events.map((event, index) => (
                    <option key={index} value={event._id}>
                      {event.event_name}
                    </option>
                  ))}
                </select>
              </Label>
            </div>
          </div>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "title"
                ? "border-univalleColorOne"
                : "border-gray-300"
            } rounded-lg`}
          >
            <h3 className="text-2xl  mb-4">2.1 Mobiliario y Servicios</h3>

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
                {mueblesServicios.map((mueble, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="ÍtemName"
                        {...register(`furniture_services[${index}].name`)}
                        required
                      ></Input>
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        {...register(`furniture_services[${index}].quantity`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `furniture_services[${index}].quantity`,
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
                        {...register(`furniture_services[${index}].supplier`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        placeholder="Unidad de Medida"
                        {...register(`furniture_services[${index}].unit`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        {...register(`furniture_services[${index}].unit_price`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `furniture_services[${index}].unit_price`,
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
                          `furniture_services[${index}].observations`
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
            <h3 className="text-2xl  mb-4">2.2 Material de apoyo</h3>

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
                {materialApoyo.map((material, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="ÍtemName"
                        {...register(`support_material[${index}].name`)}
                        required
                      ></Input>
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        {...register(`support_material[${index}].quantity`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `support_material[${index}].quantity`,
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
                        {...register(`support_material[${index}].supplier`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        placeholder="Unidad de Medida"
                        {...register(`support_material[${index}].unit`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        {...register(`support_material[${index}].unit_price`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `support_material[${index}].unit_price`,
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
                        {...register(`support_material[${index}].observations`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        type="button"
                        className="bg-red-800 hover:bg-red-700 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleRemoveMaterial(index)}
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
            onClick={handleAddMateril}
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
            <h3 className="text-2xl  mb-4">2.3 Alimentación</h3>

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
                {foodServices.map((food, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="ÍtemName"
                        {...register(`food_services[${index}].name`)}
                        required
                      ></Input>
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        {...register(`food_services[${index}].quantity`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(`food_services[${index}].quantity`, value);
                        }}
                      />
                    </td>

                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        placeholder="Proveedor"
                        {...register(`food_services[${index}].supplier`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        placeholder="Unidad de Medida"
                        {...register(`food_services[${index}].unit`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        {...register(`food_services[${index}].unit_price`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(`food_services[${index}].unit_price`, value);
                        }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        placeholder="Observaciones"
                        {...register(`food_services[${index}].observations`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        type="button"
                        className="bg-red-800 hover:bg-red-700 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleRemoveFood(index)}
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
            onClick={handleAddFood}
            type="button"
            style={{ margin: "10px 20px" }}
          >
            Agregar fila
          </button>
          <div className={`mb-2 p-4  bg-white rounded-lg`}>
            <h3 className="text-2xl mb-4">2.4 Disertantes</h3>

            <table className="table-auto w-full">
              <tbody>
                {disertantes.map((disertante, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="px-4 py-2">
                        <div>
                          <h4 className="text-xl mb-2">Disertante</h4>
                          <Label className="block text-gray-700 text-sm mb-2">
                            Nombre del disertante
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name={`speakers[${index}].name`}
                            {...register(`speakers[${index}].name`)}
                            placeholder="Nombre del disertante"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">
                        <div>
                          <Label className="block text-gray-700 text-sm mb-2">
                            Día de llegada
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="datetime-local"
                            name={`speakers[${index}].arrival_date_and_time`}
                            {...register(
                              `speakers[${index}].arrival_date_and_time`
                            )}
                            placeholder="Día de llegada"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div>
                          <Label className="block text-gray-700 text-sm mb-2">
                            Día de retorno
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="datetime-local"
                            name={`speakers[${index}].return_date_and_time`}
                            {...register(
                              `speakers[${index}].return_date_and_time`
                            )}
                            placeholder="Día de retorno"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">
                        <h4 className="text-xl mb-2">Alojamiento</h4>
                        <div>
                          <Label className="block text-gray-700 text-sm mb-2">
                            Nombre
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name={`speakers[${index}].accommodation.name`}
                            {...register(
                              `speakers[${index}].accommodation.name`
                            )}
                            placeholder="Nombre del alojamiento"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div>
                          <Label className="block text-gray-700 text-sm mb-2">
                            Dirección
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name={`speakers[${index}].accommodation.address`}
                            {...register(
                              `speakers[${index}].accommodation.address`
                            )}
                            placeholder="Dirección"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">
                        <div>
                          <Label className="block text-gray-700 text-sm mb-2">
                            Email
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name={`speakers[${index}].accommodation.email`}
                            {...register(
                              `speakers[${index}].accommodation.email`
                            )}
                            placeholder="Email"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div>
                          <Label className="block text-gray-700 text-sm mb-2">
                            Teléfono
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name={`speakers[${index}].accommodation.phone`}
                            {...register(
                              `speakers[${index}].accommodation.phone`
                            )}
                            placeholder="Teléfono"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">
                        <h4 className="text-xl mb-2">
                          Responsable de Recojo y Retorno
                        </h4>
                        <div>
                          <Label className="block text-gray-700 text-sm mb-2">
                            Nombre
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name={`speakers[${index}].responsible_person.first_name`}
                            {...register(
                              `speakers[${index}].responsible_person.first_name`
                            )}
                            placeholder="Nombre"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div>
                          <Label className="block text-gray-700 text-sm mb-2">
                            Apellido
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name={`speakers[${index}].responsible_person.last_name`}
                            {...register(
                              `speakers[${index}].responsible_person.last_name`
                            )}
                            placeholder="Apellido"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">
                        <div>
                          <Label className="block text-gray-700 text-sm mb-2">
                            Email
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name={`speakers[${index}].responsible_person.email`}
                            {...register(
                              `speakers[${index}].responsible_person.email`
                            )}
                            placeholder="Email"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div>
                          <Label className="block text-gray-700 text-sm mb-2">
                            Teléfono
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name={`speakers[${index}].responsible_person.phone`}
                            {...register(
                              `speakers[${index}].responsible_person.phone`
                            )}
                            placeholder="Teléfono"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">
                        <button
                          className="bg-red-800 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleRemoveDisertante(index)}
                          type="button"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="bg-red-800 hover:bg-red-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddDisertante}
            type="button"
            style={{ margin: "10px 20px" }}
          >
            Agregar Disertante
          </button>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "title"
                ? "border-univalleColorOne"
                : "border-gray-300"
            } rounded-lg`}
          >
            <h3 className="text-2xl  mb-4">2.5 Transporte</h3>

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
                {transport.map((transport, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="ÍtemName"
                        {...register(`transport_services[${index}].name`)}
                        required
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        {...register(`transport_services[${index}].quantity`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `transport_services[${index}].quantity`,
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
                        {...register(`transport_services[${index}].supplier`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        placeholder="Unidad de Medida"
                        {...register(`transport_services[${index}].unit`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        {...register(`transport_services[${index}].unit_price`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `transport_services[${index}].unit_price`,
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
                          `transport_services[${index}].observations`
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        type="button"
                        className="bg-red-800 hover:bg-red-700 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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
          <button
            className="bg-red-800 hover:bg-red-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddTransport}
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
            <Label className="block text-gray-700 text-sm  mb-2">Estado</Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              name="state"
              type="text"
              placeholder="aqui estara el estado"
              autoFocus
              readOnly
              {...register(`state`)}
            />
          </div>
          {successMessage && (
            <div className="bg-green-500 text-white p-2 mb-4 rounded animate__animated animate__fadeIn">
              {successMessage}
            </div>
          )}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Logistic;
