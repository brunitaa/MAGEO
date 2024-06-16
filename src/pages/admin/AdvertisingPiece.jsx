import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useForm, useFieldArray } from "react-hook-form";

import { useSpectatorRequest } from "../../context/SpectatorContext";
import { Label, Button, Input } from "../../components/ui";
import { useAdvertisingRequest } from "../../context/AdvertisementContext";
import SidebarForms from "../../components/SideBarForms";
dayjs.extend(utc);

const AdvertisingPieceAdmin = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { spectators, getSpectators } = useSpectatorRequest();
  const {
    createAdvertisement,
    getAdvertisement,
    updateAdvertisement,
    acceptAP,
    rejectAP,
  } = useAdvertisingRequest();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const onAccept = async (data) => {
    try {
      console.log(params.id);
      acceptAP(params.id, {
        ...data,
      });
      setSuccessMessage("Aceptado Correctamente");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setTimeout(() => {
        navigate("/admin");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const onReject = async (data) => {
    try {
      console.log(params.id);
      rejectAP(params.id, {
        ...data,
      });
      setSuccessMessage("Rechazado Correctamente");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setTimeout(() => {
        navigate("/admin");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log(params.id);
        updateAdvertisement(params.id, {
          ...data,
        });
      } else {
        console.log(data);
        createAdvertisement({
          ...data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpectators();
    const loadEvent = async () => {
      if (params.id) {
        const advertisement = await getAdvertisement(params.id);
        console.log(advertisement);
        setValue("title", advertisement.title);
        setValue("area", advertisement.area);
        const firstSpectator =
          advertisement.spectators.length > 0
            ? advertisement.spectators[0].title
            : "";
        setValue("spectators", firstSpectator);
        console.log(firstSpectator);

        setValue("goals", advertisement.goals);
        setValue("area", advertisement.area);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title:
          <Input
            type="text"
            name="title"
            placeholder="Nombre del Evento"
            {...register("title")}
            readOnly
          />
        </label>

        <label>
          Area:
          <Input type="text" name="area" {...register("area")} readOnly />
        </label>

        <label>
          Goals:
          <Input type="text" name="goals" {...register("goals")} readOnly />
        </label>
        <div
          className={`mb-2 p-4 border bg-white ${
            focusedInput === "title"
              ? "border-univalleColorOne"
              : "border-gray-300"
          } rounded-lg`}
        >
          <Label className="block text-gray-700 text-sm  mb-2">
            Dirigido a
          </Label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            {...register("spectators")}
            readOnly
          >
            <option value="">Selecciona un espectador</option>
            {spectators.map((spectator, index) => (
              <option key={index} value={spectator._id}>
                {spectator.title}
              </option>
            ))}
          </select>
        </div>
        <label>
          Scope:
          <select name="scope" {...register("scope")} readOnly>
            <option value="">Select Scope</option>
            <option value="regional">Regional</option>
            <option value="national">National</option>
          </select>
        </label>
        <label>
          Description:
          <Input type="text" name="description" {...register("description")} />
        </label>
        <label>
          Visual References:
          <Input
            type="text"
            name="visual_references"
            {...register("visual_references")}
          />
        </label>
        <label>
          Registrations Links:
          <Input
            type="text"
            name="registrations_links"
            {...register("registrations_links")}
          />
        </label>
        <div
          className={`mb-2 p-4 border bg-white ${
            focusedInput === "title"
              ? "border-univalleColorOne"
              : "border-gray-300"
          } rounded-lg`}
        >
          <Label className="block text-gray-700 text-sm  mb-2">
            Observaciones
          </Label>
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="observations"
            type="text"
            {...register("observations")}
          />
        </div>

        <button
          type="button"
          onClick={() => onAccept()}
          className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
        >
          Aceptar
        </button>

        <button
          type="button"
          onClick={() => onReject()}
          className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
        >
          Denegar
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdvertisingPieceAdmin;
