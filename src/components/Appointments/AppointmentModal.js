/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Modal from "../ui/Modal/Modal";
import Button from "../ui/Button/Button";
import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import classes from "./AppointmentModal.module.css";
import spinner from "../../assets/Images/spinner.gif";

// eslint-disable-next-line no-unused-vars
const AppointmentModal = ({ canEdit, appointmentData, onClose, refreshTable }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      appointmentDate: new Date(appointmentData.appointment.date).toISOString().split("T")[0] // converts date into an input-compatible format
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editSuccess, setEditSuccess] = useState(null);
  const [petData, setPetData] = useState({});

  const getPetData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_NOTIPET_API_URL}/pets/bypetid/${appointmentData.petId}`
      );
      const petData = await response.json();
      setPetData(petData);
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPetData(appointmentData.petId);
  }, []);

  useEffect(() => {
    setValue("petName", petData?.data?.name);
    setValue("customerName", `${petData?.data?.user?.names} ${petData?.data?.user?.lastnames}`);
    setValue("customerDoc", petData?.data?.user?.document);
  }, [petData]);

  const fillInitialForm = (appointment) => {
    setValue("id", appointment?.id);
    setValue("customerId", appointment?.userId);
    setValue("petId", appointment?.petId);
    setValue(
      "specialistName",
      appointment?.appointment?.specialist?.user?.names &&
        appointment?.appointment?.specialist?.user?.lastnames
        ? `${appointment?.appointment?.specialist?.user?.names} ${appointment?.appointment?.specialist?.user?.lastnames}` // TODO: refactor this atrocity
        : "No asignado"
    );
    setValue("specialistId", appointment?.appointment?.specialist?.id ?? "No asignado");
    setValue(
      "specialtyName",
      appointment?.appointment?.specialist?.speciality?.name ?? "No asignado"
    );
    setValue("status", appointment?.appointment?.appointmentStatus);
    setValue("urgency", appointment?.appointment?.isEmergency ? "high" : "normal");
    setValue("date", new Date(appointment?.appointment?.date).toLocaleDateString("es-DO"));
    setValue("createdDate", new Date(appointment?.created).toLocaleDateString("es-DO"));
    setValue(
      "updatedDate",
      new Date(appointment?.appointment?.updated).toLocaleDateString("es-DO")
    );
  };
  fillInitialForm(appointmentData);

  const formSubmitHandler = async (data) => {
    // eslint-disable-next-line no-undef
    const endpoint = `${process.env.REACT_APP_NOTIPET_API_URL}/appointments/${appointmentData.appointment.id}`;
    const method = "PUT";
    const reqHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
    const reqBody = JSON.stringify({
      specialistId: data.specialistId,
      isEmergency: data.urgency === "high" ? true : false,
      date: new Date(data.appointmentDate).toISOString(),
      appointmentStatus: +data.status
    });
    setIsLoading(true);
    setEditSuccess(false);
    setError(null);
    try {
      const response = await fetch(endpoint, {
        method: method,
        body: reqBody,
        headers: reqHeaders
      });
      if (response.ok) {
        setEditSuccess(true);
        refreshTable();
      } else {
        throw new Error(`${response.status}: Algo salió mal al editar la cita.`);
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };
  return (
    <Modal onClick={onClose}>
      <header>
        <h2>{canEdit ? "Editar cita" : "Detalles de la cita"}</h2>
      </header>
      <main>
        {editSuccess && <p>Editado exitosamente</p>}
        {error && <p>{error.message}</p>}
        {isLoading && <img src={spinner} alt="" width="40" height="40" />}
        {!isLoading && (
          <form onSubmit={handleSubmit(formSubmitHandler)} className={classes.form}>
            <Input label="Código" input={{ ...register("id"), disabled: true }} />
            <Input
              label="Código del cliente"
              input={{ ...register("customerId"), disabled: true }}
            />
            <Input
              label="Documento del cliente"
              input={{ ...register("customerDoc"), disabled: true }}
            />
            <Input
              label="Nombre del cliente"
              input={{ ...register("customerName"), disabled: true }}
            />
            <Input label="Código de la mascota" input={{ ...register("petId"), disabled: true }} />
            <Input
              label="Nombre de la mascota"
              input={{ ...register("petName"), disabled: true }}
            />
            <Input
              label="Código del especialista"
              input={{ ...register("specialistId"), disabled: true }}
            />
            <Input
              label="Nombre del especialista"
              input={{ ...register("specialistName"), disabled: true }}
            />
            <Input
              label="Nombre de la especialidad"
              input={{ ...register("specialtyName"), disabled: true }}
            />
            <label htmlFor="status" className={classes["select-label"]}>
              Estado de la cita
            </label>
            <select
              {...register("status")}
              className={classes.select}
              id="status"
              disabled={!canEdit}
            >
              <option value="0">Solicitada</option>
              <option value="1">Aceptada</option>
              <option value="2">Cancelada</option>
              <option value="3">Completada</option>
              <option value="4">Negada</option>
            </select>
            <Input
              label="Urgencia alta"
              input={{
                ...register("urgency"),
                disabled: !canEdit,
                type: "radio",
                name: "urgency",
                value: "high"
              }}
            />
            <Input
              label="Urgencia normal"
              input={{
                ...register("urgency"),
                disabled: !canEdit,
                type: "radio",
                name: "urgency",
                value: "normal"
              }}
            />
            <Input
              label="Fecha de la cita"
              input={{ ...register("appointmentDate"), type: "date", disabled: !canEdit }}
            />
            <Input
              label="Creación de la cita"
              input={{
                ...register("createdDate"),
                disabled: true
              }}
            />
            <Input
              label="Última actualización"
              input={{
                ...register("updatedDate"),
                disabled: true
              }}
            />
            <div className={classes.actions}>
              {
                <Button type="button" onClick={onClose} isPrimary={false}>
                  Cerrar
                </Button>
              }
              {canEdit && (
                <Button type="submit" isPrimary isLoading={isLoading} disabled={isLoading}>
                  Editar
                </Button>
              )}
            </div>
          </form>
        )}
      </main>
    </Modal>
  );
};

export default AppointmentModal;
