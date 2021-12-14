import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Confirm, Icon, Table } from 'semantic-ui-react';
import { deletePet } from '../../../actions/pets/pets';
import { PetsData } from '../../../actions/pets/petsInterfaces';
import { toTitleCase } from '../../../util/upperCase';
interface Props {
  petsData: PetsData[];
}

export const PetsTableBody: React.FC<Props> = ({ petsData }) => {
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

  return (
    <Fragment>
      {petsData.map((pet: PetsData) => (
        <Fragment>
          <Table.Row key={pet._id}>
            <Table.Cell content={toTitleCase(pet.name)} />
            <Table.Cell content={pet.location} />
            <Table.Cell content={pet.breed} />
            <Table.Cell
              content={
                JSON.parse(pet.adopted) ? (
                  <Icon color='green' name='check' />
                ) : (
                  <Icon color='red' name='x' />
                )
              }
            />
            <Table.Cell
              content={
                pet?.photosUrl ? (
                  pet.photosUrl!.length > 0 ? (
                    <Icon color='green' name='check' />
                  ) : (
                    <Icon color='red' name='x' />
                  )
                ) : (
                  <Icon color='red' name='x' />
                )
              }
            />
            <Table.Cell content={pet?.description.substring(0, 20) + '...'} />
            <Table.Cell collapsing>
              <Icon
                link
                onClick={() => history.push(`/admin/pets/${pet._id as any}`)}
                size='large'
                name='edit'
              />
              <Icon
                link
                onClick={() => openDeleteConfirm(pet._id! as any, pet.name)}
                size='large'
                color='red'
                name='delete'
              />
            </Table.Cell>
          </Table.Row>
        </Fragment>
      ))}
      <Confirm
        content={`¿Está seguro que desea eliminar a ${petToDelete.name}?`}
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
