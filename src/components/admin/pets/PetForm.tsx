import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import {
  clearSelectedPet,
  createPet,
  fetchSelectedPet,
  updatePet,
} from '../../../actions/pets/pets';
import { PetsData } from '../../../actions/pets/petsInterfaces';
import { StoreState } from '../../../reducers';
import { ErrorComponent } from '../../common/Error';
import { LoaderComponent } from '../../common/Loader';
import { SelectInput } from '../../common/SelectInput';
import { TextArea } from '../../common/TextArea';
import { TextInput } from '../../common/TextInput';
import { PetPhotos } from './PetPhotos';
import { toast } from 'react-toastify';
import { DateInput } from '../../common/DateInput';
import { createPetValidationSchema } from '../../common/validationSchemas';
import { toTitleCase } from '../../../util/upperCase';

export interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export const PetForm: React.FC<Props> = ({ match, location }) => {
  const petId = match.params.id;
  const { selectedPet } = useSelector((state: StoreState) => state.pets);
  const { loading, error } = useSelector((state: StoreState) => state.loading);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/admin/pets/create') return;
    dispatch(fetchSelectedPet(petId.toString()));

    return () => {
      dispatch(clearSelectedPet());
    };
  }, [dispatch, petId, location.pathname]);

  if (error) {
    return <ErrorComponent />;
  }

  if (loading) {
    return <LoaderComponent />;
  }

  console.log(selectedPet);

  const initialValues: PetsData = {
    id: selectedPet?.id!,
    name: selectedPet?.name!,
    location: selectedPet?.location!,
    breed: selectedPet?.breed!,
    adopted: selectedPet?.adopted! || 'false',
    photosUrl: selectedPet?.photosUrl!,
    description: selectedPet?.description!,
    size: selectedPet?.size,
    adoptionDate: selectedPet?.adoptionDate,
    adoptionPlace: selectedPet?.adoptionPlace,
    adopteeId: selectedPet?.cedulaAdoptee,
    employee: selectedPet?.employee,
  };

  const handleSubmit = (values: PetsData, helpers: FormikHelpers<PetsData>) => {
    if (values.adopted === 'false') {
      values.adoptionPlace = '';
      values.adopteeId = '';
      values.employee = '';
      values.cedulaAdoptee = '';
    }
    try {
      selectedPet
        ? dispatch(
            updatePet(petId.toString()!, values, () => {
              history.push('/admin/pets');
            })
          )
        : dispatch(
            createPet(values, () => {
              history.push('/admin/pets');
            })
          );
    } catch (error: any) {
      toast.error(error);
    } finally {
      helpers.setSubmitting(false);
    }
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
            selectedPet
              ? `Modificar Informacion de ${toTitleCase(selectedPet.name)}`
              : 'Crear Mascota'
          }
        />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={createPetValidationSchema}
          onSubmit={(values: PetsData, helpers: FormikHelpers<PetsData>) => {
            handleSubmit(values, helpers);
          }}
        >
          {(props: FormikProps<PetsData>) => {
            return (
              <Grid>
                <Grid.Column width={8}>
                  <Form className='ui form'>
                    <Grid>
                      <Grid.Column width={8}>
                        <TextInput
                          label='Nombre'
                          name='name'
                          placeholder='Nombre'
                          value={toTitleCase(props.values.name || '')}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />

                        <TextInput
                          label='Ubicacion'
                          name='location'
                          placeholder='Ubicacion'
                          value={props.values.location}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />

                        <TextInput
                          label='Raza'
                          name='breed'
                          placeholder='Raza'
                          value={props.values.breed}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />

                        {selectedPet && (
                          <SelectInput
                            label='Adoptado'
                            name='adopted'
                            placeholder='Esta Adoptado'
                            value={props.values.adopted}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            options={[
                              { key: 0, value: 'true', text: 'Si' },
                              { key: 1, value: 'false', text: 'No' },
                            ]}
                          />
                        )}
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <SelectInput
                          label='Tamaño'
                          name='size'
                          placeholder='Tamaño'
                          value={props.values.size}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          options={[
                            { key: 0, value: 'pequeño', text: 'Pequeño' },
                            { key: 1, value: 'mediano', text: 'Mediano' },
                            { key: 2, value: 'grande', text: 'Grande' },
                          ]}
                        />

                        {props.values.adopted !== 'false' && (
                          <React.Fragment>
                            <DateInput
                              label='Fecha de adopcion'
                              name='adoptionDate'
                              placeholder='Fecha de adopcion'
                              value={props.values.adoptionDate}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />

                            <TextInput
                              label='Lugar de adopcion'
                              name='adoptionPlace'
                              placeholder='Lugar de adopcion'
                              value={props.values.adoptionPlace}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />

                            <TextInput
                              label='Cedula de Adoptante'
                              name='adopteeId'
                              placeholder='Cedula'
                              value={props.values.adopteeId}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                            />
                          </React.Fragment>
                        )}
                      </Grid.Column>
                    </Grid>
                    {props.values.adopted !== 'false' && (
                      <TextInput
                        label='Encargado de adopción'
                        name='employee'
                        placeholder='Encargado de adopción'
                        value={props.values.employee}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    )}
                    <TextArea
                      label='Descripccion'
                      name='description'
                      placeholder='Descripccion'
                      value={props.values.description}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />

                    <Button
                      loading={props.isSubmitting}
                      disabled={!props.isValid || !props.dirty || props.isSubmitting}
                      type='submit'
                      fluid
                      size='large'
                      color='orange'
                      content={selectedPet ? 'ACTUALIZAR' : 'CREAR'}
                    />
                  </Form>
                </Grid.Column>
                <Grid.Column width={8}>
                  {selectedPet && <PetPhotos selectedPet={selectedPet} />}
                </Grid.Column>
              </Grid>
            );
          }}
        </Formik>
      </Segment>
    </Fragment>
  );
};
