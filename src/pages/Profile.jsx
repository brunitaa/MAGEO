import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Input, Label } from "../components/ui";
import { useUserRequest } from "../context/UserContext";
import { useForm } from "react-hook-form";
import "animate.css";
import "tailwindcss/tailwind.css";
dayjs.extend(utc);

const ProfilePage = () => {
  const { users, getMyUserInfo, updateUserInfo } = useUserRequest();
  const [focusedInput, setFocusedInput] = useState(null);
  const handleFocus = (field) => setFocusedInput(field);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch, // Import watch from react-hook-form
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchUserInformation(); // Load user information on component mount
  }, []);

  const fetchUserInformation = async () => {
    try {
      await getMyUserInfo(); // Fetch current user information
      setEditing(false); // Disable editing initially
    } catch (error) {
      console.error("Error fetching user information:", error);
      // Handle error as needed
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateUserInfo(users[0].id, data); // Update user information
      setSuccessMessage("Cambios guardados exitosamente");
      setTimeout(() => setSuccessMessage(""), 3000);
      setEditing(false); // Exit edit mode after successful update
    } catch (error) {
      console.error("Error updating user information:", error);
      setErrorMessage(error.message || "Error updating user information");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleEditClick = () => {
    setEditing(true); // Enable editing mode
  };

  const handlePasswordChangeSubmit = async (data) => {
    try {
      // Aquí solo enviamos la nueva contraseña para actualizar
      await updateUserInfo(users[0].id, {
        password: data.new_password,
      });
      setSuccessMessage("Contraseña cambiada exitosamente");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage(error.message || "Error changing password");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex bg-red-100">
      <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-grow p-10 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white p-4 mb-4 border-t-8 border-red-500 rounded-lg">
              <h1 className="text-3xl mb-2">Perfil de Usuario</h1>
              <p className="text-gray-600">
                Completa la siguiente información para actualizar tu perfil.
              </p>
            </div>
            <div className="mb-4">
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Username:
                  <Input
                    type="text"
                    defaultValue={users.length > 0 ? users[0].username : ""}
                    readOnly
                  />
                </Label>
              </div>
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Nombre:
                  <Input
                    type="text"
                    {...register("first_name")}
                    defaultValue={users.length > 0 ? users[0].first_name : ""}
                    disabled={!editing}
                  />
                  {errors.first_name && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
              </div>
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Apellido:
                  <Input
                    type="text"
                    {...register("last_name")}
                    defaultValue={users.length > 0 ? users[0].last_name : ""}
                    disabled={!editing}
                  />
                  {errors.last_name && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
              </div>
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Email:
                  <Input
                    type="email"
                    defaultValue={users.length > 0 ? users[0].email : ""}
                    readOnly={!editing} // Make read-only if not editing
                  />
                </Label>
              </div>
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Teléfono:
                  <Input
                    type="text"
                    {...register("phone")}
                    defaultValue={users.length > 0 ? users[0].phone : ""}
                    disabled={!editing}
                  />
                  {errors.phone && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
              </div>
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Fecha de Nacimiento:
                  <Input
                    type="date"
                    {...register("date_of_birth")}
                    defaultValue={
                      users.length > 0 ? users[0].date_of_birth : ""
                    }
                    disabled={!editing}
                  />
                  {errors.date_of_birth && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
              </div>
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Género:
                  <Input
                    type="text"
                    {...register("gender")}
                    defaultValue={users.length > 0 ? users[0].gender : ""}
                    disabled={!editing}
                  />
                  {errors.gender && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
              </div>
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Campus:
                  <Input
                    type="text"
                    {...register("campus")}
                    defaultValue={users.length > 0 ? users[0].campus : ""}
                    disabled={!editing}
                  />
                  {errors.campus && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
              </div>
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Departamento:
                  <Input
                    type="text"
                    {...register("department")}
                    defaultValue={users.length > 0 ? users[0].department : ""}
                    disabled={!editing}
                  />
                  {errors.department && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
              </div>
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Posición:
                  <Input
                    type="text"
                    {...register("position")}
                    defaultValue={users.length > 0 ? users[0].position : ""}
                    disabled={!editing}
                  />
                  {errors.position && (
                    <span className="text-red-500">
                      Este campo es requerido
                    </span>
                  )}
                </Label>
              </div>
            </div>
            {!editing && (
              <Button type="button" onClick={handleEditClick}>
                Editar
              </Button>
            )}
            {editing && (
              <div className="flex">
                <Button type="submit">Guardar</Button>
                <Button
                  type="button"
                  className="ml-2"
                  onClick={() => setEditing(false)}
                >
                  Cancelar
                </Button>
              </div>
            )}
            {successMessage && (
              <div className="bg-green-500 text-white p-2 mt-2 rounded animate__animated animate__fadeIn">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-500 text-white p-2 mt-2 rounded animate__animated animate__fadeIn">
                {errorMessage}
              </div>
            )}
          </form>

          {/* Formulario para cambiar contraseña */}
          <form onSubmit={handleSubmit(handlePasswordChangeSubmit)}>
            <div className="bg-white p-4 mt-4 border-t-8 border-red-500 rounded-lg">
              <h1 className="text-3xl mb-2">Cambiar Contraseña</h1>
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Nueva Contraseña:
                  <Input
                    type="password"
                    {...register("new_password", {
                      required: "Este campo es requerido",
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                    })}
                    className="border p-2 rounded-md w-full"
                  />
                  {errors.new_password && (
                    <span className="text-red-500">
                      {errors.new_password.message}
                    </span>
                  )}
                </Label>
              </div>
              <div className="mb-2 p-4 border bg-white rounded-lg">
                <Label>
                  Confirmar Nueva Contraseña:
                  <Input
                    type="password"
                    {...register("confirm_password", {
                      validate: (value) =>
                        value === watch("new_password") ||
                        "Las contraseñas no coinciden",
                    })}
                    className="border p-2 rounded-md w-full"
                  />
                  {errors.confirm_password && (
                    <span className="text-red-500">
                      {errors.confirm_password.message}
                    </span>
                  )}
                </Label>
              </div>
              <Button type="submit">Guardar Contraseña</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
