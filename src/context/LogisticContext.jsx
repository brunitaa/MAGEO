import { createContext, useContext, useState } from "react";
import {
  createLogisticRequest,
  deleteLogisticRequest,
  getLogisticRequest,
  getLogisticsRequest,
  getMyLogisticsRequest,
  updateLogisticRequest,
  acceptLogisticsRequest,
  rejectLogisticsRequest,
} from "../api/logistic";

const LogisticContext = createContext();

export const useLogisticRequest = () => {
  const context = useContext(LogisticContext);
  if (!context)
    throw new Error("useLogistics must be used within a TaskProvider");
  return context;
};

export function LogisticProvider({ children }) {
  const [logistics, setLogistics] = useState([]);

  const getLogistics = async () => {
    try {
      // Fetch tasks from the API
      const res = await getLogisticsRequest();

      const fetchedLogistics = res.data.data;
      console.log(res.data.data);

      setLogistics(fetchedLogistics);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };
  const getMyLogistics = async () => {
    try {
      // Fetch tasks from the API
      const res = await getMyLogisticsRequest();

      const fetchedLogistics = res.data.data;
      console.log(res.data.data);

      setLogistics(fetchedLogistics);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const deleteLogistic = async (id) => {
    try {
      const res = await deleteLogisticRequest(id);
      if (res.status === 204)
        setLogistics(logistics.filter((logistic) => logistic._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createLogistic = async (logistic) => {
    try {
      const res = await createLogisticRequest(logistic);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLogistic = async (id) => {
    try {
      const res = await getLogisticRequest(id);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateLogistic = async (id, logistic) => {
    try {
      await updateLogisticRequest(id, logistic);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptLogistic = async (id, logistic) => {
    try {
      await acceptLogisticsRequest(id, logistic);
    } catch (error) {
      console.error(error);
    }
  };

  const rejectLogistic = async (id, logistic) => {
    try {
      await rejectLogisticsRequest(id, logistic);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LogisticContext.Provider
      value={{
        logistics,
        getLogistic,
        deleteLogistic,
        createLogistic,
        getLogistics,
        updateLogistic,
        acceptLogistic,
        rejectLogistic,
        getMyLogistics,
      }}
    >
      {children}
    </LogisticContext.Provider>
  );
}
