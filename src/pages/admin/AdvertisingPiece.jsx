import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useForm } from "react-hook-form";
import { useSpectatorRequest } from "../../context/SpectatorContext";
import { Label, Input } from "../../components/ui";
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

  useEffect(() => {
    getSpectators();
    const loadEvent = async () => {
      if (params.id) {
        const advertisement = await getAdvertisement(params.id);
        setValue("title", advertisement.title);
        setValue("area", advertisement.area);
        setValue("goals", advertisement.goals);
        setValue("scope", advertisement.scope);
        setValue("description", advertisement.description);
        setValue("visual_references", advertisement.visual_references);
        setValue("registrations_links", advertisement.registrations_links);
        setValue("observations", advertisement.observations);

        // Configurar el campo "Dirigido a" (spectators)
        if (advertisement.spectators.length > 0) {
          const firstSpectator = advertisement.spectators[0]._id; // Supongo que el ID es el valor correcto
          setValue("spectators", firstSpectator);
        }
      }
    };
    loadEvent();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (params.id) {
        updateAdvertisement(params.id, {
          ...data,
        });
      } else {
        createAdvertisement({
          ...data,
        });
      }
      setSuccessMessage("Guardado Correctamente");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const onAccept = async () => {
    try {
      acceptAP(params.id);
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

  const onReject = async () => {
    try {
      rejectAP(params.id);
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
        <h1 className="text-2xl font-bold mb-4">
          Detalles de la Pieza Publicitaria
        </h1>
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                Título:
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                <Input
                  type="text"
                  name="title"
                  placeholder="Nombre del Evento"
                  {...register("title")}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                Área:
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                <Input type="text" name="area" {...register("area")} readOnly />
              </td>
            </tr>
            <tr>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                Objetivos:
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                <Input
                  type="text"
                  name="goals"
                  {...register("goals")}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                Dirigido a:
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
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
              </td>
            </tr>
            <tr>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                Ámbito:
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                <select name="scope" {...register("scope")} readOnly>
                  <option value="">Selecciona el Ámbito</option>
                  <option value="regional">Regional</option>
                  <option value="national">Nacional</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                Descripción:
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                <Input
                  type="text"
                  name="description"
                  {...register("description")}
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                Referencias Visuales:
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                <Input
                  type="text"
                  name="visual_references"
                  {...register("visual_references")}
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                Enlaces de Registro:
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                <Input
                  type="text"
                  name="registrations_links"
                  {...register("registrations_links")}
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                Observaciones:
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap">
                <Input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="observations"
                  type="text"
                  {...register("observations")}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => onAccept()}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => onReject()}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
          >
            Denegar
          </button>
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Guardar
          </button>
        </div>
        {successMessage && (
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisingPieceAdmin;
