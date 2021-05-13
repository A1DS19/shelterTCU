import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Input, Pagination, Table } from 'semantic-ui-react';
import { AuthPayload } from '../../../actions/auth';
import { updatePageNumber } from '../../../actions/pets/pets';
import { fetchUserByCedula, fetchUsers } from '../../../actions/users/users';
import { StoreState } from '../../../reducers';
import { ErrorComponent } from '../../common/Error';
import { LoaderComponent } from '../../common/Loader';
import { UsersTableBody } from './UserTableBody';

export const UserList = () => {
  const dispatch = useDispatch();
  const { usersData, page, totalPages } = useSelector((state: StoreState) => state.users);
  const { loading, error } = useSelector((state: StoreState) => state.loading);
  const [filter, setFilter] = useState('');
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  if (error) {
    return <ErrorComponent />;
  }

  if (loading || (!usersData && !error)) {
    return <LoaderComponent />;
  }

  return (
    <Fragment>
      <Input
        type='text'
        placeholder='Buscar Usuario'
        onChange={(e) => setFilter(e.target.value)}
      />
      <Button onClick={() => dispatch(fetchUserByCedula(page, filter))}>BUSCAR</Button>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>CEDULA</Table.HeaderCell>
            <Table.HeaderCell>EMAIL</Table.HeaderCell>
            <Table.HeaderCell>TELEFONO</Table.HeaderCell>
            <Table.HeaderCell>DIRECCIÓN</Table.HeaderCell>
            <Table.HeaderCell>NOMBRE</Table.HeaderCell>
            <Table.HeaderCell>ADMIN</Table.HeaderCell>
            <Table.HeaderCell>ACCION</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <UsersTableBody usersData={usersData} />
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

      <Button
        onClick={() => history.push(`/admin/users/create`)}
        color='orange'
        icon='plus'
        content='AGREGAR USUARIO'
      />
    </Fragment>
  );
};
