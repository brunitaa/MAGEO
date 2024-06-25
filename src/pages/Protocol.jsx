import React, { useEffect, useState } from "react";
import { Label, Input } from "../components/ui/index";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useprotocolRequest } from "../context/ProtocolContext";
import SidebarForms from "../components/SideBarForms";
import { useEventRequest } from "../context/EventsContext";

function Protocol() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const params = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const { events = [], getMyEvents } = useEventRequest(); // Default to empty array
  const navigate = useNavigate();
  const handleBlur = () => setFocusedInput(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const handleFocus = (field) => setFocusedInput(field);
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
  const handleRemoveDisertante = (index) => {
    const newDisertantes = [...disertantes];
    newDisertantes.splice(index, 1);
    setDisertantes(newDisertantes);
  };

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
  const { createProtocol, getProtocol, updateProtocol } = useprotocolRequest();

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "service_requirements",
  });

  const {
    fields: participantFields,
    append: appendParticipant,
    remove: removeParticipant,
  } = useFieldArray({
    control,
    name: "inauguration_data",
  });

  const {
    fields: participant2Fields,
    append: appendParticipant2,
    remove: removeParticipant2,
  } = useFieldArray({
    control,
    name: "closing_data",
  });

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
  const allÍtems = [
    "Testera",
    "Marbetes",
    "Banderas (Bolivia, Santa Cruz, Pueblos Indígenas del Oriente, Univalle)",
    "Invitaciones",
    "Programa del evento",
    "Atención sala de Consejo",
  ];
  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log(params.id);
        updateProtocol(params.id, {
          ...data,
        });
      } else {
        console.log(data);
        createProtocol({
          ...data,
        });
        setSuccessMessage("Creado Correctamente");
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
        const protocol = await getProtocol(params.id);
        console.log(protocol);
        const firstEvent = protocol.event_id ? protocol.event_id._id : "";
        setValue("event_id", firstEvent);
        // Asignar valores del maestro de ceremonias
        if (protocol.master_of_ceremonies) {
          const { first_name, last_name, email, phone, status } =
            protocol.master_of_ceremonies;
          setValue("master_of_ceremonies.first_name", first_name);
          setValue("master_of_ceremonies.last_name", last_name);
          setValue("master_of_ceremonies.email", email);
          setValue("master_of_ceremonies.phone", phone);
          setValue("master_of_ceremonies.status", status);
        }
        // Asignar valores de cierre, inauguración y requisitos de servicio si existen
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
          if (protocol.speakers && Array.isArray(protocol.speakers)) {
            protocol.speakers.forEach((speaker, index) => {
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
      }
    };
    loadEvent();
  }, [params.id, setValue]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="flex bg-red-100">
      <SidebarForms sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-grow p-10  transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <form style={{ margin: "10px 20px" }} onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white p-4 mb-4 border-t-8 border-univalleColorOne rounded-lg">
            <h1 className="text-3xl mb-2">Formulario de Protocolo</h1>
            <p className="text-gray-600">
              Por favor, completa la siguiente información acerca del protocolo
              de tu evento.
            </p>
            <Link to="/precios">
              <button className="bg-univalleColorOne hover:bg-univalleColorOne text-white font-bold py-2 px-4 rounded mt-4">
                Precios Preferenciales
              </button>
            </Link>
          </div>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "event" ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          >
            <Label>
              Elija el evento al que le pertenece:
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  focusedInput === "event"
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...register("event_id", { required: true })}
                defaultValue={events.length > 0 ? events[0]._id : ""}
                onFocus={() => handleFocus("event_id")}
                onBlur={handleBlur}
              >
                <option value="">Selecciona el evento</option>
                {events.length > 0 &&
                  events.map((event, index) => (
                    <option key={index} value={event._id}>
                      {event.event_name}
                    </option>
                  ))}
              </select>
              {errors.spectators && (
                <span className="text-red-500">Este campo es requerido</span>
              )}
            </Label>
          </div>

          {/* 3.1 Requerimientos y Servicios */}
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "title"
                ? "border-univalleColorOne"
                : "border-gray-300"
            } rounded-lg`}
          >
            <h3 className="text-2xl mb-4">3.1 Requerimientos y Servicios</h3>
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
                {serviceFields.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">
                      <select
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name={`service_requirements[${index}].name`}
                        {...register(`service_requirements[${index}].name`, {
                          required: true,
                        })}
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
                      <Controller
                        control={control}
                        name={`service_requirements[${index}].quantity`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            max="1000"
                            required
                            placeholder="Cantidad"
                          />
                        )}
                      />
                    </td>

                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`service_requirements[${index}].unit`}
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
                        name={`service_requirements[${index}].unit_price`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            required
                            placeholder="Precio por Unidad"
                          />
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`service_requirements[${index}].observations`}
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
                        onClick={() => removeService(index)}
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
              appendService({
                name: "",
                quantity: 0,
                item_number: 0,
                supplier: "",
                unit: "",
                unit_price: 0,
                observations: "",
              })
            }
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
            <h3 className="text-2xl mb-4">3.2 Maestro de Ceremonia</h3>
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
                <tr>
                  <td className="border px-4 py-2">
                    <Input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="first_name"
                      placeholder="Nombre"
                      required
                      {...register(`master_of_ceremonies.first_name`)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="last_name"
                      required
                      placeholder="Apellido"
                      {...register(`master_of_ceremonies.last_name`)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      required
                      placeholder="Email"
                      {...register(`master_of_ceremonies.email`)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      required
                      placeholder="Telefono"
                      {...register(`master_of_ceremonies.phone`)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      required
                      placeholder={"Si o No?"}
                      {...register(`master_of_ceremonies.status`)}
                    >
                      <option value="true">Si</option>
                      <option value="false">No</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3.4 Participantes en la Inauguración */}
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "title"
                ? "border-univalleColorOne"
                : "border-gray-300"
            } rounded-lg`}
          >
            <h3 className="text-2xl mb-4">
              3.4 Participantes en la Inauguración
            </h3>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">
                    <Label>Nombre</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Teléfono</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Título Académico</Label>
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
                {participantFields.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`inauguration_data[${index}].name`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Nombre"
                            required
                          />
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`inauguration_data[${index}].participant_number`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            min="0"
                            required
                            placeholder="Teléfono"
                          />
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`inauguration_data[${index}].academic_degree`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            required
                            placeholder="Título Académico"
                          />
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`inauguration_data[${index}].company_institution`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            required
                            placeholder="Institución de la Empresa"
                          />
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`inauguration_data[${index}].position`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            required
                            placeholder="Posición"
                          />
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`inauguration_data[${index}].observations`}
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
                        onClick={() => removeParticipant(index)}
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
              appendParticipant({
                name: "",
                participant_number: "",
                academic_degree: "",
                company_institution: "",
                position: "",
                observations: "",
              })
            }
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
            <h3 className="text-2xl mb-4">3.5 Participantes en la Clausura</h3>
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
                {participant2Fields.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`closing_data[${index}].name`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Nombre"
                            required
                          />
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`closing_data[${index}].participant_number`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            min="0"
                            required
                            placeholder="Teléfono"
                          />
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`closing_data[${index}].academic_degree`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            required
                            placeholder="Título Académico"
                          />
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`closing_data[${index}].company_institution`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            required
                            placeholder="Institución de la Empresa"
                          />
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`closing_data[${index}].position`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            required
                            placeholder="Posición"
                          />
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Controller
                        control={control}
                        name={`closing_data[${index}].observations`}
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
                        onClick={() => removeParticipant2(index)}
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
              appendParticipant2({
                name: "",
                participant_number: "",
                academic_degree: "",
                company_institution: "",
                position: "",
                observations: "",
              })
            }
            type="button"
            style={{ margin: "10px 20px" }}
          >
            Agregar fila
          </button>

          {successMessage && (
            <div
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              {successMessage}
            </div>
          )}
          <button
            type="submit"
            className="bg-univalleColorOne hover:bg-green-700 text-white  py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Protocol;
