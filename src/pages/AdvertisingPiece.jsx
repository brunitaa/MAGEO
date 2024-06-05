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
dayjs.extend(utc);

const AdvertisingPiece = () => {
  const params = useParams();
  const navigate = useNavigate();
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
  const [focusedInput, setFocusedInput] = useState(null);

  const handleFocus = (field) => setFocusedInput(field);
  const handleBlur = () => setFocusedInput(null);

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateAdvertisement(params.id, { ...data });
        setSuccessMessage("Cambios guardados exitosamente");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        createAdvertisement({ ...data });
        setSuccessMessage("Creado Exitosamente");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
      setTimeout(() => navigate("/homepage"), 6000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpectators();
    const loadEvent = async () => {
      if (params.id) {
        const advertisement = await getAdvertisement(params.id);
        setValue("title", advertisement.title);
        setValue("area", advertisement.area);
        const firstSpectator =
          advertisement.spectators.length > 0
            ? advertisement.spectators[0].title
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
  }, []);

  return (
    <div className="flex bg-red-100">
      <SidebarForms></SidebarForms>
      <div className="flex-grow flex justify-center items-center p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white p-4 mb-4 border-t-8 border-red-600 rounded-lg">
            <h1 className="text-3xl  mb-2">Pieza publicitaria</h1>
            <p className="text-gray-600">
              Por favor, completa la siguiente información para crear o editar
              una pieza publicitaria.
            </p>
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
                {...register("title")}
                required
                onFocus={() => handleFocus("title")}
                onBlur={handleBlur}
              />
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
              <Label className="flex-1 block text-gray-700 text-sm  mb-2">
                Area:
                <Input
                  placeholder="Area"
                  type="text"
                  name="area"
                  {...register("area")}
                  required
                  onFocus={() => handleFocus("area")}
                  onBlur={handleBlur}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                    focusedInput === "area"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </Label>
              <Label className="flex-1 block text-gray-700 text-sm  mb-2">
                Objetivos:
                <Input
                  type="text"
                  placeholder="Objetivos"
                  name="goals"
                  {...register("goals")}
                  required
                  onFocus={() => handleFocus("goals")}
                  onBlur={handleBlur}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                    focusedInput === "goals"
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
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
                  {...register("spectators")}
                  defaultValue={
                    spectators.length > 0 ? spectators[0].title : ""
                  }
                  required
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
              </Label>
              <Label>
                Alcanze:
                <select
                  name="scope"
                  {...register("scope")}
                  required
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
                {...register("description")}
                required
                onFocus={() => handleFocus("description")}
                onBlur={handleBlur}
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  focusedInput === "description"
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </Label>
          </div>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "visual_references"
                ? "border-blue-500"
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
          </div>{" "}
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
          <Button type="submit">Enviar</Button>
        </form>
      </div>
    </div>
  );
};

export default AdvertisingPiece;
