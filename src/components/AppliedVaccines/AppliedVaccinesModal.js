import Modal from "../ui/Modal/Modal";

import Button from "../ui/Button/Button";
import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import classes from "./AppliedVaccinesModal.module.css";

// eslint-disable-next-line no-unused-vars
const AppliedVaccineModal = ({ canEdit, onClose, appliedVaccine }) => {
  const { register, setValue } = useForm();

  const fillInitialForm = (appliedVaccine) => {
    setValue("id", appliedVaccine?.id);
    setValue("date", new Date(appliedVaccine?.date).toLocaleDateString("es-DO"));
    setValue("vaccineId", appliedVaccine?.vaccineId);
    setValue("vaccineName", appliedVaccine?.vaccine?.vaccineName);
    setValue("petName", appliedVaccine?.pet?.name);
    setValue("petBirthdate", new Date(appliedVaccine?.pet?.birthdate).toLocaleDateString("es-DO"));
    setValue("employeeId", appliedVaccine?.user?.id);
    setValue("employeeName", appliedVaccine?.user?.names + " " + appliedVaccine?.user?.lastnames);
    setValue("employeeMail", appliedVaccine?.user?.email);
    setValue("employeePhone", appliedVaccine?.user?.phone);
  };

  fillInitialForm(appliedVaccine);

  const downloadCertificateHandler = async () => {
    try {
      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_NOTIPET_API_URL}/digitalvaccine/pdf/${appliedVaccine.id}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${appliedVaccine.pet.name}-${appliedVaccine.vaccine.vaccineName}-Cert.pdf`
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        throw new Error(
          `Error ${response.status}: Algo salió mal al intentar descargar el certificado de vacunación.`
        );
      }
    } catch (error) {
      // setError({ message: error.message });
    }
  };

  return (
    <Modal onClick={onClose}>
      <header>
        <h2>Detalles de la vacuna aplicada</h2>
      </header>
      <main>
        <form className={classes.form}>
          <Button type="button" onClick={downloadCertificateHandler} className={classes.download}>
            Descargar certificado
          </Button>
          <Input label="Código" input={{ ...register("id"), disabled: true }} />
          <Input label="Fecha de aplicación" input={{ ...register("date"), disabled: true }} />
          <Input label="Id de la vacuna" input={{ ...register("vaccineId"), disabled: true }} />
          <Input
            label="Nombre de la vacuna"
            input={{ ...register("vaccineName"), disabled: true }}
          />
          <Input label="Nombre de la mascota" input={{ ...register("petName"), disabled: true }} />
          <Input
            label="Fecha de nacimiento de la mascota"
            input={{ ...register("petBirthdate"), disabled: true }}
          />
          <Input label="Id del empleado" input={{ ...register("employeeId"), disabled: true }} />
          <Input
            label="Nombre del empleado"
            input={{ ...register("employeeName"), disabled: true }}
          />
          <Input
            label="Correo del empleado"
            input={{ ...register("employeeMail"), disabled: true }}
          />
          <Input
            label="No. telefónico del empleado"
            input={{ ...register("employeePhone"), disabled: true }}
          />
          <div className={classes.actions}>
            {
              <Button type="button" onClick={onClose} isPrimary={false}>
                Cerrar
              </Button>
            }
          </div>
        </form>
      </main>
    </Modal>
  );
};

export default AppliedVaccineModal;
