import React, { useEffect, useState } from "react";
import { Input, Label } from "../../components/ui";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import utc from "dayjs/plugin/utc";
import { useLogisticRequest } from "../../context/LogisticContext";
import dayjs from "dayjs";
import SidebarForms from "../../components/SideBarForms";
dayjs.extend(utc);

function LogisticAdmin() {
  const [successMessage, setSuccessMessage] = useState("");
  const params = useParams();
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();
  const [mueblesServicios, setmueblesServicios] = useState([
    {
      ÍtemName: "",
      quantity: 0,
      supplier: "",
      unit: "",
      unit_price: "",
      observations: "",
    },
  ]);
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
  const [materialApoyo, setmaterialApoyo] = useState([
    {
      ÍtemName: "",
      quantity: 0,
      supplier: "",
      unit: "",
      unit_price: "",
      observations: "",
    },
  ]);
  const [foodServices, setFoodServices] = useState([
    {
      ÍtemName: "",
      quantity: 0,
      supplier: "",
      unit: "",
      unit_price: "",
      observations: "",
    },
  ]);
  const [transport, setTransport] = useState([
    {
      ÍtemName: "",
      quantity: 0,
      supplier: "",
      unit: "",
      unit_price: "",
      observations: "",
    },
  ]);

  const {
    createLogistic,
    getLogistic,
    updateLogistic,
    acceptLogistic,
    rejectLogistic,
  } = useLogisticRequest();
  const onAccept = async (data) => {
    try {
      console.log(params.id);
      acceptLogistic(params.id, {
        ...data,
      });
      setSuccessMessage("Aceptado Correctamente");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setTimeout(() => {
        navigate("/admin");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const onReject = async (data) => {
    try {
      console.log(params.id);
      rejectLogistic(params.id, {
        ...data,
      });
      setSuccessMessage("Rechazado Correctamente");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setTimeout(() => {
        navigate("/admin");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRow = () => {
    setÍtemsRequerimientosServicios([
      ...ÍtemsRequerimientosServicios,
      { ÍtemName: "", quantity: 0, observations: "" },
    ]);
  };
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

  const handleAddMateril = () => {
    setmaterialApoyo([
      ...materialApoyo,
      {
        name: "",
        quantity: 0,
        supplier: "",
        unit: "",
        unit_price: "",
        observations: "",
      },
    ]);
  };
  const handleAddTransport = () => {
    setTransport([
      ...transport,
      {
        name: "",
        quantity: 0,
        supplier: "",
        unit: "",
        unit_price: "",
        observations: "",
      },
    ]);
  };

  const handleAddFood = () => {
    setFoodServices([
      ...foodServices,
      {
        name: "",
        quantity: 0,
        supplier: "",
        unit: "",
        unit_price: "",
        observations: "",
      },
    ]);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const handleRemoveRow = (index) => {
    const newÍtems = [...mueblesServicios];
    newÍtems.splice(index, 1);
    setmueblesServicios(newÍtems);
  };
  const handleRemoveTransport = (index) => {
    const newTransport = [...transport];
    newTransport.splice(index, 1);
    setTransport(newTransport);
  };

  const handleRemoveMaterial = (index) => {
    const newMaterial = [...materialApoyo];
    newMaterial.splice(index, 1);
    setmaterialApoyo(newMaterial);
  };
  const handleRemoveFood = (index) => {
    const newFood = [...foodServices];
    newFood.splice(index, 1);
    setFoodServices(newFood);
  };
  const handleRemoveDisertante = (index) => {
    const newDisertantes = [...disertantes];
    newDisertantes.splice(index, 1);
    setDisertantes(newDisertantes);
  };
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

        setTimeout(() => {
          navigate("/admin");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const loadEvent = async () => {
      if (params.id) {
        const logistic = await getLogistic(params.id);
        console.log(logistic);
        setValue("state", logistic.state);

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

  return (
    <div className="flex bg-red-100">
      <SidebarForms></SidebarForms>
      <div style={{ margin: "10px 20px" }}>
        <form style={{ margin: "10px 20px" }} onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-2xl  mb-4">2.1 Mobiliario y Servicios</h3>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "title"
                ? "border-univalleColorOne"
                : "border-gray-300"
            } rounded-lg`}
          >
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">
                    <Label>Ítem</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Cantidad</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Numero de Item</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Proveedor</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Unidad de Medida</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Precio por Unidad</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Observaciones</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Acción</Label>
                  </th>
                </tr>
              </thead>
              <tbody>
                {mueblesServicios.map((mueble, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <select
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="ÍtemName"
                        {...register(`furniture_services[${index}].name`)}
                        readOnly
                      >
                        <option value="">Selecciona un ítem</option>
                        {allMobiliario.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Cantidad"
                        readOnly
                        {...register(`furniture_services[${index}].quantity`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `furniture_services[${index}].quantity`,
                            value
                          );
                        }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        {...register(
                          `furniture_services[${index}].item_number`
                        )}
                        readOnly
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `furniture_services[${index}].item_number`,
                            value
                          );
                        }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        readOnly
                        placeholder="Proveedor"
                        {...register(`furniture_services[${index}].supplier`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        readOnly
                        placeholder="Unidad de Medida"
                        {...register(`furniture_services[${index}].unit`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        readOnly
                        placeholder="Precio por Unidad"
                        {...register(`furniture_services[${index}].unit_price`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `furniture_services[${index}].unit_price`,
                            value
                          );
                        }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        readOnly
                        placeholder="Observaciones"
                        {...register(
                          `furniture_services[${index}].observations`
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        type="button"
                        className="bg-red-800 hover:bg-red-700 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleRemoveRow(index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="bg-red-800 hover:bg-red-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddRow}
            type="button"
            style={{ margin: "10px 20px" }}
          >
            Agregar fila
          </button>
          <h3 className="text-2xl  mb-4">2.2 Material de apoyo</h3>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "title"
                ? "border-univalleColorOne"
                : "border-gray-300"
            } rounded-lg`}
          >
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">
                    <Label>Ítem</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Cantidad</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Numero de Item</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Proveedor</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Unidad de Medida</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Precio por Unidad</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Observaciones</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Acción</Label>
                  </th>
                </tr>
              </thead>
              <tbody>
                {materialApoyo.map((material, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <select
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="ÍtemName"
                        {...register(`support_material[${index}].name`)}
                        readOnly
                      >
                        <option value="">Selecciona un ítem</option>
                        {allMaterial.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        readOnly
                        placeholder="Precio por Unidad"
                        {...register(`support_material[${index}].quantity`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        readOnly
                        placeholder="Precio por Unidad"
                        {...register(`support_material[${index}].item_number`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `support_material[${index}].item_number`,
                            value
                          );
                        }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        placeholder="Proveedor"
                        readOnly
                        {...register(`support_material[${index}].supplier`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        placeholder="Unidad de Medida"
                        readOnly
                        {...register(`support_material[${index}].unit`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        readOnly
                        {...register(`support_material[${index}].unit_price`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `support_material[${index}].unit_price`,
                            value
                          );
                        }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        readOnly
                        placeholder="Observaciones"
                        {...register(`support_material[${index}].observations`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        type="button"
                        className="bg-red-800 hover:bg-red-700 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleRemoveMaterial(index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="bg-red-800 hover:bg-red-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddMateril}
            type="button"
            style={{ margin: "10px 20px" }}
          >
            Agregar fila
          </button>
          <h3 className="text-2xl  mb-4">2.3 Alimentación</h3>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "title"
                ? "border-univalleColorOne"
                : "border-gray-300"
            } rounded-lg`}
          >
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">
                    <Label>Ítem</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Cantidad</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Numero de Item</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Proveedor</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Unidad de Medida</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Precio por Unidad</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Observaciones</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Acción</Label>
                  </th>
                </tr>
              </thead>
              <tbody>
                {foodServices.map((food, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <select
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="ÍtemName"
                        {...register(`food_services[${index}].name`)}
                        readOnly
                      >
                        <option value="">Selecciona un ítem</option>
                        {allFood.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        readOnly
                        placeholder="Precio por Unidad"
                        {...register(`food_services[${index}].quantity`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        readOnly
                        {...register(`food_services[${index}].item_number`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `food_services[${index}].item_number`,
                            value
                          );
                        }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        readOnly
                        placeholder="Proveedor"
                        {...register(`food_services[${index}].supplier`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        placeholder="Unidad de Medida"
                        readOnly
                        {...register(`food_services[${index}].unit`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        readOnly
                        {...register(`food_services[${index}].unit_price`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(`food_services[${index}].unit_price`, value);
                        }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        readOnly
                        placeholder="Observaciones"
                        {...register(`food_services[${index}].observations`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        type="button"
                        className="bg-red-800 hover:bg-red-700 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleRemoveFood(index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="bg-red-800 hover:bg-red-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddFood}
            type="button"
            style={{ margin: "10px 20px" }}
          >
            Agregar fila
          </button>
          <h3 className="text-2xl  mb-4">2.4 Disertantes</h3>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "title"
                ? "border-univalleColorOne"
                : "border-gray-300"
            } rounded-lg`}
          >
            <table className="table-auto w-full">
              <tbody>
                {disertantes.map((disertante, index) => (
                  <React.Fragment key={index}>
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        <div
                          className={`mb-2 p-4 border bg-white ${
                            focusedInput === "title"
                              ? "border-univalleColorOne"
                              : "border-gray-300"
                          } rounded-lg`}
                        >
                          <Label className="block text-gray-700 text-sm  mb-2">
                            Nombre del disertante
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            readOnly
                            name="nombre"
                            {...register(`speakers[${index}].name`)}
                            placeholder="Nombre del disertante"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">
                        <div
                          className={`mb-2 p-4 border bg-white ${
                            focusedInput === "title"
                              ? "border-univalleColorOne"
                              : "border-gray-300"
                          } rounded-lg`}
                        >
                          <Label className="block text-gray-700 text-sm  mb-2">
                            Día de llegada
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="datetime-local"
                            name="diaLlegada"
                            readOnly
                            {...register(
                              `speakers[${index}].arrival_date_and_time`
                            )}
                            placeholder="Día de llegada"
                          />
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        <div
                          className={`mb-2 p-4 border bg-white ${
                            focusedInput === "title"
                              ? "border-univalleColorOne"
                              : "border-gray-300"
                          } rounded-lg`}
                        >
                          <Label className="block text-gray-700 text-sm  mb-2">
                            Día de retorno
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="datetime-local"
                            name="diaRetorno"
                            readOnly
                            {...register(
                              `speakers[${index}].return_date_and_time`
                            )}
                            placeholder="Día de retorno"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">
                        <div>Alojamiento</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">
                        <div
                          className={`mb-2 p-4 border bg-white ${
                            focusedInput === "title"
                              ? "border-univalleColorOne"
                              : "border-gray-300"
                          } rounded-lg`}
                        >
                          <Label className="block text-gray-700 text-sm  mb-2">
                            Nombre
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            readOnly
                            name="alojamiento"
                            {...register(
                              `speakers[${index}].accommodation.name`
                            )}
                            placeholder="Alojamiento"
                          />
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        <div
                          className={`mb-2 p-4 border bg-white ${
                            focusedInput === "title"
                              ? "border-univalleColorOne"
                              : "border-gray-300"
                          } rounded-lg`}
                        >
                          <Label className="block text-gray-700 text-sm  mb-2">
                            Dirección
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="alojamiento"
                            readOnly
                            {...register(
                              `speakers[${index}].accommodation.address`
                            )}
                            placeholder="Dirección"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="border px-4 py-2">
                        <div
                          className={`mb-2 p-4 border bg-white ${
                            focusedInput === "title"
                              ? "border-univalleColorOne"
                              : "border-gray-300"
                          } rounded-lg`}
                        >
                          <Label className="block text-gray-700 text-sm  mb-2">
                            Email
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="alojamiento"
                            readOnly
                            placeholder="Email"
                            {...register(
                              `speakers[${index}].accommodation.email`
                            )}
                          />
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        <div
                          className={`mb-2 p-4 border bg-white ${
                            focusedInput === "title"
                              ? "border-univalleColorOne"
                              : "border-gray-300"
                          } rounded-lg`}
                        >
                          <Label className="block text-gray-700 text-sm  mb-2">
                            Telefono
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="alojamiento"
                            readOnly
                            placeholder="Telefono"
                            {...register(
                              `speakers[${index}].accommodation.phone`
                            )}
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div>Responsable de Recojo y Retorno</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">
                        <div
                          className={`mb-2 p-4 border bg-white ${
                            focusedInput === "title"
                              ? "border-univalleColorOne"
                              : "border-gray-300"
                          } rounded-lg`}
                        >
                          <Label className="block text-gray-700 text-sm  mb-2">
                            Nombre
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="responsable"
                            placeholder="Nombre"
                            readOnly
                            {...register(
                              `speakers[${index}].responsible_person.first_name`
                            )}
                          />
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        <div
                          className={`mb-2 p-4 border bg-white ${
                            focusedInput === "title"
                              ? "border-univalleColorOne"
                              : "border-gray-300"
                          } rounded-lg`}
                        >
                          <Label className="block text-gray-700 text-sm  mb-2">
                            Apellido
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="responsable"
                            readOnly
                            placeholder="Apellido"
                            {...register(
                              `speakers[${index}].responsible_person.last_name`
                            )}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">
                        <div
                          className={`mb-2 p-4 border bg-white ${
                            focusedInput === "title"
                              ? "border-univalleColorOne"
                              : "border-gray-300"
                          } rounded-lg`}
                        >
                          <Label className="block text-gray-700 text-sm  mb-2">
                            Email
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="alojamiento"
                            readOnly
                            placeholder="Email"
                            {...register(
                              `speakers[${index}].responsible_person.email`
                            )}
                          />
                        </div>
                      </td>
                      <td className="border px-4 py-2">
                        <div
                          className={`mb-2 p-4 border bg-white ${
                            focusedInput === "title"
                              ? "border-univalleColorOne"
                              : "border-gray-300"
                          } rounded-lg`}
                        >
                          <Label className="block text-gray-700 text-sm  mb-2">
                            Telefono
                          </Label>
                          <Input
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="alojamiento"
                            readOnly
                            placeholder="Telefono"
                            {...register(
                              `speakers[${index}].responsible_person.phone`
                            )}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-red-800 hover:bg-red-700 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleRemoveDisertante(index)}
                          type="button"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="bg-red-800 hover:bg-red-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddDisertante}
            type="button"
            style={{ margin: "10px 20px" }}
          >
            Agregar Disertante
          </button>
          <h3 className="text-2xl  mb-4">2.5 Transporte</h3>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "title"
                ? "border-univalleColorOne"
                : "border-gray-300"
            } rounded-lg`}
          >
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">
                    <Label>Ítem</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Cantidad</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Numero de Item</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Proveedor</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Unidad de Medida</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Precio por Unidad</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Observaciones</Label>
                  </th>
                  <th className="px-4 py-2">
                    <Label>Acción</Label>
                  </th>
                </tr>
              </thead>
              <tbody>
                {mueblesServicios.map((mueble, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="ÍtemName"
                        {...register(`transport_services[${index}].name`)}
                        readOnly
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        readOnly
                        placeholder="Precio por Unidad"
                        {...register(`transport_services[${index}].quantity`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        placeholder="Precio por Unidad"
                        readOnly
                        {...register(
                          `transport_services[${index}].item_number`
                        )}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `transport_services[${index}].item_number`,
                            value
                          );
                        }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        readOnly
                        placeholder="Proveedor"
                        {...register(`transport_services[${index}].supplier`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        readOnly
                        placeholder="Unidad de Medida"
                        {...register(`transport_services[${index}].unit`)}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unit_price"
                        readOnly
                        placeholder="Precio por Unidad"
                        {...register(`transport_services[${index}].unit_price`)}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setValue(
                            `transport_services[${index}].unit_price`,
                            value
                          );
                        }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="observations"
                        readOnly
                        placeholder="Observaciones"
                        {...register(
                          `transport_services[${index}].observations`
                        )}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        type="button"
                        className="bg-red-800 hover:bg-red-700 text-white  py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleRemoveTransport(index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="bg-red-800 hover:bg-red-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddTransport}
            type="button"
            style={{ margin: "10px 20px" }}
          >
            Agregar fila
          </button>
          <br></br>
          <br></br>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "title"
                ? "border-univalleColorOne"
                : "border-gray-300"
            } rounded-lg`}
          >
            <Label
              className="block text-gray-700 text-sm  mb-2"
              htmlFor="event_name"
            >
              Estado
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              name="state"
              type="text"
              placeholder="aqui estara el estado"
              autoFocus
              readOnly
              {...register(`state`)}
            />
          </div>
          <div
            className={`mb-2 p-4 border bg-white ${
              focusedInput === "title"
                ? "border-univalleColorOne"
                : "border-gray-300"
            } rounded-lg`}
          >
            <Label className="block text-gray-700 text-sm  mb-2">
              Observaciones
            </Label>
            <Input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="links_to_visual_material"
              type="text"
              placeholder={"observations"}
              {...register(`observations`)}
            />
          </div>
          <button
            type="button"
            onClick={() => onAccept()}
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => onReject()}
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
          >
            Denegar
          </button>
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
            className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogisticAdmin;
