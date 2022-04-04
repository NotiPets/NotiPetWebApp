import { useState, useEffect } from "react";
import Modal from "../ui/Modal/Modal";
import Button from "../ui/Button/Button";
import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import classes from "./CustomerModal.module.css";
import spinner from "../../assets/Images/spinner.gif";

// eslint-disable-next-line no-unused-vars
const CustomerModal = ({ canEdit, username, onClose }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialClientData, setInitialClientData] = useState({});
  const [editSuccess, setEditSuccess] = useState(null);
  // const [clientIsActive, setClientIsActive] = useState(false);

  const fillInitialForm = (client) => {
    setValue("id", client.id);
    setValue("document", client.document);
    setValue("names", client.names);
    setValue("lastnames", client.lastnames);
    setValue("phone", client.phone);
    setValue("address1", client.address1);
    setValue("address2", client.address2);
    setValue("city", client.city);
    setValue("province", client.province);
    setValue("created", new Date(client.created).toLocaleDateString("es-DO"));
    setValue("updated", new Date(client.updated).toLocaleDateString("es-DO"));
    // setClientIsActive(client.active);
  };

  const fetchClient = async () => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-undef
      const response = await fetch(`${process.env.REACT_APP_NOTIPET_API_URL}/users/${username}`);
      if (response.ok) {
        const { data: client } = await response.json();
        setInitialClientData(client);
        fillInitialForm(client);
      } else {
        throw new Error(
          `Error ${response.status}: Algo salió mal al intentar recuperar los datos del cliente`
        );
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    fetchClient();
  }, []);

  // const isActiveRadioChangeHandler = () => {
  //   setClientIsActive((prev) => {
  //     return !prev;
  //   });
  // };

  const formSubmitHandler = async (data) => {
    // eslint-disable-next-line no-undef
    const endpoint = `${process.env.REACT_APP_NOTIPET_API_URL}/users/${data.id}`;
    const method = "PUT";
    const reqHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
    console.log(initialClientData);
    const reqBody = JSON.stringify({
      ...initialClientData,
      ...data,
      created: initialClientData.created,
      updated: new Date().toISOString()
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
        fetchClient();
      } else {
        throw new Error(`${response.status}: Algo salió mal al editar el cliente`);
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };
  return (
    <Modal onClick={onClose}>
      <header>
        <h2>{canEdit ? "Editar cliente" : "Detalles del cliente"}</h2>
      </header>
      <main>
        {editSuccess && <p>Editado exitosamente</p>}
        {error && <p>{error.message}</p>}
        {isLoading && <img src={spinner} alt="" width="40" height="40" />}
        {!isLoading && (
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <Input label="Código" input={{ ...register("id"), disabled: true }} />
            <Input
              label="Documento"
              input={{ ...register("document"), disabled: !canEdit }} // TODO: function to set doc type
            />
            <Input label="Nombres" input={{ ...register("names"), disabled: !canEdit }} />
            <Input label="Apellidos" input={{ ...register("lastnames"), disabled: !canEdit }} />
            <Input label="Teléfono" input={{ ...register("phone"), disabled: !canEdit }} />
            <Input label="Dirección 1" input={{ ...register("address1"), disabled: !canEdit }} />
            <Input label="Dirección 2" input={{ ...register("address2"), disabled: !canEdit }} />
            <Input label="Ciudad" input={{ ...register("city"), disabled: !canEdit }} />
            <Input label="Provincia" input={{ ...register("province"), disabled: !canEdit }} />
            {/* <Input
              label="Habilitado"
              input={{
                ...register("active"),
                type: "radio",
                checked: clientIsActive,
                disabled: !canEdit,
                onClick: isActiveRadioChangeHandler
              }}
            /> */}
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

export default CustomerModal;
