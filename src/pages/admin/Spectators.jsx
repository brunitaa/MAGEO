import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import { useAuth } from "../../context/AuthContext";
import { useSpectatorRequest } from "../../context/SpectatorContext";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { SpectatorCard } from "../../components/Tasks/Spectator";
import { Button, Input } from "../../components/ui";

export function SpectatorsPage() {
  const {
    spectators,
    getSpectator,
    getSpectators,
    getSpectatorsAdmin,
    updateSpectator,
    createSpectator,
  } = useSpectatorRequest([]);
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { isAdmin } = useAuth([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSpectatorsAdmin();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log(params.id);
        updateSpectator(params.id, {
          ...data,
        });
      } else {
        console.log(data);
        createSpectator({
          ...data,
        });
      }
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadEvent = async () => {
      if (params.id) {
        const spectator = await getSpectator(params.id);
        console.log(spectator);
        setValue("title", spectator.title);
        setValue("value", spectator.value); // Corregir el nombre del campo
      }
    };
    loadEvent();
  }, []);

  return (
    <div className="flex bg-red-100">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-grow p-10  transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <header>
            <h1 className="text-xl font-bold mb-4">Crear Espectadores</h1>
          </header>
          <div className="mb-2 p-4 border bg-white rounded-lg">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre de Espectador:
            </label>
            <Input id="title" type="text" {...register("title")} required />
          </div>
          <div className="mb-2 p-4 border bg-white rounded-lg">
            <label
              htmlFor="value"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Valor:
            </label>
            <Input
              id="value"
              type="number"
              max="15"
              {...register("value")}
              required
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>

        <div>
          <h1 className="text-xl font-bold mb-4">Mis Espectadores</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {spectators &&
              spectators.length > 0 &&
              spectators.map((spectator) => (
                <SpectatorCard spectator={spectator} key={spectator._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
