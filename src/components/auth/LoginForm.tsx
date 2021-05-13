import React from 'react';
import { Formik, FormikHelpers, FormikProps, Form } from 'formik';
import { Button } from 'semantic-ui-react';
import { TextInput } from '../common/TextInput';
import { loginValidationSchema } from '../common/validationSchemas';
import { ModalWrapper } from '../common/modals/ModalWrapper';
import { useDispatch } from 'react-redux';
import { ErrorLabel } from '../common/ErrorLabel';
import { signInUser } from '../../actions/auth';
import { Link } from 'react-router-dom';
import { closeModal, openModal } from '../../actions/modals';

export interface LoginFormValues {
  email: string;
  password: string;
  authError?: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  return (
    <ModalWrapper header='INICIAR SESION' size='mini'>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={async (
          values: LoginFormValues,
          helpers: FormikHelpers<LoginFormValues>
        ) => {
          try {
            helpers.setSubmitting(true);
            dispatch(signInUser(values));
          } catch (error) {
            helpers.setErrors({ authError: error.response.data.msg });
          } finally {
            helpers.setSubmitting(false);
          }
        }}
      >
        {(props: FormikProps<LoginFormValues>) => (
          <React.Fragment>
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
                type='password'
                name='password'
                placeholder='CONTRASENA'
                value={props.values.password}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />

              <Button.Group>
                <Button
                  loading={props.isSubmitting}
                  disabled={!props.isValid || !props.dirty || props.isSubmitting}
                  type='submit'
                  size='large'
                  color='teal'
                  content='INGRESAR'
                  style={{ marginLeft: '0.5rem' }}
                />
                <Button.Or text='O' />
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(closeModal());
                    dispatch(openModal({ type: 'RegisterForm' }));
                  }}
                  size='large'
                  color='orange'
                  content='REGISTRARSE'
                  type='button'
                />
              </Button.Group>
            </Form>
          </React.Fragment>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export { LoginForm };
