import { createContext, useContext, useState } from "react";
import {
  getMyUserInformationRequest,
  updateMyUserInformationRequest,
} from "../api/user";

const UserContext = createContext();

export const useUserRequest = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserRequest must be used within a UserProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getMyUserInfo = async () => {
    try {
      const res = await getMyUserInformationRequest();
      const fetchedUser = res.data.data;
      console.log("Fetched user info:", fetchedUser);
      setUsers([fetchedUser]); // Assuming you want to store current user info in users state
    } catch (error) {
      console.error("Error fetching current user info:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const updateUserInfo = async (id, updatedUserData) => {
    try {
      const res = await updateMyUserInformationRequest(updatedUserData);
      console.log("Updated user info:", res.data);
      // Optionally, update local state or perform other actions after successful update
    } catch (error) {
      console.error("Error updating user info:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getMyUserInfo,
        updateUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
