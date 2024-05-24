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
import { Textarea } from "react-bootstrap-icons";
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

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateAdvertisement(params.id, {
          ...data,
        });
        setSuccessMessage("Cambios guardados exitosamente");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        createAdvertisement({
          ...data,
        });
        setSuccessMessage("Creado Exitosamente");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
      setTimeout(() => {
        navigate("/homepage");
      }, 6000);
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
    <div className="flex">
      <SidebarForms />
      <div className="flex-grow flex justify-center items-center p-6">
        <form
          className="w-full max-w-4xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-bold mb-4">Pieza publicitaria</h1>
          <div className="mb-4">
            <Label>
              Titulo:
              <Input
                type="text"
                name="title"
                placeholder="Nombre del Evento"
                {...register("title")}
                required
              />
            </Label>
          </div>
          <div className="mb-4 flex gap-4">
            <Label className="flex-1">
              Area:
              <Input
                placeholder="Area"
                type="text"
                name="area"
                {...register("area")}
                required
              />
            </Label>
            <Label className="flex-1">
              Objetivos:
              <Input
                type="text"
                placeholder="Objetivos"
                name="goals"
                {...register("goals")}
                required
              />
            </Label>
          </div>
          <div className="mb-4 flex gap-4">
            <Label className="block text-gray-700 text-sm font-bold mb-2">
              Dirigido a
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                {...register("spectators")}
                defaultValue={spectators.length > 0 ? spectators[0].title : ""}
                required
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
              <select name="scope" {...register("scope")} required>
                <option value="">Selecciona alcance</option>
                <option value="regional">Regional</option>
                <option value="national">National</option>
              </select>
            </Label>
          </div>
          <div className="mb-4"></div>
          <div className="mb-4">
            <Label>
              Descripción:
              <Input
                placeholder="Descripción"
                type="text"
                name="description"
                {...register("description")}
                required
              />
            </Label>
          </div>
          <div className="mb-4">
            <Label>
              Referencias Visuales:
              <Input
                placeholder="Referencias Visuales"
                type="text"
                name="visual_references"
                {...register("visual_references")}
              />
            </Label>
          </div>
          <div className="mb-4">
            <Label>
              Link de Registro:
              <Input
                placeholder="Link de Registro"
                type="text"
                name="registrations_links"
                {...register("registrations_links")}
              />
            </Label>
          </div>
          {successMessage && (
            <div className="bg-green-500 text-white p-2 mb-4 rounded animate__animated animate__fadeIn">
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
