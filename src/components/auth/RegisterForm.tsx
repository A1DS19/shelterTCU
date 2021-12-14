import React from 'react';
import { Formik, FormikHelpers, FormikProps, Form } from 'formik';
import { Button, Checkbox, Divider, Label, Radio } from 'semantic-ui-react';
import { TextInput } from '../common/TextInput';
import { registerValidationSchema } from '../common/validationSchemas';
import { ModalWrapper } from '../common/modals/ModalWrapper';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../actions/modals';
import { SocialLogin } from './SocialLogin';
import { registerUser } from '../../actions/auth';
import { ErrorLabel } from '../common/ErrorLabel';
import { useState } from 'react';

export interface RegisterFormValues {
  email: string;
  password: string;
  displayName?: string;
  name: string;
  lastName: string;
  cedula: string;
  phone: string;
  authError?: string;
  donation?: string;
}

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [adopt, setAdopt] = useState<true | false>(false);
  const initialValues: RegisterFormValues = {
    email: '',
    displayName: '',
    name: '',
    lastName: '',
    password: '',
    cedula: '',
    phone: '',
    donation: JSON.stringify(adopt),
  };

  return (
    <ModalWrapper header='REGISTRO' size='mini'>
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={async (
          values: RegisterFormValues,
          helpers: FormikHelpers<RegisterFormValues>
        ) => {
          try {
            helpers.setSubmitting(true);
            values.displayName = `${values.name}${Math.random().toFixed(2)}`;
            dispatch(registerUser(values));
          } catch (error: any) {
            helpers.setErrors({ authError: error });
          } finally {
            helpers.setSubmitting(false);
          }
        }}
      >
        {(props: FormikProps<RegisterFormValues>) => (
          <Form className='ui form'>
            {props.errors.authError && (
              <ErrorLabel errorMessage={props.errors.authError} />
            )}
            <TextInput
              name='email'
              placeholder='EMAIL'
              value={props.values.email}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />

            <TextInput
              name='name'
              placeholder='NOMBRE'
              value={props.values.name}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />

            <TextInput
              name='lastName'
              placeholder='APELLIDO'
              value={props.values.lastName}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />

            <TextInput
              name='cedula'
              placeholder='CÉDULA'
              value={props.values.cedula}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />

            <TextInput
              name='phone'
              placeholder='NÚMERO DE TELÉFONO'
              value={props.values.phone}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />

            <TextInput
              type='password'
              name='password'
              placeholder='CONTRASEÑA'
              value={props.values.password}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />

            {/* <Checkbox
              style={{ marginBottom: '10px' }}
              id='donation'
              name='donation'
              value={props.values.donation}
              onChange={(e) => {
                props.handleChange(e);
                setAdopt(!adopt);
              }}
              onBlur={props.handleBlur}
              label='Si decido adoptar a una mascota, estoy dispuesto a hacer una donación de 10 mil colones para gastos de adopción.'
            /> */}

            <Button
              loading={props.isSubmitting}
              disabled={!props.isValid || !props.dirty || props.isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='REGISTRO'
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export { RegisterForm };
