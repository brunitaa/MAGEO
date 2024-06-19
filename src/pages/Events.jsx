import React, { useState, useEffect } from "react";
import SidebarForms from "../components/SideBarForms";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Input, Label } from "../components/ui";
import { useEventRequest } from "../context/EventsContext";
import { useForm, useFieldArray } from "react-hook-form";
import { useSpectatorRequest } from "../context/SpectatorContext";
dayjs.extend(utc);

function EventForm() {
  const params = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const { createEvent, getEvent, updateEvent } = useEventRequest();
  const { spectators, getSpectators } = useSpectatorRequest();
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const onSubmit = async (data) => {
    try {
      data.schedules.forEach((schedule) => {
        // Combina la fecha con la hora para start_time y end_time
        const combinedStartTime = new Date(
          `${schedule.date}T${schedule.start_time}`
        );
        const combinedEndTime = new Date(
          `${schedule.date}T${schedule.end_time}`
        );

        // Formatea la fecha y hora al estilo ISO 8601 para MongoDB
        schedule.date = new Date(schedule.date).toISOString();
        schedule.start_time = combinedStartTime.toISOString();
        schedule.end_time = combinedEndTime.toISOString();
      });

      // Lógica para crear o actualizar el evento
      if (params.id) {
        await updateEvent(params.id, {
          ...data,
        });
        setSuccessMessage("Cambios guardados exitosamente");
      } else {
        await createEvent({
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
    getSpectators();

    const loadEvent = async () => {
      if (params.id) {
        const event = await getEvent(params.id);

        // Asigna valores al formulario
        setValue("event_name", event.event_name);
        setValue("event_description", event.event_description);
        setValue("campus", event.campus);
        setValue("area", event.area);
        setValue("registration_link", event.registration_link);
        setValue(
          "attendance_control",
          event.attendance_control ? "true" : "false"
        );

        // Formatea y asigna los valores de los horarios (schedules)
        if (event.schedules && Array.isArray(event.schedules)) {
          event.schedules.forEach((schedule, index) => {
            setValue(`schedules[${index}].place`, schedule.place);
            setValue(
              `schedules[${index}].date`,
              dayjs(schedule.date).format("YYYY-MM-DD")
            );
            setValue(
              `schedules[${index}].start_time`,
              dayjs(schedule.start_time).format("HH:mm")
            );
            setValue(
              `schedules[${index}].end_time`,
              dayjs(schedule.end_time).format("HH:mm")
            );
            setValue(
              `schedules[${index}].links_to_visual_material`,
              schedule.links_to_visual_material
            );
            setValue(`schedules[${index}].event_type`, schedule.event_type);
            setValue(`schedules[${index}].spectators`, schedule.spectators); // Ajusta según cómo manejas los espectadores
            setValue(`schedules[${index}].coordination`, schedule.coordination);
            setValue(`schedules[${index}].scope`, schedule.scope);
            setValue(`schedules[${index}].description`, schedule.description);
            setValue(
              `schedules[${index}].activity_objective`,
              schedule.activity_objective
            );
            setValue(`schedules[${index}].format`, schedule.format);
          });
        }
      }
    };

    loadEvent();
  }, []);
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
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white p-4 mb-4 border-t-8 border-univalleColorOne rounded-lg">
              <h1 className="text-3xl  mb-2">Fomulario de Solicitud</h1>
              <p className="text-gray-600">
                Por favor, completa la siguiente información acerca de tu
                evento.
              </p>
            </div>
            <div
              className={`mb-2 p-4 border bg-white ${
                focusedInput === "title"
                  ? "border-univalleColorOne"
                  : "border-gray-300"
              } rounded-lg`}
            >
              <Label
                className="block text-gray-700 text-sm  mb-2"
                htmlFor="event_name"
              >
                Estado
              </Label>
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                name="state"
                type="text"
                placeholder="aqui estara el estado"
                readOnly
              />
            </div>
            <div
              className={`mb-2 p-4 border bg-white ${
                focusedInput === "title"
                  ? "border-univalleColorOne"
                  : "border-gray-300"
              } rounded-lg`}
            >
              <Label
                className="block text-gray-700 text-sm  mb-2"
                htmlFor="event_name"
              >
                Nombre del Evento
              </Label>
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                name="event_name"
                type="text"
                placeholder="Nombre del Evento"
                {...register("event_name")}
                required
                autoFocus
              />
            </div>
            <div
              className={`mb-2 p-4 border bg-white ${
                focusedInput === "title"
                  ? "border-univalleColorOne"
                  : "border-gray-300"
              } rounded-lg`}
            >
              <Label
                className="block text-gray-700 text-sm  mb-2"
                htmlFor="event_description"
              >
                Descripción del Evento
              </Label>
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="event_description"
                placeholder="Descripción del Evento"
                {...register("event_description")}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <div
                className={`mb-2 p-4 border bg-white ${
                  focusedInput === "title"
                    ? "border-univalleColorOne"
                    : "border-gray-300"
                } rounded-lg`}
              >
                <Label
                  className="block text-gray-700 text-sm  mb-2"
                  htmlFor="area"
                >
                  Area
                </Label>
                <Input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="area"
                  type="text"
                  placeholder={"Area"}
                  {...register("area")}
                  required
                />
              </div>
              <div
                className={`mb-2 p-4 border bg-white ${
                  focusedInput === "title"
                    ? "border-univalleColorOne"
                    : "border-gray-300"
                } rounded-lg`}
              >
                <Label
                  className="block text-gray-700 text-sm  mb-2"
                  htmlFor="campus"
                >
                  Sede
                </Label>
                <Input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="campus"
                  type="text"
                  value={"Santa Cruz"}
                  required
                  readOnly
                  {...register("campus")}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <div
                className={`mb-2 p-4 border bg-white ${
                  focusedInput === "title"
                    ? "border-univalleColorOne"
                    : "border-gray-300"
                } rounded-lg`}
              >
                <Label className="block text-gray-700 text-sm  mb-2">
                  Link de Registro
                </Label>
                <Input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="registration_link"
                  type="text"
                  placeholder={"Link"}
                  required
                  {...register("registration_link")}
                />
              </div>
              <div
                className={`mb-2 p-4 border bg-white ${
                  focusedInput === "title"
                    ? "border-univalleColorOne"
                    : "border-gray-300"
                } rounded-lg`}
              >
                <Label className="block text-gray-700 text-sm  mb-2">
                  Control de asistencia
                </Label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="attendance_control"
                  type="text"
                  placeholder={"Si o No?"}
                  required
                  {...register("attendance_control")}
                >
                  <option value="true">Si</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            {/* Sección de programación (schedules) */}

            <div className="bg-white p-4 mb-4 border-t-8 border-univalleColorOne rounded-lg">
              <h1 className="text-3xl  mb-2">Horarios</h1>
              <p className="text-gray-600">
                Por favor, añade todos los horarios del evento.
              </p>
            </div>

            {fields.map((schedule, index) => (
              <div key={schedule.id}>
                <div className="bg-white p-4 mb-4 border-t-8 border-univalleColorOne rounded-lg flex items-center justify-between">
                  <h1 className="text-3xl mb-2">Horario {index + 1}</h1>
                  <Button type="button" onClick={() => remove(index)}>
                    Eliminar
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`mb-2 p-4 border bg-white ${
                      focusedInput === "title"
                        ? "border-univalleColorOne"
                        : "border-gray-300"
                    } rounded-lg`}
                  >
                    <Label
                      className="block text-gray-700 text-sm  mb-2"
                      htmlFor={`schedules[${index}].place`}
                    >
                      Lugar
                    </Label>
                    <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                      name={`schedules[${index}].place`}
                      type="text"
                      placeholder="Lugar"
                      {...register(`schedules[${index}].place`, {
                        required: true,
                      })}
                    />
                  </div>
                  <div
                    className={`mb-2 p-4 border bg-white ${
                      focusedInput === "title"
                        ? "border-univalleColorOne"
                        : "border-gray-300"
                    } rounded-lg`}
                  >
                    <Label
                      className="block text-gray-700 text-sm  mb-2"
                      htmlFor={`schedules[${index}].date`}
                    >
                      Fecha
                    </Label>
                    <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                      name={`schedules[${index}].date`}
                      type="date"
                      placeholder="Fecha"
                      {...register(`schedules[${index}].date`, {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`mb-2 p-4 border bg-white ${
                      focusedInput === "title"
                        ? "border-univalleColorOne"
                        : "border-gray-300"
                    } rounded-lg`}
                  >
                    <Label
                      className="block text-gray-700 text-sm  mb-2"
                      htmlFor={`schedules[${index}].start_time`}
                    >
                      Hora de comienzo
                    </Label>
                    <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                      name={`schedules[${index}].start_time`}
                      type="time"
                      placeholder="Hora"
                      {...register(`schedules[${index}].start_time`, {
                        required: true,
                      })}
                    />
                  </div>
                  <div
                    className={`mb-2 p-4 border bg-white ${
                      focusedInput === "title"
                        ? "border-univalleColorOne"
                        : "border-gray-300"
                    } rounded-lg`}
                  >
                    <Label
                      className="block text-gray-700 text-sm  mb-2"
                      htmlFor={`schedules[${index}].end_time`}
                    >
                      Hora de finalizacion
                    </Label>
                    <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                      name={`schedules[${index}].end_time`}
                      type="time"
                      placeholder="Hora"
                      {...register(`schedules[${index}].end_time`, {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div
                  className={`mb-2 p-4 border bg-white ${
                    focusedInput === "title"
                      ? "border-univalleColorOne"
                      : "border-gray-300"
                  } rounded-lg`}
                >
                  <Label
                    className="block text-gray-700 text-sm  mb-2"
                    htmlFor={`schedules[${index}].time`}
                  >
                    Modalidad
                  </Label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    name={`schedules[${index}].format`}
                    type="text"
                    placeholder="modalidad"
                    {...register(`schedules[${index}].format`, {
                      required: true,
                    })}
                  >
                    <option value="Virtual">Virtual</option>
                    <option value="In person">Presencial</option>
                  </select>
                </div>
                <div
                  className={`mb-2 p-4 border bg-white ${
                    focusedInput === "title"
                      ? "border-univalleColorOne"
                      : "border-gray-300"
                  } rounded-lg`}
                >
                  <Label
                    className="block text-gray-700 text-sm  mb-2"
                    htmlFor="eventType"
                  >
                    Tipo de Evento
                  </Label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="event_type"
                    {...register(`schedules[${index}].event_type`, {
                      required: true,
                    })}
                    required
                  >
                    <option value="Talks">Charla</option>
                    <option value="Contest">Concurso</option>
                    <option value="Seminar">Seminario</option>
                    <option value="Symposium">Simposium</option>
                    <option value="Workshop">Taller</option>
                    <option value="Conference">Conferencia</option>
                    <option value="Fair">Feria</option>
                    <option value="Signing of Agreement">
                      Firma de Convenio
                    </option>
                    <option value="Inauguration">Poseción</option>
                    <option value="Exhibition">Exposición</option>
                    <option value="Cultural Activity">
                      Actividad Cultural
                    </option>
                    <option value="Others">
                      Otros(mencionar en Descripción)
                    </option>
                  </select>
                </div>
                <div
                  className={`mb-2 p-4 border bg-white ${
                    focusedInput === "title"
                      ? "border-univalleColorOne"
                      : "border-gray-300"
                  } rounded-lg`}
                >
                  <Label
                    className="block text-gray-700 text-sm  mb-2"
                    htmlFor={`schedules[${index}].place`}
                  >
                    Dirigido a
                  </Label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    name={`schedules[${index}].place`}
                    {...register(`schedules[${index}].spectators`, {
                      required: true,
                    })}
                  >
                    <option value="">Selecciona un espectador</option>
                    {spectators.map((spectator, index) => (
                      <option key={index} value={spectator._id}>
                        {spectator.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className={`mb-2 p-4 border bg-white ${
                    focusedInput === "title"
                      ? "border-univalleColorOne"
                      : "border-gray-300"
                  } rounded-lg`}
                >
                  <Label className="block text-gray-700 text-sm  mb-2">
                    Alcance del Evento
                  </Label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="scope"
                    required
                    {...register(`schedules[${index}].scope`, {
                      required: true,
                    })}
                  >
                    <option value="Regional">Regional</option>
                    <option value="Nacional">Nacional</option>
                  </select>
                </div>
                <div
                  className={`mb-2 p-4 border bg-white ${
                    focusedInput === "title"
                      ? "border-univalleColorOne"
                      : "border-gray-300"
                  } rounded-lg`}
                >
                  <Label
                    className="block text-gray-700 text-sm  mb-2"
                    htmlFor="event_description"
                  >
                    Descripción
                  </Label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Descripción del Evento"
                    {...register(`schedules[${index}].description`)}
                    required
                  />
                </div>
                <div
                  className={`mb-2 p-4 border bg-white ${
                    focusedInput === "title"
                      ? "border-univalleColorOne"
                      : "border-gray-300"
                  } rounded-lg`}
                >
                  <Label
                    className="block text-gray-700 text-sm  mb-2"
                    htmlFor="coordination"
                  >
                    Coordinación con
                  </Label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="coordination"
                    required
                    {...register(`schedules[${index}].coordination`, {
                      required: true,
                    })}
                  >
                    <option value="bienestar">Bienestar</option>
                    <option value="comunicacion">Comunicación</option>
                    <option value="direccion_carrera">
                      Dirección de Carrera
                    </option>
                    <option value="administracion_marketing">
                      Administración y Marketing
                    </option>
                  </select>
                </div>
                <div
                  className={`mb-2 p-4 border bg-white ${
                    focusedInput === "title"
                      ? "border-univalleColorOne"
                      : "border-gray-300"
                  } rounded-lg`}
                >
                  <Label className="block text-gray-700 text-sm  mb-2">
                    Objetivo de la Actividad
                  </Label>
                  <Input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="activity_objective"
                    type="text"
                    placeholder="Objetivo de la Actividad"
                    required
                    {...register(`schedules[${index}].activity_objective`, {
                      required: true,
                    })}
                  />
                </div>
                <div
                  className={`mb-2 p-4 border bg-white ${
                    focusedInput === "title"
                      ? "border-univalleColorOne"
                      : "border-gray-300"
                  } rounded-lg`}
                >
                  <Label className="block text-gray-700 text-sm  mb-2">
                    Link al material Visual
                  </Label>
                  <Input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="links_to_visual_material"
                    type="text"
                    placeholder={"Link"}
                    required
                    {...register(
                      `schedules[${index}].links_to_visual_material`,
                      {
                        required: true,
                      }
                    )}
                  />
                </div>
                {/* Agrega los demás campos de programación aquí */}
              </div>
            ))}
            <div className="flex-grow flex justify-center items-center p-6">
              <div className="flex justify-center items-center p-6">
                <Button
                  type="button"
                  onClick={() => append({})}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mx-2"
                >
                  Agregar Horario
                </Button>
              </div>

              <div className="divider"></div>
            </div>

            <br />
            {successMessage && (
              <div className="bg-green-500 text-white p-2 mb-4 rounded animate__animated animate__fadeIn">
                {successMessage}
              </div>
            )}
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded"
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
