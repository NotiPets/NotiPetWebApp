import { useState, useEffect } from "react";
import Modal from "../ui/Modal/Modal";
import Button from "../ui/Button/Button";
import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import classes from "./EmployeeModal.module.css";
import spinner from "../../assets/Images/spinner.gif";

// eslint-disable-next-line no-unused-vars
const EmployeeModal = ({ canEdit, username, onClose, refreshTable }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialEmployeeData, setInitialEmployeeData] = useState({});
  const [editSuccess, setEditSuccess] = useState(null);
  // const [employeeIsActive, setEmployeeIsActive] = useState(false);

  const fillInitialForm = (employee) => {
    setValue("id", employee.id);
    setValue("document", employee.document);
    setValue("names", employee.names);
    setValue("lastnames", employee.lastnames);
    setValue("username", employee.username);
    setValue("role", +employee.role);
    setValue("phone", employee.phone);
    setValue("address1", employee.address1);
    setValue("address2", employee.address2);
    setValue("city", employee.city);
    setValue("province", employee.province);
    setValue("created", new Date(employee.created).toLocaleDateString("es-DO"));
    setValue("updated", new Date(employee.updated).toLocaleDateString("es-DO"));
  };

  const fetchEmployee = async () => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-undef
      const response = await fetch(`${process.env.REACT_APP_NOTIPET_API_URL}/users/${username}`);
      if (response.ok) {
        const { data: employee } = await response.json();
        setInitialEmployeeData(employee);
        fillInitialForm(employee);
      } else {
        throw new Error(
          `Error ${response.status}: Algo salió mal al intentar recuperar los datos del empleado`
        );
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    fetchEmployee();
  }, []);

  const formSubmitHandler = async (data) => {
    // eslint-disable-next-line no-undef
    const endpoint = `${process.env.REACT_APP_NOTIPET_API_URL}/users/userId?userId=${data.id}`;
    const method = "PUT";
    const reqHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
    const reqBody = JSON.stringify({
      ...initialEmployeeData,
      ...data,
      role: +data.role
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
        fetchEmployee();
        refreshTable();
      } else {
        throw new Error(`${response.status}: Algo salió mal al editar el empleado`);
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };
  return (
    <Modal onClick={onClose}>
      <header>
        <h2>{canEdit ? "Editar empleado" : "Detalles del empleado"}</h2>
      </header>
      <main>
        {editSuccess && (
          <p className={classes["success-message"]}>¡Empleado editado exitosamente!</p>
        )}
        {error && <p>{error.message}</p>}
        {isLoading && <img src={spinner} alt="" width="40" height="40" />}
        {!isLoading && (
          <form onSubmit={handleSubmit(formSubmitHandler)} className={classes.form}>
            <Input label="Código" input={{ ...register("id"), disabled: true }} />
            <Input
              label="Documento"
              input={{ ...register("document"), disabled: !canEdit }} // TODO: function to set doc type
            />
            <Input label="Nombres" input={{ ...register("names"), disabled: !canEdit }} />
            <Input label="Apellidos" input={{ ...register("lastnames"), disabled: !canEdit }} />
            <Input label="Nombre de usuario" input={{ ...register("username"), disabled: true }} />
            <label htmlFor="type" className={classes["select-label"]}>
              Rol
            </label>
            <select {...register("role")} className={classes.select} id="role" disabled={!canEdit}>
              <option value="1">Representante de ventas</option>
              <option value="2">Administrador</option>
              <option value="3">Especialista</option>
            </select>
            <Input label="Teléfono" input={{ ...register("phone"), disabled: !canEdit }} />
            <Input label="Dirección 1" input={{ ...register("address1"), disabled: !canEdit }} />
            <Input label="Dirección 2" input={{ ...register("address2"), disabled: !canEdit }} />
            <Input label="Ciudad" input={{ ...register("city"), disabled: !canEdit }} />
            <Input label="Provincia" input={{ ...register("province"), disabled: !canEdit }} />
            <Input
              label="Fecha de creación"
              input={{
                ...register("created"),
                disabled: true
              }}
            />
            <Input
              label="Última actualización"
              input={{
                ...register("updated"),
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

export default EmployeeModal;
