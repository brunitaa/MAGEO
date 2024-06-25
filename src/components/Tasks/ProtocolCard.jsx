import React from "react";
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

  const handleDelete = async () => {
    try {
      await deleteProtocol(protocol._id);
      window.location.reload(); // Refresh the page after deletion (consider a better solution to avoid full page reload)
    } catch (error) {
      console.log("Error deleting protocol:", error);
    }
  };

  // Debugging to check values
  console.log("Protocol:", protocol);
  console.log("isAdmin:", isAdmin);

  // Null checks before accessing nested properties
  const eventName =
    protocol?.event_id?.event_name || "Event Name Not Available";

  return (
    <Card>
      <header className="flex justify-between">
        <h2 className="text-xl font-bold">{eventName}</h2>
      </header>

      <p className="text-slate-600">Estado: {translateState(protocol.state)}</p>

      <br />
      <div className="flex gap-x-2 items-center">
        {isAdmin ? (
          <ButtonLink to={`/admin/protocol/${protocol._id}`}>Ver</ButtonLink>
        ) : (
          <ButtonLink to={`/user/protocol/${protocol._id}`}>Editar</ButtonLink>
        )}
      </div>
    </Card>
  );
}
