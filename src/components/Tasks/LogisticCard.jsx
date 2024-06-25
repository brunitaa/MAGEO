import { useAuth } from "../../context/AuthContext";
import { useLogisticRequest } from "../../context/LogisticContext";
import { Button, ButtonLink, Card, ButtonDelete } from "../ui";

export function LogisticCard({ logistic }) {
  const { deleteLogistic } = useLogisticRequest();
  const { isAdmin } = useAuth(); // Obtener el estado de isAdmin del contexto de autenticación

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
      <p className="text-slate-600">Estado: {translateState(logistic.state)}</p>

      <br />
      <div className="flex gap-x-2 items-center">
        {isAdmin ? (
          <ButtonLink to={`/admin/logistic/${logistic._id}`}>Ver</ButtonLink>
        ) : (
          <ButtonLink to={`/user/logistic/${logistic._id}`}>Editar</ButtonLink>
        )}
      </div>
    </Card>
  );
}
