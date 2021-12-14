import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Confirm, Icon, Table } from 'semantic-ui-react';
import { AuthPayload } from '../../../actions/auth';
import { deleteUser } from '../../../actions/users/users';
import { format } from 'date-fns';

interface Props {
  usersData: AuthPayload[];
}

export const UsersTableBody: React.FC<Props> = ({ usersData }) => {
  const [openConfirm, setConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState({ id: 0, name: '' });
  const history = useHistory();
  const dispatch = useDispatch();

  const openDeleteConfirm = (id: number, name: string) => {
    setUserToDelete({ id, name });
    setConfirm(true);
  };

  const handleDelete = (id: number | undefined) => {
    dispatch(deleteUser(id?.toString()!));
  };

  return (
    <Fragment>
      {usersData.map((user: AuthPayload) => (
        <Table.Row key={user._id}>
          <Table.Cell content={user?.cedula} />
          <Table.Cell content={user.email} />
          <Table.Cell content={user?.phone || 'No tiene'} />
          <Table.Cell content={user?.direction || 'No tiene'} />
          <Table.Cell
            content={user.name ? `${user.name} ${user.lastName}` : user.displayName}
          />

          <Table.Cell
            content={
              JSON.parse(user?.isAdmin!) ? (
                <Icon color='green' name='check' />
              ) : (
                <Icon color='red' name='x' />
              )
            }
          />
          <Table.Cell
            content={
              JSON.parse(user?.donation!) ? (
                <Icon color='green' name='check' />
              ) : (
                <Icon color='red' name='x' />
              )
            }
          />

          <Table.Cell collapsing>
            <Icon
              link
              onClick={() => history.push(`/admin/users/${user._id}`)}
              size='large'
              name='edit'
            />
            <Icon
              link
              name='heart'
              size='large'
              onClick={() => history.push(`/wishlist/${user._id}`)}
            />
            <Icon
              link
              onClick={() => openDeleteConfirm(user._id!, user.name! || user.email)}
              size='large'
              color='red'
              name='delete'
            />
          </Table.Cell>
        </Table.Row>
      ))}
      <Confirm
        content={`¿Está seguro que desea eliminar a ${userToDelete.name}?`}
        cancelButton='CANCELAR'
        confirmButton='ELIMINAR'
        size='small'
        open={openConfirm}
        onCancel={() => setConfirm(false)}
        onConfirm={() => handleDelete(userToDelete.id)}
      />
    </Fragment>
  );
};
