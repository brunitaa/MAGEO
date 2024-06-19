import { useAuth } from "../../context/AuthContext";
import { useLogisticRequest } from "../../context/LogisticContext";
import { Button, ButtonLink, Card } from "../ui";

export function LogisticCard({ logistic }) {
  const { deleteLogistic } = useLogisticRequest();
  const { isAdmin } = useAuth(); // Obtener el estado de isAdmin del contexto de autenticación

  const handleDelete = async () => {
    try {
      await deleteLogistic(logistic._id);
      window.location.reload();
    } catch (error) {
      console.log("Error deleting logistic:", error);
    }
  };

  return (
    <Card>
      <header className="flex justify-between">
        <h2 className="text-xl font-bold">{logistic.event_id.event_name}</h2>
      </header>
      <p className="text-slate-600">Estado: {logistic.state}</p>
      <p className="text-slate-600">Observaciones: {logistic.observations}</p>
      <br />
      <div className="flex gap-x-2 items-center">
        <Button onClick={handleDelete}>Delete</Button>
        {isAdmin ? (
          <ButtonLink to={`/admin/logistic/${logistic._id}`}>View</ButtonLink>
        ) : (
          <ButtonLink to={`/user/logistic/${logistic._id}`}>Edit</ButtonLink>
        )}
      </div>
    </Card>
  );
}
