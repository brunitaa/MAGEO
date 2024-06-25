import React, { useEffect, useState } from "react";
import { Label } from "../components/ui";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useLogisticRequest } from "../context/LogisticContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import SidebarForms from "../components/SideBarForms";
dayjs.extend(utc);
import "animate.css";
import { Input } from "../components/ui";
import { useEventRequest } from "../context/EventsContext";
import MobiliarioServicio from "./Logistic/MobiliariaServicio/MobiliarioServicio";
import MobiliarioServicioOtros from "./Logistic/MobiliariaServicio/MobiliariServicioOtros";
import MaterialApoyo from "./Logistic/MobiliariaServicio/Material de Apoyo/MaterialApoyo";
import MaterialApoyoOtros from "./Logistic/MobiliariaServicio/Material de Apoyo/MaterialApoyoOtros";
import Alimentacion from "./Logistic/MobiliariaServicio/Alimentacion/Alimentacion";
import AlimentacionOtros from "./Logistic/MobiliariaServicio/Alimentacion/AlimentacionOtros";
import Transporte from "./Logistic/MobiliariaServicio/Transporte/Transporte";

function Logistic() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [disertantes, setDisertantes] = useState([
    {
      name: "",
      arrival_date_and_time: "",
      return_date_and_time: "",
      accommodation: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      responsible_person: {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
      },
    },
  ]);
  const handleAddDisertante = () => {
    setDisertantes([
      ...disertantes,
      {
        name: "",
        arrival_date_and_time: "",
        return_date_and_time: "",
        accommodation: {
          name: "",
          address: "",
          email: "",
          phone: "",
        },
        responsible_person: {
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
        },
      },
    ]);
  };
  const handleRemoveDisertante = (index) => {
    const newDisertantes = [...disertantes];
    newDisertantes.splice(index, 1);
    setDisertantes(newDisertantes);
  };
  const [successMessage, setSuccessMessage] = useState("");
  const handleBlur = () => setFocusedInput(null);
  const { events, getMyEvents } = useEventRequest();
  const params = useParams();
  const [focusedInput, setFocusedInput] = useState(null);
  const handleFocus = (field) => setFocusedInput(field);
  const navigate = useNavigate();
  const {
    fields: furnitureFields,
    append: appendFurniture,
    remove: removeFurniture,
  } = useFieldArray({
    control,
    name: "furniture_services",
  });

  const {
    fields: materialFields,
    append: appendMaterial,
    remove: removeMaterial,
  } = useFieldArray({
    control,
    name: "support_material",
  });

  const {
    fields: foodFields,
    append: appendFood,
    remove: removeFood,
  } = useFieldArray({
    control,
    name: "food_services",
  });

  const {
    fields: transportFields,
    append: appendTransport,
    remove: removeTransport,
  } = useFieldArray({
    control,
    name: "transport_services",
  });

  const {
    createLogistic,
    getLogistic,
    updateLogistic,
    acceptLogistic,
    rejectLogistic,
  } = useLogisticRequest();

  const allFood = [
    "NesCafé PZA",
    "Tés CAJA",
    "Trimates CAJA",
    "Agua en bidón BIDON",
    "Galletas de agua PZA",
  ];
  const allMobiliario = [
    "Mesas cuadradas de madera",
    "Sillas metálicas",
    "Data y Sonido",
    "Micrófonos",
    "Atril",
    "Puntero",
    "Red Wifi",
    "Punto de Red para retransmisiones",
    "Soporte Técnico",
    "Transporte",
    "Punto registro",
    "Puntos de corriente",
  ];
  const allMaterial = [
    "Folder amarillo tamaño oficio ",
    "Folder amarillo tamaño carta",
    "Hojas bond carta",
    "Hojas bond Oficio",
    "Lapicero azul",
    "Folders sectorizado logo univalle",
    "Certificados",
  ];
  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (params.id) {
        console.log(params.id);
        updateLogistic(params.id, {
          ...data,
        });
      } else {
        console.log(data);
        createLogistic({
          ...data,
        });
        setSuccessMessage("Creado Correctamente");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const state = "Pending";
  useEffect(() => {
    const loadEvent = async () => {
      if (params.id) {
        const logistic = await getLogistic(params.id);
        console.log(logistic);
        setValue("state", state);
        const firstEvent = logistic.event_id ? logistic.event_id._id : "";
        setValue("event_id", firstEvent);

        if (
          logistic.furniture_services &&
          Array.isArray(logistic.furniture_services)
        ) {
          logistic.furniture_services.forEach((furniture, index) => {
            setValue(
              `furniture_services[${index}].item_number`,
              furniture.item_number
            );
            setValue(
              `furniture_services[${index}].supplier`,
              furniture.supplier
            );
            setValue(`furniture_services[${index}].name`, furniture.name);
            setValue(
              `furniture_services[${index}].quantity`,
              furniture.quantity
            );
            setValue(`furniture_services[${index}].unit`, furniture.unit);
            setValue(
              `furniture_services[${index}].unit_price`,
              furniture.unit_price
            );
            setValue(
              `furniture_services[${index}].observations`,
              furniture.observations
            );
          });
        }
        if (
          logistic.transport_services &&
          Array.isArray(logistic.transport_services)
        ) {
          logistic.transport_services.forEach((transport, index) => {
            setValue(
              `transport_services[${index}].item_number`,
              transport.item_number
            );
            setValue(
              `transport_services[${index}].supplier`,
              transport.supplier
            );
            setValue(`transport_services[${index}].name`, transport.name);
            setValue(
              `transport_services[${index}].quantity`,
              transport.quantity
            );
            setValue(`transport_services[${index}].unit`, transport.unit);
            setValue(
              `transport_services[${index}].unit_price`,
              transport.unit_price
            );
            setValue(
              `transport_services[${index}].observations`,
              transport.observations
            );
          });
        }
        if (logistic.food_services && Array.isArray(logistic.food_services)) {
          logistic.food_services.forEach((food, index) => {
            setValue(`food_services[${index}].item_number`, food.item_number);
            setValue(`food_services[${index}].supplier`, food.supplier);
            setValue(`food_services[${index}].name`, food.name);
            setValue(`food_services[${index}].quantity`, food.quantity);
            setValue(`food_services[${index}].unit`, food.unit);
            setValue(`food_services[${index}].unit_price`, food.unit_price);
            setValue(`food_services[${index}].observations`, food.observations);
          });
        }
        if (
          logistic.support_material &&
          Array.isArray(logistic.support_material)
        ) {
          logistic.support_material.forEach((support, index) => {
            setValue(
              `support_material[${index}].item_number`,
              support.item_number
            );
            setValue(`support_material[${index}].supplier`, support.supplier);
            setValue(`support_material[${index}].name`, support.name);
            setValue(`support_material[${index}].quantity`, support.quantity);
            setValue(`support_material[${index}].unit`, support.unit);
            setValue(
              `support_material[${index}].unit_price`,
              support.unit_price
            );
            setValue(
              `support_material[${index}].observations`,
              support.observations
            );
          });
        }
        if (logistic.speakers && Array.isArray(logistic.speakers)) {
          logistic.speakers.forEach((speaker, index) => {
            setValue(`speakers[${index}].name`, speaker.name);

            // Asigna la fecha de llegada y formatea correctamente
            setValue(
              `speakers[${index}].arrival_date_and_time`,
              speaker.arrival_date_and_time
                ? dayjs(speaker.arrival_date_and_time)
                    .utc()
                    .format("YYYY-MM-DDTHH:mm")
                : "" // Asegúrate de manejar correctamente los casos en los que no hay fecha
            );

            // Asigna la fecha de retorno
            setValue(
              `speakers[${index}].return_date_and_time`,
              speaker.return_date_and_time
                ? dayjs(speaker.return_date_and_time)
                    .utc()
                    .format("YYYY-MM-DDTHH:mm")
                : "" // Asegúrate de manejar correctamente los casos en los que no hay fecha
            );

            const responsible_person = speaker.responsible_person;
            if (responsible_person) {
              console.log("HHH");
              setValue(
                `speakers[${index}].responsible_person.first_name`,
                responsible_person.first_name
              );
              setValue(
                `speakers[${index}].responsible_person.phone`,
                responsible_person.phone
              );
              setValue(
                `speakers[${index}].responsible_person.email`,
                responsible_person.email
              );
              setValue(
                `speakers[${index}].responsible_person.last_name`,
                responsible_person.last_name
              );
            }

            const accommodation = speaker.accommodation;
            if (accommodation) {
              console.log("HHH");
              setValue(
                `speakers[${index}].accommodation.address`,
                accommodation.address
              );
              setValue(
                `speakers[${index}].accommodation.phone`,
                accommodation.phone
              );
              setValue(
                `speakers[${index}].accommodation.email`,
                accommodation.email
              );
              setValue(
                `speakers[${index}].accommodation.name`,
                accommodation.name
              );
            }
          });
        }
      }
    };
    loadEvent();
  }, []);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="flex bg-red-100">
      <SidebarForms sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-grow p-10  transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <form style={{ margin: "10px 20px" }} onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white p-4 mb-4 border-t-8 border-univalleColorOne rounded-lg">
            <h1 className="text-3xl mb-2">Formulario de Logística</h1>
            <p className="text-gray-600">
              Por favor, completa la siguiente información para crear o editar
              la Logística del evento.
            </p>
            <Link to="/precios">
              <button className="bg-univalleColorOne hover:bg-univalleColorOne text-white font-bold py-2 px-4 rounded mt-4">
                Precios Preferenciales
              </button>
            </Link>
          </div>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "event" ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          >
            <Label>
              Elija el evento al que le pertenece:
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  focusedInput === "event"
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...register("event_id", { required: true })}
                onFocus={() => handleFocus("event_id")}
                onBlur={handleBlur}
              >
                <option value="">Selecciona el evento</option>
                {events.map((event, index) => (
                  <option key={index} value={event._id}>
                    {event.event_name}
                  </option>
                ))}
              </select>
              {errors.spectators && (
                <span className="text-red-500">Este campo es requerido</span>
              )}
            </Label>
          </div>
          {/* Componente para Mobiliario y Servicios */}
          <MobiliarioServicio
            furnitureFields={furnitureFields}
            allMobiliario={allMobiliario} // Asegúrate de definir 'allMobiliario' adecuadamente
            appendFurniture={appendFurniture}
            removeFurniture={removeFurniture}
            control={control}
            register={register}
            setValue={setValue}
          />

          {/* Componente para Mobiliario y Servicios Otros 
          <MobiliarioServicioOtros
            furnitureFieldsOthers={furnitureFieldsOthers}
            appendFurnitureOthers={appendFurnitureOthers}
            removeFurnitureOthers={removeFurnitureOthers}
            control={control}
            register={register}
            setValue={setValue}
          />*/}
          {/* 2.2 Material de apoyo */}
          <MaterialApoyo
            materialFields={materialFields}
            allMaterial={allMaterial}
            appendMaterial={appendMaterial}
            removeMaterial={removeMaterial}
            control={control}
            register={register}
            setValue={setValue}
          />
          {/*<MaterialApoyoOtros
            materialFieldsOthers={materialFieldsOthers}
            appendMaterialOthers={appendMaterialOthers}
            removeMaterialOthers={removeMaterialOthers}
            control={control}
            register={register}
            setValue={setValue}
          />*/}

          {/* 2.3 Alimentación */}
          <Alimentacion
            foodFields={foodFields}
            allFood={allFood}
            appendFood={appendFood}
            removeFood={removeFood}
            control={control}
            register={register}
            setValue={setValue}
          />
          {/*} <AlimentacionOtros
            foodFieldsOthers={foodFieldsOthers}
            appendFoodOthers={appendFoodOthers}
            removeFoodOthers={removeFoodOthers}
            control={control}
            register={register}
            setValue={setValue}
          />*/}
          {/*Disertane*/}
          <div className="mb-4 p-4 border bg-white rounded-lg shadow-md">
            <h3 className="text-2xl mb-4">2.4 Disertantes</h3>

            {disertantes.map((disertante, index) => (
              <div
                key={index}
                className="mb-4 p-4 border bg-white rounded-lg shadow-md"
              >
                <div className="mb-4">
                  <Label className="block text-gray-700 text-sm mb-2">
                    Nombre del disertante
                  </Label>
                  <Input
                    className="input-field"
                    type="text"
                    name={`speakers[${index}].name`}
                    {...register(`speakers[${index}].name`)}
                    placeholder="Nombre del disertante"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-gray-700 text-sm mb-2">
                      Día de llegada
                    </Label>
                    <Input
                      className="input-field"
                      type="datetime-local"
                      name={`speakers[${index}].arrival_date_and_time`}
                      {...register(`speakers[${index}].arrival_date_and_time`)}
                      placeholder="Día de llegada"
                    />
                  </div>
                  <div>
                    <Label className="block text-gray-700 text-sm mb-2">
                      Día de retorno
                    </Label>
                    <Input
                      className="input-field"
                      type="datetime-local"
                      name={`speakers[${index}].return_date_and_time`}
                      {...register(`speakers[${index}].return_date_and_time`)}
                      placeholder="Día de retorno"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="block text-gray-700 text-sm mb-2">
                    Alojamiento
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        className="input-field"
                        type="text"
                        name={`speakers[${index}].accommodation.name`}
                        {...register(`speakers[${index}].accommodation.name`)}
                        placeholder="Nombre del alojamiento"
                      />
                    </div>
                    <div>
                      <Input
                        className="input-field"
                        type="text"
                        name={`speakers[${index}].accommodation.address`}
                        {...register(
                          `speakers[${index}].accommodation.address`
                        )}
                        placeholder="Dirección del alojamiento"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Input
                        className="input-field"
                        type="text"
                        name={`speakers[${index}].accommodation.email`}
                        {...register(`speakers[${index}].accommodation.email`)}
                        placeholder="Email del alojamiento"
                      />
                    </div>
                    <div>
                      <Input
                        className="input-field"
                        type="text"
                        name={`speakers[${index}].accommodation.phone`}
                        {...register(`speakers[${index}].accommodation.phone`)}
                        placeholder="Teléfono del alojamiento"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="block text-gray-700 text-sm mb-2">
                    Responsable de Recojo y Retorno
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        className="input-field"
                        type="text"
                        name={`speakers[${index}].responsible_person.first_name`}
                        {...register(
                          `speakers[${index}].responsible_person.first_name`
                        )}
                        placeholder="Nombre del responsable"
                      />
                    </div>
                    <div>
                      <Input
                        className="input-field"
                        type="text"
                        name={`speakers[${index}].responsible_person.last_name`}
                        {...register(
                          `speakers[${index}].responsible_person.last_name`
                        )}
                        placeholder="Apellido del responsable"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Input
                        className="input-field"
                        type="text"
                        name={`speakers[${index}].responsible_person.email`}
                        {...register(
                          `speakers[${index}].responsible_person.email`
                        )}
                        placeholder="Email del responsable"
                      />
                    </div>
                    <div>
                      <Input
                        className="input-field"
                        type="text"
                        name={`speakers[${index}].responsible_person.phone`}
                        {...register(
                          `speakers[${index}].responsible_person.phone`
                        )}
                        placeholder="Teléfono del responsable"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-univalleColorOne hover:bg-univalleColorTwo text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleRemoveDisertante(index)}
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            className="bg-univalleColorOne  hover:bg-univalleColorTwo  text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddDisertante}
            type="button"
            style={{ margin: "10px 20px" }}
          >
            Agregar Disertante
          </button>

          {/* 2.4 Transporte */}
          <Transporte
            transportFields={transportFields}
            appendTransport={appendTransport}
            removeTransport={removeTransport}
            control={control}
            register={register}
            setValue={setValue}
          />
          {successMessage && (
            <div
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              {successMessage}
            </div>
          )}
          <button
            type="submit"
            className="bg-univalleColorOne hover:bg-univalleColorOne  text-white  py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Logistic;
