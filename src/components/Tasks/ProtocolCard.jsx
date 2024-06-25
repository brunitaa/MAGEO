import { useAuth } from "../../context/AuthContext";
import { useprotocolRequest } from "../../context/ProtocolContext";
import { Button, ButtonLink, Card } from "../ui";

export function ProtocolCard({ protocol }) {
  const { deleteProtocol } = useprotocolRequest();
  const { isAdmin } = useAuth();
  function translateState(state) {
    switch (state) {
      case "Pending":
        return "Pendiente";
      case "Accept":
        return "Aceptado";
      case "Reject":
        return "Rechazado";
      default:
        return state;
    }
  }
  console.log(isAdmin);

  const handleDelete = async () => {
    await deleteProtocol(protocol._id);
    window.location.reload();
    // Llamar a la función para actualizar la lista de anuncios después de borrar
  };
  return (
    <Card>
      <header className="flex justify-between">
        <h2 className="text-xl font-bold">{protocol.event_id.event_name}</h2>
      </header>

      <p className="text-slate-600">Estado:{translateState(protocol.state)}</p>
      <p className="text-slate-600">Observaciones:{protocol.observations}</p>
      <br />
      <div className="flex gap-x-2 items-center">
        <Button onClick={handleDelete}>Delete</Button>
        {isAdmin ? (
          <ButtonLink to={`/admin/protocol/${protocol._id}`}>View</ButtonLink>
        ) : (
          <ButtonLink to={`/user/protocol/${protocol._id}`}>Edit</ButtonLink>
        )}
      </div>
    </Card>
  );
}
