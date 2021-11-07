import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Confirm, Icon, Table } from 'semantic-ui-react';
import { deletePet, updateFollowUpDate } from '../../../actions/pets/pets';
import { PetsData } from '../../../actions/pets/petsInterfaces';
import { toTitleCase } from '../../../util/upperCase';
import { format } from 'date-fns';
interface Props {
  petsData: PetsData[];
}

export const PetsAdoptedTableBody: React.FC<Props> = ({ petsData }) => {
  const [openConfirm, setConfirm] = useState(false);
  const [petToDelete, setPetToDelete] = useState({ id: '', name: '' });
  const history = useHistory();
  const dispatch = useDispatch();

  const openDeleteConfirm = (id: string, name: string) => {
    setPetToDelete({ id, name });
    setConfirm(true);
  };

  const handleDelete = (id: string | null) => {
    dispatch(deletePet(id));
  };

  const options: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <Fragment>
      {petsData.map((pet: PetsData) => (
        <Fragment>
          <Table.Row key={pet._id}>
            <Table.Cell content={toTitleCase(pet.name)} />
            <Table.Cell content={pet.location} />
            <Table.Cell
              content={
                !!pet.adopteeId.name
                  ? `${pet?.adopteeId?.name} ${pet?.adopteeId?.lastName}/${
                      pet?.adopteeId?.phone || pet?.adopteeId?.email
                    }`
                  : `${pet.adopteeId.displayName}/${
                      pet?.adopteeId?.phone || pet?.adopteeId?.email
                    }`
              }
            />
            <Table.Cell
              content={new Date(pet.adoptionDate!).toLocaleDateString('es-US', options)}
            />
            <Table.Cell
              content={new Date(pet.followUpDate!).toLocaleDateString('es-US', options)}
            />
            <Table.Cell collapsing>
              <Icon
                link
                onClick={() => dispatch(updateFollowUpDate(pet._id!))}
                size='large'
                name='calendar check outline'
              />
              <Icon
                link
                onClick={() => openDeleteConfirm(pet._id!, pet.name)}
                size='large'
                color='red'
                name='delete'
              />
            </Table.Cell>
          </Table.Row>
        </Fragment>
      ))}
      <Confirm
        content={`Esta seguro que desea eliminar a ${petToDelete.name}?`}
        cancelButton='CANCELAR'
        confirmButton='ELIMINAR'
        size='small'
        open={openConfirm}
        onCancel={() => setConfirm(false)}
        onConfirm={() => handleDelete(petToDelete.id)}
      />
    </Fragment>
  );
};
