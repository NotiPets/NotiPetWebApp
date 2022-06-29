import { useForm } from "react-hook-form";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import Input from "../components/ui/Input/Input";
import Button from "../components/ui/Button/Button";
import classes from "./HelpPage.module.css";

const HelpPage = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sendSuccess, setSendSuccess] = useState(null);

  const helpHandler = async (data) => {
    const endpoint = `${process.env.REACT_APP_NOTIPET_API_URL}/tickets`;
    const method = "POST";
    const { title, description, phone, name, email } = data;
    const reqHeaders = { "Content-Type": "application/json" };
    const reqBody = JSON.stringify({
      title,
      description,
      phone,
      email,
      name
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
        <h2 className="page-header">Asistencia al usuario</h2>
        {sendSuccess && (
          <>
            <p className={classes["success-message"]}>¡Solicitud de ayuda enviada!</p>
            <p style={{ textAlign: "center" }}>
              Será contactado por el equipo de Notipet en la brevedad.
            </p>
          </>
        )}
        {error && (
          <p>
            Algo salió mal al enviar el formulario. Por favor comunicarse con el equipo de Notipet a
            nuestro <a href="mailto:notipetapp@gmail.com">correo</a>.
          </p>
        )}
        <form onSubmit={handleSubmit(helpHandler)}>
          <Input label="Título" input={{ id: "title", maxLength: 50, ...register("title") }} />
          <Input
            label="Descripción"
            input={{ id: "description", maxLength: 500, ...register("description") }}
          />
          <Input label="Nombre del solicitante" input={{ id: "name", ...register("name") }} />
          <Input label="Email" input={{ id: "email", type: "email", ...register("email") }} />
          <Input label="Teléfono" input={{ id: "phone", type: "tel", ...register("phone") }} />
          <Button type="submit" isLoading={isLoading}>
            Pedir ayuda
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default HelpPage;
