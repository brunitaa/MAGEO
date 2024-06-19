import React, { useEffect, useState } from "react";
import SidebarForms from "../components/SideBarForms";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Input, Label } from "../components/ui";
import { useAdvertisingRequest } from "../context/AdvertisementContext";
import { useForm } from "react-hook-form";
import { useSpectatorRequest } from "../context/SpectatorContext";
import "animate.css";
import "tailwindcss/tailwind.css"; // Asegúrate de importar Tailwind CSS
import { useEventRequest } from "../context/EventsContext";
dayjs.extend(utc);

const AdvertisingPiece = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { events, getMyEvents } = useEventRequest();
  const { spectators, getSpectators } = useSpectatorRequest();
  const { createAdvertisement, getAdvertisement, updateAdvertisement } =
    useAdvertisingRequest();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const handleFocus = (field) => setFocusedInput(field);
  const handleBlur = () => setFocusedInput(null);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      if (params.id) {
        await updateAdvertisement(params.id, { ...data });
        setSuccessMessage("Cambios guardados exitosamente");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        await createAdvertisement({ ...data });
        setSuccessMessage("Creado Exitosamente");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(error.message || "Error submitting form");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  useEffect(() => {
    getSpectators();
    getMyEvents();
    const loadEvent = async () => {
      if (params.id) {
        const advertisement = await getAdvertisement(params.id);
        setValue("title", advertisement.title);
        setValue("area", advertisement.area);
        const firstEvent = advertisement.event ? advertisement.event._id : "";
        setValue("event", firstEvent);
        const firstSpectator =
          advertisement.spectators.length > 0
            ? advertisement.spectators[0]._id
            : "";
        setValue("spectators", firstSpectator);
        setValue("goals", advertisement.goals);
        setValue("scope", advertisement.scope);
        setValue("description", advertisement.description);
        setValue("visual_references", advertisement.visual_references);
        setValue("registrations_links", advertisement.registrations_links);
      }
    };
    loadEvent();
  }, [params.id, getAdvertisement, setValue, getSpectators]);

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
              <h1 className="text-3xl mb-2">Pieza publicitaria</h1>
              <p className="text-gray-600">
                Por favor, completa la siguiente información para crear o editar
                una pieza publicitaria.
              </p>
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
                  {...register("event", { required: true })}
                  defaultValue={event.length > 0 ? event[0]._id : ""}
                  onFocus={() => handleFocus("event")}
                  onBlur={handleBlur}
                >
                  <br></br>
                  <option value="">Selecciona el evento</option>
                  {events.map((event, index) => (
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
            <div
              className={`mb-2 p-4 border bg-white ${
                focusedInput === "title" ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            >
              <Label>
                Titulo:
                <Input
                  type="text"
                  name="title"
                  placeholder="Nombre del Evento"
                  {...register("title", { required: true })}
                  onFocus={() => handleFocus("title")}
                  onBlur={handleBlur}
                />
                {errors.title && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </Label>
            </div>
            <div
              className={`mb-2 p-4 border bg-white ${
                focusedInput === "area" || focusedInput === "goals"
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg`}
            >
              <div className="flex gap-4">
                <Label className="flex-1 block text-gray-700 text-sm mb-2">
                  Area:
                  <Input
                    placeholder="Area"
                    type="text"
                    name="area"
                    {...register("area", { required: true })}
                    onFocus={() => handleFocus("area")}
                    onBlur={handleBlur}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                      focusedInput === "area"
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.area && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
                <Label className="flex-1 block text-gray-700 text-sm mb-2">
                  Objetivos:
                  <Input
                    type="text"
                    placeholder="Objetivos"
                    name="goals"
                    {...register("goals", { required: true })}
                    onFocus={() => handleFocus("goals")}
                    onBlur={handleBlur}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                      focusedInput === "goals"
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.goals && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
              </div>
            </div>
            <div
              className={`mb-2 p-4 border bg-white ${
                focusedInput === "spectators" || focusedInput === "scope"
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg`}
            >
              <div className="flex gap-4">
                <Label>
                  Dirigido a:
                  <select
                    className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                      focusedInput === "spectators"
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    {...register("spectators", { required: true })}
                    defaultValue={
                      spectators.length > 0 ? spectators[0]._id : ""
                    }
                    onFocus={() => handleFocus("spectators")}
                    onBlur={handleBlur}
                  >
                    <option value="">Selecciona un espectador</option>
                    {spectators.map((spectator, index) => (
                      <option key={index} value={spectator._id}>
                        {spectator.title}
                      </option>
                    ))}
                  </select>
                  {errors.spectators && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
                <Label>
                  Alcanze:
                  <select
                    name="scope"
                    {...register("scope", { required: true })}
                    onFocus={() => handleFocus("scope")}
                    onBlur={handleBlur}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                      focusedInput === "scope"
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Selecciona alcance</option>
                    <option value="regional">Regional</option>
                    <option value="national">National</option>
                  </select>
                  {errors.scope && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
              </div>
            </div>
            <div
              className={`mb-2 p-4 border bg-white ${
                focusedInput === "description"
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg`}
            >
              <Label>
                Descripción:
                <Input
                  placeholder="Descripción"
                  type="text"
                  name="description"
                  {...register("description", { required: true })}
                  onFocus={() => handleFocus("description")}
                  onBlur={handleBlur}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                    focusedInput === "description"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.description && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </Label>
            </div>
            <div
              className={`mb-2 p-4 border bg-white ${
                focusedInput === "visual_references"
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg`}
            >
              <Label>
                Referencias Visuales:
                <Input
                  placeholder="Referencias Visuales"
                  type="text"
                  name="visual_references"
                  {...register("visual_references")}
                  onFocus={() => handleFocus("visual_references")}
                  onBlur={handleBlur}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                    focusedInput === "visual_references"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </Label>
            </div>
            <div
              className={`mb-2 p-4 border bg-white ${
                focusedInput === "registrations_links"
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg`}
            >
              <Label>
                Link de Registro:
                <Input
                  placeholder="Link de Registro"
                  type="text"
                  name="registrations_links"
                  {...register("registrations_links")}
                  onFocus={() => handleFocus("registrations_links")}
                  onBlur={handleBlur}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                    focusedInput === "registrations_links"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </Label>
            </div>
            {successMessage && (
              <div className="bg-green-500 text-white p-2 mb-2 rounded animate__animated animate__fadeIn">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-500 text-white p-2 mb-2 rounded animate__animated animate__fadeIn">
                {errorMessage}
              </div>
            )}
            <Button type="submit">Enviar</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingPiece;
