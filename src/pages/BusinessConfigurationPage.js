import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import BusinessContext from "../store/business-context";
import Layout from "../components/Layout/Layout";
import Input from "../components/ui/Input/Input";
import Button from "../components/ui/Button/Button";
import classes from "./HelpPage.module.css";
import UserContext from "../store/user-context";

const BusinessConfigurationPage = () => {
  const businessContext = useContext(BusinessContext);
  const userContext = useContext(UserContext);

  const openingDate = new Date(businessContext.openingTime);
  const closingDate = new Date(businessContext.closingTime);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: businessContext.id,
      businessName: businessContext.businessName,
      rnc: businessContext.rnc,
      phone: businessContext.phone,
      email: businessContext.email,
      address1: businessContext.address1,
      address2: businessContext.address2,
      city: businessContext.city,
      province: businessContext.province,
      latitude: businessContext.latitude,
      longitude: businessContext.longitude,
      comment: businessContext.comment,
      openingTime:
        ("0" + openingDate.getHours()).slice(-2) + ":" + ("0" + openingDate.getMinutes()).slice(-2),
      closingTime:
        ("0" + closingDate.getHours()).slice(-2) + ":" + ("0" + closingDate.getMinutes()).slice(-2)
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sendSuccess, setSendSuccess] = useState(null);

  const convertHoursAndMinutesStringToDate = (hoursAndMinutes) => {
    const timeArray = hoursAndMinutes.split(":");
    const date = new Date();
    date.setHours(+timeArray[0]);
    date.setMinutes(+timeArray[1]);
    date.setSeconds(0);
    return date;
  };
  const fetchBusinessInfo = async () => {
    try {
      const response = await fetch(
        // eslint-disable-next-line no-undef
        `${process.env.REACT_APP_NOTIPET_API_URL}/businesses/${userContext.businessId}`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        const business = jsonResponse.data;
        businessContext.setBusiness(business);
        return;
      }
      throw new Error();
    } catch (error) {
      businessContext.setBusiness({ ...businessContext, businessName: "Notipet" });
    }
  };
  const submitChangesHandler = async (data) => {
    const endpoint = `${process.env.REACT_APP_NOTIPET_API_URL}/businesses/${businessContext.id}`;
    const method = "PUT";
    const {
      id,
      businessName,
      rnc,
      phone,
      email,
      address1,
      address2,
      city,
      province,
      latitude,
      longitude,
      openingTime,
      closingTime
    } = data;
    const reqHeaders = { "Content-Type": "application/json" };
    const reqBody = JSON.stringify({
      id,
      businessName,
      rnc,
      phone,
      email,
      address1,
      address2,
      city,
      province,
      latitude: +latitude,
      longitude: +longitude,
      comment: businessContext.comment,
      openingTime: convertHoursAndMinutesStringToDate(openingTime).toISOString(),
      closingTime: convertHoursAndMinutesStringToDate(closingTime).toISOString(),
      pictureUrl: businessContext.pictureUrl
    });
    setIsLoading(true);
    setSendSuccess(false);
    try {
      const response = await fetch(endpoint, {
        method: method,
        body: reqBody,
        headers: reqHeaders
      });
      if (response.ok) {
        await fetchBusinessInfo();
        setSendSuccess(true);
        setError(null);
      } else {
        throw new Error(`${response.status}: Algo salió mal al enviar al formulario`);
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };
  return (
    <Layout>
      <div>
        <h2 className="page-header">Ajustes del negocio</h2>
        {sendSuccess && (
          <>
            <p className={classes["success-message"]}>¡Datos editados correctamente!</p>
          </>
        )}
        {error && <p>Algo salió mal al enviar el formulario.</p>}
        {userContext.role !== 2 && (
          <p>
            Para editar los datos del negocio debe poseer permisos de administrador. Por favor
            comunicarse con el equipo de Notipet a nuestro
            <a href="mailto:notipetapp@gmail.com"> correo</a>.
          </p>
        )}
        {userContext.role === 2 && (
          <form onSubmit={handleSubmit(submitChangesHandler)}>
            <Input label="Id" input={{ ...register("id"), disabled: true }} />
            <Input
              label="Nombre del negocio"
              input={{ type: "text", ...register("businessName"), maxLength: 50 }}
            />
            <Input label="RNC" input={{ type: "text", ...register("rnc"), maxLength: 20 }} />
            <Input label="Teléfono" input={{ type: "tel", ...register("phone") }} />
            <Input label="Email" input={{ type: "email", ...register("email") }} />
            <Input
              label="Dirección 1"
              input={{ type: "text", ...register("address1"), maxLength: 100 }}
            />
            <Input
              label="Dirección 2"
              input={{ type: "text", ...register("address2"), maxLength: 100 }}
            />
            <Input label="Ciudad" input={{ type: "text", ...register("city"), maxLength: 25 }} />
            <Input
              label="Provincia"
              input={{ type: "text", ...register("province"), maxLength: 25 }}
            />
            <Input
              label="Latitud"
              input={{ type: "number", step: "any", ...register("latitude") }}
            />
            <Input
              label="Longitud"
              input={{ type: "number", step: "any", ...register("longitude") }}
            />
            <Input label="Hora de apertura" input={{ ...register("openingTime"), type: "time" }} />
            <Input label="Hora de cierre" input={{ ...register("closingTime"), type: "time" }} />
            <Button type="submit" isLoading={isLoading}>
              Editar
            </Button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default BusinessConfigurationPage;
