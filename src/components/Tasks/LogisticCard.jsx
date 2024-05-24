import { useAuth } from "../../context/AuthContext";
import { useLogisticRequest } from "../../context/LogisticContext";
import { useprotocolRequest } from "../../context/ProtocolContext";
import { Button, ButtonLink, Card } from "../ui";

export function LogisticCard({ logistic, isAdmin }) {
  const { deleteLogistic } = useLogisticRequest();
  console.log(isAdmin);
  const handleDelete = async () => {
    await deleteLogistic(logistic._id);
    window.location.reload();
    // Llamar a la función para actualizar la lista de anuncios después de borrar
  };
  return (
    <Card>
      <header className="flex justify-between">
        <h2 className="text-xl font-bold">{logistic.state}</h2>
      </header>

      <p className="text-slate-600">Estado:{logistic.state}</p>
      <p className="text-slate-600">Observaciones:{logistic.observations}</p>
      <br />
      <div className="flex gap-x-2 items-center">
        <Button onClick={handleDelete}>Delete</Button>
        {isAdmin ? (
          <ButtonLink to={`/admin/logistic/${logistic._id}`}>Edit</ButtonLink>
        ) : (
          <ButtonLink to={`/user/logistic/${logistic._id}`}>View</ButtonLink>
        )}
      </div>
    </Card>
  );
}
