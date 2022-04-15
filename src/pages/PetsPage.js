import React, { useEffect, useMemo, useState } from "react";
import Table from "../components/Table/Table";
import Layout from "../components/Layout/Layout";
import RowOptions from "../components/Table/RowOptions";
import spinner from "../assets/Images/spinner.gif";
import PetModal from "../components/Pets/PetModal";

const Pets = () => {
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "number"
      },
      {
        Header: "Código",
        accessor: "id"
      },
      {
        Header: "Nombre",
        accessor: "name"
      },
      {
        Header: "Fecha registro",
        accessor: "date"
      },
      {
        Header: "Tamaño",
        accessor: "size"
      },
      {
        Header: "Tipo",
        accessor: "type"
      },
      {
        Header: "Nombre del dueño",
        accessor: "ownerName"
      },
      {
        Header: "Opciones",
        accessor: "options"
      }
    ],
    []
  );

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditPet, setShowEditPet] = useState(false);
  const [showPetDetails, setShowPetDetails] = useState(false);
  const [currentPet, setCurrentPet] = useState({});

  const editPetHandler = (pet) => {
    setCurrentPet(pet);
    setShowEditPet(true);
  };

  const viewPetDetailsHandler = (pet) => {
    setCurrentPet(pet);
    setShowPetDetails(true);
  };

  const closeModalHandler = () => {
    setShowPetDetails(false);
    setShowEditPet(false);
  };

  const mapPetsData = (petsData) => {
    return petsData.map((pet, index) => {
      let petSize;
      switch (pet.size) {
        case 0:
          petSize = "Pequeño";
          break;
        case 1:
          petSize = "Mediano";
          break;
        case 2:
          petSize = "Grande";
          break;
        default:
          petSize = "Desconocido";
          break;
      }
      let petType;
      switch (pet.petType) {
        case 0:
          petType = "Perro";
          break;
        case 1:
          petType = "Gato";
          break;
        case 2:
          petType = "Conejo";
          break;
        case 3:
          petType = "Otro";
          break;
        default:
          petType = "Desconocido";
          break;
      }
      return {
        number: index + 1,
        id: pet.id,
        name: pet.name,
        date: new Date(pet.created).toLocaleDateString("es-DO"),
        size: petSize,
        type: petType,
        ownerName: `${pet?.user?.names ?? ""} ${pet?.user?.lastnames ?? ""}`,
        options: (
          <>
            <RowOptions
              onEdit={() => editPetHandler(pet)}
              onViewDetails={() => viewPetDetailsHandler(pet)}
            />
          </>
        )
      };
    });
  };

  const fetchPets = async () => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-undef
      const response = await fetch(`${process.env.REACT_APP_NOTIPET_API_URL}/pets`);
      if (response.ok) {
        const jsonResponse = await response.json();
        const pets = mapPetsData(jsonResponse);
        setTableData(pets);
      } else {
        throw new Error(
          `Error ${response.status}: Algo salió mal al intentar recuperar las mascotas`
        );
      }
    } catch (error) {
      setError({ message: error.message });
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    fetchPets();
  }, []);

  return (
    <Layout>
      <div>
        <h2 className="page-header">Mascotas</h2>
        {error && <p>{error.message}</p>}
        {isLoading && <img src={spinner} alt="" width="40" height="40" />}
        {tableData.length === 0 && !isLoading && <p>No se encontraron mascotas</p>}
        {!error && tableData.length > 0 && (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <Table columns={columns} data={tableData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showEditPet && (
        <PetModal
          canEdit
          petData={currentPet}
          onClose={closeModalHandler}
          refreshTable={fetchPets}
        />
      )}
      {showPetDetails && (
        <PetModal canEdit={false} petData={currentPet} onClose={closeModalHandler} />
      )}
    </Layout>
  );
};

export default Pets;
