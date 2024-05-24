import { useSpectatorRequest } from "../../context/SpectatorContext";
import { Button, ButtonLink, Card } from "../ui";

export function SpectatorCard({ spectator, isAdmin }) {
  const { deleteSpectator } = useSpectatorRequest();
  console.log(isAdmin);
  const handleDelete = async () => {
    await deleteSpectator(spectator._id);
    window.location.reload();
    // Llamar a la función para actualizar la lista de anuncios después de borrar
  };
  return (
    <Card>
      <header className="flex justify-between">
        <h2 className="text-xl font-bold">{spectator.title}</h2>
      </header>
      <p className="text-slate-600">Valor: {spectator.value}</p>
      <br />
      <div className="flex gap-x-2 items-center">
        <Button onClick={handleDelete}>Delete</Button>

        <ButtonLink to={`/spectator/${spectator._id}`}>Edit</ButtonLink>
      </div>
    </Card>
  );
}
