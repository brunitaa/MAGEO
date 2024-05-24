import React, { useState, useEffect } from "react";
import SidebarForms from "../components/SideBarForms";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Label } from "../components/ui";
import { useEventRequest } from "../context/EventsContext";
import { useForm, useFieldArray } from "react-hook-form";
import { format, formatISO } from "date-fns";
import { useSpectatorRequest } from "../context/SpectatorContext";
dayjs.extend(utc);

function EventForm() {
  const params = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const { createEvent, getEvent, updateEvent } = useEventRequest();
  const { spectators, getSpectators } = useSpectatorRequest();
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
        // Formatea la fecha
        schedule.date = format(
          new Date(schedule.date),
          "yyyy-MM-dd'T'HH:mm:ssxxx"
        );

        // Formatea el tiempo
        schedule.time = format(
          new Date(`2000-01-01T${schedule.time}`),
          "yyyy-MM-dd'T'HH:mm:ssxxx"
        );
      });
      if (params.id) {
        console.log(params.id);
        updateEvent(params.id, {
          ...data,
        });
        setSuccessMessage("Cambios guardados exitosamente");
      } else {
        console.log(data);
        createEvent({
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
    console.log(spectators);
    const loadEvent = async () => {
      if (params.id) {
        const event = await getEvent(params.id);
        console.log(event);
        setValue("event_name", event.event_name);
        setValue("event_description", event.event_description);
        setValue(
          "date",
          event.date ? dayjs(event.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("campus", event.campus);
        setValue("area", event.area);
        setValue("registration_link", event.registration_link);
        setValue("attendance_control", event.attendance_control);

        // Asegúrate de que event.schedules exista y sea un array antes de asignarlo
        if (event.schedules && Array.isArray(event.schedules)) {
          // Aquí puedes ajustar cómo asignas los valores de los schedules según tu estructura de datos
          event.schedules.forEach((schedule, index) => {
            setValue(`schedules[${index}].place`, schedule.place);
            setValue(
              `schedules[${index}].date`,
              schedule.date ? schedule.date.slice(0, 10) : ""
            );
            setValue(
              `schedules[${index}].time`,
              schedule.time ? schedule.time.slice(0, 10) : ""
            );

            setValue(
              `schedules[${index}].links_to_visual_material`,
              schedule.links_to_visual_material
            );
            setValue(`schedules[${index}].event_type`, schedule.event_type);
            setValue(`schedules[${index}].spectator`, schedule.spectator);
            setValue(`schedules[${index}].coordination`, schedule.coordination);
            setValue(`schedules[${index}].scope`, schedule.scope);
            setValue(`schedules[${index}].description`, schedule.description);
            setValue(`schedules[${index}].spectator`, schedule.spectator);
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

  return (
    <div className="flex">
      <SidebarForms></SidebarForms>
      <div className="flex-grow flex justify-center items-center p-6">
        <form
          className="w-full max-w-4xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-bold mb-4">Formulario de Solicitud</h1>
          <div className="mb-4">
            <Label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="event_name"
            >
              Estado
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              name="state"
              type="text"
              placeholder="aqui estara el estado"
              autoFocus
              readOnly
            />
            <Label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="event_name"
            >
              Nombre del Evento
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              name="event_name"
              type="text"
              placeholder="Nombre del Evento"
              {...register("event_name")}
              required
              autoFocus
            />
          </div>
          <div className="mb-4">
            <Label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="event_description"
            >
              Descripción del Evento
            </Label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="event_description"
              placeholder="Descripción del Evento"
              {...register("event_description")}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="mb-4">
              <Label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="area"
              >
                Area
              </Label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="area"
                type="text"
                placeholder={"Area"}
                {...register("area")}
                required
              />
            </div>
            <div className="mb-4">
              <Label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="campus"
              >
                Sede
              </Label>
              <input
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
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2">
                Link de Registro
              </Label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="registration_link"
                type="text"
                placeholder={"Link"}
                required
                {...register("registration_link")}
              />
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2">
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
          <h2 className="text-xl font-bold mb-2">Horarios</h2>
          {fields.map((schedule, index) => (
            <div key={schedule.id}>
              <h3 className="text-lg font-bold mb-2">Horario {index + 1}</h3>
              <div className="mb-4">
                <Label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`schedules[${index}].place`}
                >
                  Lugar
                </Label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  name={`schedules[${index}].place`}
                  type="text"
                  placeholder="Lugar"
                  {...register(`schedules[${index}].place`, {
                    required: true,
                  })}
                />
              </div>
              <div className="mb-4">
                <Label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`schedules[${index}].date`}
                >
                  Fecha
                </Label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  name={`schedules[${index}].date`}
                  type="date"
                  placeholder="Fecha"
                  {...register(`schedules[${index}].date`, {
                    required: true,
                  })}
                />
              </div>
              <div className="mb-4">
                <Label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={`schedules[${index}].time`}
                >
                  Hora
                </Label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  name={`schedules[${index}].time`}
                  type="time"
                  placeholder="Hora"
                  {...register(`schedules[${index}].time`, {
                    required: true,
                  })}
                />
              </div>
              <div className="mb-4">
                <Label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
              <div className="mb-4">
                <Label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
                  <option value="Cultural Activity">Actividad Cultural</option>
                  <option value="Others">
                    Otros(mencionar en Descripción)
                  </option>
                </select>
              </div>
              <div className="mb-4">
                <Label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2">
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
              <div className="mb-4">
                <Label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
              <div className="mb-4">
                <Label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2">
                  Objetivo de la Actividad
                </Label>
                <input
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
              <div className="mb-4">
                <Label className="block text-gray-700 text-sm font-bold mb-2">
                  Link al material Visual
                </Label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="links_to_visual_material"
                  type="text"
                  placeholder={"Link"}
                  required
                  {...register(`schedules[${index}].links_to_visual_material`, {
                    required: true,
                  })}
                />
              </div>
              {/* Agrega los demás campos de programación aquí */}
            </div>
          ))}
          <div className="flex-grow flex justify-center items-center p-6">
            <Button
              type="button"
              onClick={() => append({})}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
            >
              Agregar Horario
            </Button>
            <div className="divider"></div>
            <Button
              type="button"
              onClick={() => remove({})}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
            >
              Eliminar Horario
            </Button>
          </div>

          <br />
          {successMessage && (
            <div className="bg-green-500 text-white p-2 mb-4 rounded animate__animated animate__fadeIn">
              {successMessage}
            </div>
          )}
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
