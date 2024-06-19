import { createContext, useContext, useState } from "react";
import {
  createProtocolRequest,
  deleteProtocolRequest,
  getProtocolRequest,
  getProtocolsRequest,
  updateProtocolRequest,
  acceptProtocolsRequest,
  rejectProtocolsRequest,
  getMyProtocolsRequest,
} from "../api/protocol";

const ProtocolContext = createContext();

export const useprotocolRequest = () => {
  const context = useContext(ProtocolContext);
  if (!context)
    throw new Error("useprotocols must be used within a TaskProvider");
  return context;
};

export function ProtocolProvider({ children }) {
  const [protocols, setProtocols] = useState([]);

  const getProtocols = async () => {
    try {
      // Fetch tasks from the API
      const res = await getProtocolsRequest();

      const fetchedprotocols = res.data.data;
      console.log(res.data.data);

      setProtocols(fetchedprotocols);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const getMyProtocols = async () => {
    try {
      // Fetch tasks from the API
      const res = await getMyProtocolsRequest();

      const fetchedprotocols = res.data.data;
      console.log(res.data.data);

      setProtocols(fetchedprotocols);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const deleteProtocol = async (id) => {
    try {
      const res = await deleteProtocolRequest(id);
      if (res.status === 204)
        setProtocols(protocols.filter((protocol) => protocol._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createProtocol = async (data) => {
    try {
      const newProtocol = await createProtocolRequest(data);
      setProtocols([...protocols, newProtocol]);
      return newProtocol;
    } catch (error) {
      console.error("Error creating advertisement:", error);
      throw error;
    }
  };

  const getProtocol = async (id) => {
    try {
      const res = await getProtocolRequest(id);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProtocol = async (id, protocol) => {
    try {
      await updateProtocolRequest(id, protocol);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptProtocol = async (id, protocol) => {
    try {
      await acceptProtocolsRequest(id, protocol);
    } catch (error) {
      console.error(error);
    }
  };

  const rejectProtocol = async (id, protocol) => {
    try {
      await rejectProtocolsRequest(id, protocol);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProtocolContext.Provider
      value={{
        protocols,
        getProtocol,
        deleteProtocol,
        createProtocol,
        getProtocols,
        updateProtocol,
        acceptProtocol,
        rejectProtocol,
        getMyProtocols,
      }}
    >
      {children}
    </ProtocolContext.Provider>
  );
}
