import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input, Button, Table, Pagination } from 'semantic-ui-react';
import {
  fetchAdoptedPets,
  fetchPetByName,
  updatePageNumber,
} from '../../../actions/pets/pets';
import { PetsData } from '../../../actions/pets/petsInterfaces';
import { StoreState } from '../../../reducers';
import { ErrorComponent } from '../../common/Error';
import { LoaderComponent } from '../../common/Loader';
import { PetsAdoptedTableBody } from './PetsAdoptedTableBody';

interface PetListAdoptedProps {}

export const PetListAdopted: React.FC<PetListAdoptedProps> = ({}) => {
  const dispatch = useDispatch();
  const { petsData, page, totalPages } = useSelector((state: StoreState) => state.pets);
  const { loading, error } = useSelector((state: StoreState) => state.loading);
  const [filter, setFilter] = useState('');
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAdoptedPets(page));
  }, [dispatch, page]);

  if (error) {
    return <ErrorComponent />;
  }

  if (loading || (!petsData && !error)) {
    return <LoaderComponent />;
  }

  const buscarMascota = () => {
    let pet = petsData.filter(
      (pet: PetsData) => pet.name.toLowerCase() === filter.toLowerCase()
    );

    if (!pet || pet.length === 0) {
      return petsData;
    }

    return pet;
  };

  return (
    <Fragment>
      <Input
        type='text'
        placeholder='Buscar Mascota'
        onChange={(e) => setFilter(e.target.value)}
      />
      <Button onClick={() => dispatch(fetchPetByName(page, filter, 'adopted'))}>
        BUSCAR
      </Button>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>NOMBRE</Table.HeaderCell>
            <Table.HeaderCell>UBICACIÓN</Table.HeaderCell>
            <Table.HeaderCell>ADOPTANTE</Table.HeaderCell>
            <Table.HeaderCell>FECHA ADOPCIÓN</Table.HeaderCell>
            <Table.HeaderCell>FECHA SEGUIMIENTO</Table.HeaderCell>
            <Table.HeaderCell>ACCIÓN</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <PetsAdoptedTableBody petsData={petsData} />
        </Table.Body>

        <Table.Footer>
          <Pagination
            activePage={page + 1}
            totalPages={totalPages}
            onPageChange={(event, data) => {
              dispatch(updatePageNumber((data.activePage as number) - 1));
            }}
          />
        </Table.Footer>
      </Table>
    </Fragment>
  );
};
