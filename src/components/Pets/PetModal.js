import { useState } from "react";
import Modal from "../ui/Modal/Modal";
import Button from "../ui/Button/Button";
import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import classes from "./PetModal.module.css";
import spinner from "../../assets/Images/spinner.gif";

// eslint-disable-next-line no-unused-vars
const PetModal = ({ canEdit, onClose, petData, refreshTable }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      birthdate: new Date(petData.birthdate).toISOString().split("T")[0] // converts date into an input-compatible format
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editSuccess, setEditSuccess] = useState(null);

  const fillInitialForm = (pet) => {
    setValue("id", pet.id);
    setValue("name", pet.name);
    setValue("type", pet.petType.toString());
    setValue("gender", pet.gender.toString());
    setValue("description", pet.description);
    setValue("size", pet.size.toString());
    setValue("vaccinated", pet.vaccinated);
    setValue("castrated", pet.castrated);
    setValue("hasTracker", pet.hasTracker);
    setValue("created", new Date(pet.created).toLocaleDateString("es-DO"));
    setValue("updated", new Date(pet.updated).toLocaleDateString("es-DO"));
    setValue("owner", `${pet?.user?.names ?? ""} ${pet?.user?.lastnames ?? ""}`);
    setValue("document", `${pet?.user?.document ?? ""}`);
    setValue("active", pet.active);
  };

  fillInitialForm(petData);

  const formSubmitHandler = async (data) => {
    // eslint-disable-next-line no-undef
    const endpoint = `${process.env.REACT_APP_NOTIPET_API_URL}/pets/${data.id}`;
    const method = "PUT";
    const reqHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
    const reqBody = JSON.stringify({
      ...petData, // initial
      ...data, // new
      size: +data.size,
      gender: data.gender === "true" ? true : false,
      type: +data.type,
      created: petData.created,
      updated: petData.updated,
      birthdate: new Date(data.birthdate).toISOString(),
      user: null
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
        throw new Error(`${response.status}: Algo salió mal al editar la mascota`);
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };
  return (
    <Modal onClick={onClose}>
      <header>
        <h2>{canEdit ? "Editar mascota" : "Detalles de la mascota"}</h2>
      </header>
      <main>
        {editSuccess && (
          <p className={classes["success-message"]}>¡Mascota editada exitosamente!</p>
        )}
        {error && <p>{error.message}</p>}
        {isLoading && <img src={spinner} alt="" width="40" height="40" />}
        {!isLoading && (
          <form onSubmit={handleSubmit(formSubmitHandler)} className={classes.form}>
            <Input label="Código" input={{ ...register("id"), disabled: true }} />
            <Input label="Nombre" input={{ ...register("name"), disabled: !canEdit }} />
            <label htmlFor="type" className={classes["select-label"]}>
              Tipo de mascota
            </label>
            <select {...register("type")} className={classes.select} id="type" disabled={!canEdit}>
              <option value="1">Gato</option>
              <option value="0">Perro</option>
              <option value="2">Conejo</option>
              <option value="3">Otro</option>
            </select>
            <Input label="Description" input={{ ...register("description"), disabled: !canEdit }} />
            <Input
              label="Macho"
              input={{
                ...register("gender"),
                disabled: !canEdit,
                type: "radio",
                name: "gender",
                value: "true"
              }}
            />
            <Input
              label="Hembra"
              input={{
                ...register("gender"),
                disabled: !canEdit,
                type: "radio",
                name: "gender",
                value: "false"
              }}
            />
            <label htmlFor="size" className={classes["select-label"]}>
              Tamaño
            </label>
            <select {...register("size")} className={classes.select} id="size" disabled={!canEdit}>
              <option value="0">Pequeño</option>
              <option value="1">Mediano</option>
              <option value="2">Grande</option>
            </select>
            <Input
              label="Tiene vacunas"
              input={{ ...register("vaccinated"), type: "checkbox", disabled: !canEdit }}
            />
            <Input
              label="Está castrado"
              input={{ ...register("castrated"), type: "checkbox", disabled: !canEdit }}
            />
            <Input
              label="Tiene rastreador"
              input={{ ...register("hasTracker"), type: "checkbox", disabled: !canEdit }}
            />
            <Input
              label="Fecha de nacimiento"
              input={{ ...register("birthdate"), type: "date", disabled: !canEdit }}
            />
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
            <Input label="Nombre del dueño" input={{ ...register("owner"), disabled: true }} />
            <Input
              label="Documento del dueño"
              input={{ ...register("document"), disabled: true }}
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

export default PetModal;
