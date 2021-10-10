import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { Button, Confirm, Grid, Header, Segment } from 'semantic-ui-react';
import { StoreState } from '../../../reducers';
import { ErrorComponent } from '../../common/Error';
import { LoaderComponent } from '../../common/Loader';
import { SelectInput } from '../../common/SelectInput';
import { TextInput } from '../../common/TextInput';
import { toast } from 'react-toastify';
import { AuthPayload } from '../../../actions/auth';
import {
  clearSelectedUser,
  createUser,
  fetchSelectedUser,
  updateUserData,
  generateNewUserPassword,
} from '../../../actions/users/users';
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from '../../common/validationSchemas';

export interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export const UserForm: React.FC<Props> = ({ match, location }) => {
  const userId = match.params.id;
  const [openConfirm, setConfirm] = React.useState(false);
  const { selectedUser } = useSelector((state: StoreState) => state.users);
  const { loading, error } = useSelector((state: StoreState) => state.loading);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/admin/users/create') return;
    dispatch(fetchSelectedUser(userId.toString()));

    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, userId, location.pathname]);

  if (error) {
    return <ErrorComponent />;
  }

  if (loading) {
    return <LoaderComponent />;
  }

  const initialValues: AuthPayload = {
    id: selectedUser?.id!,
    email: selectedUser?.email!,
    password: selectedUser?.password!,
    name: selectedUser?.name!,
    lastName: selectedUser?.lastName!,
    isAdmin: selectedUser?.isAdmin!,
    displayName: selectedUser?.displayName!,
    photoURL: selectedUser?.photoURL!,
    createdAt: selectedUser?.createdAt!,
    direction: selectedUser?.direction!,
    cedula: selectedUser?.cedula!,
    phone: selectedUser?.phone!,
  };

  const handleSubmit = (values: AuthPayload, helpers: FormikHelpers<AuthPayload>) => {
    try {
      if (selectedUser) {
        dispatch(
          updateUserData(userId.toString()!, values, () => {
            history.push('/admin/users');
          })
        );
      } else {
        dispatch(
          createUser(values, () => {
            history.push('/admin/users');
          })
        );
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      helpers.setSubmitting(false);
    }
  };

  const handleGenerateNewPassword = (userId: string) => {
    dispatch(
      generateNewUserPassword(userId, () => {
        setConfirm(false);
      })
    );
  };

  return (
    <Fragment>
      <Button
        onClick={() => history.goBack()}
        color='orange'
        inverted
        icon='arrow left'
        content='Volver'
      />
      <Segment clearing>
        <Header
          content={
            selectedUser
              ? `Modificar Informacion de ${
                  selectedUser.name || selectedUser.displayName
                }`
              : 'Crear Usuario'
          }
        />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            !selectedUser ? createUserValidationSchema : updateUserValidationSchema
          }
          onSubmit={(values: AuthPayload, helpers: FormikHelpers<AuthPayload>) => {
            handleSubmit(values, helpers);
          }}
        >
          {(props: FormikProps<AuthPayload>) => (
            <React.Fragment>
              <Form className='ui form'>
                <Grid>
                  <Grid.Column width={8}>
                    <TextInput
                      label='Email'
                      name='email'
                      placeholder='Email'
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />

                    {!selectedUser && (
                      <TextInput
                        type='password'
                        label='Contrasena'
                        name='password'
                        placeholder='Contrasena'
                        value={props.values.password}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    )}

                    <TextInput
                      label='Nombre'
                      name='name'
                      placeholder='Nombre'
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />

                    <TextInput
                      label='Apellido'
                      name='lastName'
                      placeholder='Apellido'
                      value={props.values.lastName}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />

                    <SelectInput
                      label='Administrador'
                      name='isAdmin'
                      placeholder='Administrador'
                      value={props.values.isAdmin}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      options={[
                        { key: 0, value: 'true', text: 'Si' },
                        { key: 1, value: 'false', text: 'No' },
                      ]}
                    />

                    <TextInput
                      label='Nombre de Usuario'
                      name='displayName'
                      placeholder='Nombre de Usuario'
                      value={props.values.displayName}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <TextInput
                      label='Direccion de usuario'
                      name='direction'
                      placeholder='Direccion'
                      value={props.values.direction}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    <TextInput
                      label='Cedula de usuario'
                      name='cedula'
                      placeholder='Cedula'
                      value={props.values.cedula}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    <TextInput
                      label='Telefono de usuario'
                      name='phone'
                      placeholder='Telefono'
                      value={props.values.phone}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {selectedUser && (
                      <Button
                        inverted
                        color='red'
                        onClick={(e) => {
                          e.preventDefault();
                          setConfirm(true);
                        }}
                      >
                        Generar nueva contraseña
                      </Button>
                    )}
                  </Grid.Column>
                </Grid>
                <Button
                  loading={props.isSubmitting}
                  disabled={!props.isValid || !props.dirty || props.isSubmitting}
                  type='submit'
                  fluid
                  size='large'
                  color='orange'
                  style={{
                    maxWidth: '31rem',
                    marginTop: '1rem',
                  }}
                  content={selectedUser ? 'ACTUALIZAR' : 'CREAR'}
                />
              </Form>
            </React.Fragment>
          )}
        </Formik>
      </Segment>
      <Confirm
        content={`Esta seguro que desea generar una nueva contraseña?`}
        cancelButton='CANCELAR'
        confirmButton='GENERAR'
        size='small'
        open={openConfirm}
        onCancel={() => setConfirm(false)}
        onConfirm={() => handleGenerateNewPassword(selectedUser?._id)}
      />
    </Fragment>
  );
};
