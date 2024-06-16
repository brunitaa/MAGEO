import { useAdvertisingRequest } from "../../context/AdvertisementContext";
import { useAuth } from "../../context/AuthContext";
import { Button, ButtonLink, Card } from "../ui";

export function AdvertisementCard({ advertisement }) {
  const { deleteAdvertisement } = useAdvertisingRequest();
  const { isAdmin } = useAuth(); // Obtener el estado de isAdmin del contexto de autenticación

  const handleDelete = async () => {
    try {
      await deleteAdvertisement(advertisement._id);
      window.location.reload();
    } catch (error) {
      console.log("Error deleting advertisement:", error);
    }
  };

  return (
    <Card>
      <header className="flex justify-between">
        <h2 className="text-xl font-bold">{advertisement.title}</h2>
      </header>
      <p className="text-slate-600">{advertisement.description}</p>
      <p className="text-slate-600">
        Observaciones: {advertisement.observations}
      </p>
      <p className="text-slate-600">Estado: {advertisement.state}</p>
      <br />
      <div className="flex gap-x-2 items-center">
        <Button onClick={handleDelete}>Delete</Button>
        {isAdmin ? (
          <ButtonLink to={`/admin/advertisement/${advertisement._id}`}>
            View
          </ButtonLink>
        ) : (
          <ButtonLink to={`/user/advertisement/${advertisement._id}`}>
            Edit
          </ButtonLink>
        )}
      </div>
    </Card>
  );
}
