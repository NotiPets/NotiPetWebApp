import { useState } from "react";
import Input from "../ui/Input/Input";
import Modal from "../ui/Modal/Modal";
import Button from "../ui/Button/Button";
import { useForm } from "react-hook-form";
import classes from "./ProductModal.module.css";
import spinner from "../../assets/Images/spinner.gif";

// eslint-disable-next-line no-unused-vars
const ProductModal = ({ canEdit, onClose, productData, refreshProducts }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editSuccess, setEditSuccess] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const fillInitialForm = (product) => {
    setValue("id", product.id);
    setValue("name", product.name);
    setValue("description", product.description);
    setValue("price", product.price);
    setValue("category", product.category);
    setValue("created", new Date(product.created).toLocaleDateString("es-DO"));
    setValue("updated", new Date(product.updated).toLocaleDateString("es-DO"));
  };

  fillInitialForm(productData);

  const formSubmitHandler = async (data) => {
    // eslint-disable-next-line no-undef
    const endpoint = `${process.env.REACT_APP_NOTIPET_API_URL}/assetsservices/${data.id}`;
    const method = "PUT";
    const reqHeaders = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
    const reqBody = JSON.stringify({
      ...productData,
      ...data,
      name: data.name,
      price: +data.price,
      category: data.category,
      created: productData.created,
      updated: productData.updated,
      description: data.description,
      business: productData.business,
      pictureUrl: productData.pictureUrl,
      assetsServiceType: +data.assetsServiceType
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
        refreshProducts();
      } else {
        throw new Error(`${response.status}: Algo salió mal al editar el producto.`);
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  return (
    <Modal onClick={onClose}>
      <header>
        <h2>{canEdit ? "Editar producto" : "Detalles del producto"}</h2>
      </header>
      <main>
        {editSuccess && (
          <p className={classes["success-message"]}>¡Producto editado exitosamente!</p>
        )}
        {error && <p>{error.message}</p>}
        {isLoading && <img src={spinner} alt="" width="40" height="40" />}
        {!isLoading && (
          <form onSubmit={handleSubmit(formSubmitHandler)} className={classes.form}>
            <Input label="Id" input={{ ...register("id"), disabled: true }} />
            <Input label="Nombre" input={{ ...register("name"), disabled: !canEdit }} />
            <Input label="Descripción" input={{ ...register("description"), disabled: !canEdit }} />
            <label className={classes["select-label"]}>Tipo</label>
            <select
              {...register("assetsServiceType")}
              className={classes.select}
              id="assetsServiceType"
              disabled={!canEdit}
            >
              <option value="0">Producto</option>
              <option value="1">Servicio</option>
            </select>
            <Input label="Categoría" input={{ ...register("category"), disabled: !canEdit }} />
            <Input label="Precio" input={{ ...register("price"), disabled: !canEdit }} />
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

export default ProductModal;
