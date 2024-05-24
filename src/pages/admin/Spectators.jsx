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
    <div className="flex">
      <Sidebar />
      <div className="w-full max-w-4xl mx-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <header>
            <h1 className="text-xl font-bold mb-4">Crear Espectadores</h1>
          </header>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title:
            </label>
            <Input id="title" type="text" {...register("title")} required />
          </div>
          <div className="mb-4">
            <label
              htmlFor="value"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Value:
            </label>
            <Input id="value" type="number" {...register("value")} required />
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
