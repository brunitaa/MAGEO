import { createContext, useContext, useState } from "react";
import {
  getSpectatorsRequest,
  getMySpectatorAdminRequest,
  createSpectatorRequest,
  updateSpectatorRequest,
  deleteSpectatorRequest,
  getSpectatorRequest,
} from "../api/spectator";

const SpectatorContext = createContext();

export const useSpectatorRequest = () => {
  const context = useContext(SpectatorContext);
  if (!context)
    throw new Error("useSpectator must be used within a TaskProvider");
  return context;
};

export function SpectatorProvider({ children }) {
  const [spectators, setSpectators] = useState([]);

  const getSpectators = async () => {
    try {
      // Fetch from the API
      const res = await getSpectatorsRequest();

      const fetchedSpectators = res.data.data;
      console.log(fetchedSpectators);

      setSpectators(fetchedSpectators);
    } catch (error) {
      console.error("Error fetching spectator:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const getSpectatorsAdmin = async () => {
    try {
      // Fetch from the API
      const res = await getMySpectatorAdminRequest();

      const fetchedSpectators = res.data.data;
      console.log(res.data.data);

      setSpectators(fetchedSpectators);
    } catch (error) {
      console.error("Error fetching spectator:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const deleteSpectator = async (id) => {
    try {
      const res = await deleteSpectatorRequest(id);
      if (res.status === 204)
        setSpectators(spectators.filter((spectator) => spectator._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createSpectator = async (spectator) => {
    try {
      const res = await createSpectatorRequest(spectator);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSpectator = async (id) => {
    try {
      const res = await getSpectatorRequest(id);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateSpectator = async (id, spectator) => {
    try {
      await updateSpectatorRequest(id, spectator);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SpectatorContext.Provider
      value={{
        spectators,
        getSpectator,
        deleteSpectator,
        createSpectator,
        getSpectators,
        updateSpectator,
        getSpectatorsAdmin,
      }}
    >
      {children}
    </SpectatorContext.Provider>
  );
}
