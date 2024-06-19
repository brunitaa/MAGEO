import React from "react";
import { useAdvertisingRequest } from "../../context/AdvertisementContext";
import { useAuth } from "../../context/AuthContext";
import { Button, ButtonLink, Card } from "../ui";

export function AdvertisementCard({ advertisement }) {
  const { deleteAdvertisement } = useAdvertisingRequest();
  const { isAdmin } = useAuth();

  const handleDelete = async () => {
    try {
      await deleteAdvertisement(advertisement._id);
      window.location.reload(); // Recargar la página después de eliminar (considera una mejor solución para evitar recargar toda la página)
    } catch (error) {
      console.log("Error deleting advertisement:", error);
    }
  };

  return (
    <Card className="p-4 border border-gray-300 rounded-md shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {advertisement.title}
        </h2>
      </header>
      <p className="text-base text-gray-700 mb-2">
        {advertisement.description}
      </p>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Estado:</span> {advertisement.state}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Observaciones:</span>{" "}
          {advertisement.observations}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:shadow-outline"
        >
          Eliminar
        </Button>
        {isAdmin ? (
          <ButtonLink
            to={`/admin/advertisement/${advertisement._id}`}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded focus:outline-none focus:shadow-outline"
          >
            Ver
          </ButtonLink>
        ) : (
          <ButtonLink
            to={`/user/advertisement/${advertisement._id}`}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded focus:outline-none focus:shadow-outline"
          >
            Editar
          </ButtonLink>
        )}
      </div>
    </Card>
  );
}
