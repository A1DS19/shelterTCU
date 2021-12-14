import * as Yup from 'yup';
import 'yup-phone';

export const loginValidationSchema = Yup.object({
  email: Yup.string().required('El email es requerido').email(),
  password: Yup.string().required('La contraseña es requerida'),
});

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email no tiene el formato correcto'),
  displayName: Yup.string().optional(),
  cedula: Yup.string()
    .required('Debe ingresar su número de cédula')
    .matches(/^[0-9]+$/, 'Número de cédula invalido')
    .min(9, 'Número de cédula invalido')
    .max(9, 'Número de cédula invalido'),
  name: Yup.string().required('Debe ingresar su nombre'),
  lastName: Yup.string().required('Debe ingresar su apellido'),
  phone: Yup.string()
    .required('Debe ingresar su número de teléfono')
    .matches(/^[0-9]+$/, 'Número telefonico invalido')
    .min(8, 'Número telefonico invalido')
    .max(8, 'Número telefonico invalido'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener minimo 6 digitos'),
});

export const createUserValidationSchema = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email no tiene el formato correcto'),
  displayName: Yup.string().required('El nombre de usuario es requerida'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener minimo 6 digitos'),
  name: Yup.string().required('El nombre es requerido'),
  lastName: Yup.string().required('El apellido es requerido'),
  isAdmin: Yup.string().required(
    'Determinar si el usuario es administrador es requerido'
  ),
  cedula: Yup.string()
    .required('Debe ingresar su número de cédula')
    .matches(/^[0-9]+$/, 'Número de cédula invalido')
    .min(9, 'Número de cédula invalido')
    .max(9, 'Número de cédula invalido'),
  phone: Yup.string()
    .required('Debe ingresar su número de teléfono')
    .matches(/^[0-9]+$/, 'Número telefonico invalido')
    .min(8, 'Número telefonico invalido')
    .max(8, 'Número telefonico invalido'),
});

export const updateUserValidationSchema = Yup.object({
  email: Yup.string()
    .required('El email es requerido')
    .email('El email debe tener un formato correcto'),
  displayName: Yup.string().required('El nombre de usuario es requerida'),
  name: Yup.string(),
  lastName: Yup.string(),
  isAdmin: Yup.string().required(
    'Determinar si el usuario es administrador es requerido'
  ),
  cedula: Yup.string()
    .required('Debe ingresar su número de cédula')
    .matches(/^[0-9]+$/, 'Número de cédula invalido')
    .min(9, 'Número de cédula invalido')
    .max(9, 'Número de cédula invalido'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Número telefonico invalido')
    .min(8, 'Número telefonico invalido')
    .max(8, 'Número telefonico invalido'),
});

export const createPetValidationSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  location: Yup.string().required('La ubicación es requerida'),
  breed: Yup.string().required('La raza es requerida'),
  adopted: Yup.string().required('Debe escojer si la mascota esta adoptada o no'),
  description: Yup.string().required('La descripción es requerida'),

  size: Yup.string().required('El tamaño es requerido'),
  adoptionDate: Yup.string()
    .notRequired()
    .when('adopted', {
      is: (val: string) => val !== 'false',
      then: Yup.string().required('La fecha de adopción es requerida'),
    }),

  adoptionPlace: Yup.string()
    .notRequired()
    .when('adopted', {
      is: (val: string) => val !== 'false',
      then: Yup.string().required('El lugar de adopción es requerido'),
    }),

  adopteeId: Yup.string()
    .notRequired()
    .when('adopted', {
      is: (val: string) => val !== 'false',
      then: Yup.string()
        .required('Debe ingresar su número de cédula')
        .matches(/^[0-9]+$/, 'Numero de cédula invalido')
        .min(9, 'Número de cédula invalido')
        .max(9, 'Número de cédula invalido'),
    }),

  employee: Yup.string()
    .notRequired()
    .when('adopted', {
      is: (val: string) => val !== 'false',
      then: Yup.string().required('El nombre del empleado es requerido'),
    }),
});

export const updatePersonalDataValidationSchema = Yup.object({
  displayName: Yup.string().required('El nombre de usuario es requerida'),
  name: Yup.string(),
  lastName: Yup.string(),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Numero telefonico invalido')
    .min(8, 'Numero telefonico invalido')
    .max(8, 'Numero telefonico invalido'),
  direction: Yup.string(),
});

export const updatePasswordValidationSchema = Yup.object({
  oldPassword: Yup.string().required('Debe agregar su antigua contrasena para cambiarla'),
  newPassword: Yup.string()
    .required('La contrasena es requerida')
    .min(6, 'La contrasena debe tener minimo 6 digitos'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Las contrasenas deben ser iguales')
    .required(),
});

export const currentUserFormValidationSchema = Yup.object({
  email: Yup.string().required('El email es requerido').email(),
  message: Yup.string().max(5000).required('El mensaje es requerido'),
  userName: Yup.string().required('Debe agregar su nombre'),
  petId: Yup.string(),
});

export const noCurrentUserFormValidationSchema = Yup.object({
  email: Yup.string().required('El email es requerido').email(),
  message: Yup.string().max(5000).required('El mensaje es requerido'),
  userName: Yup.string().required('Debe agregar su nombre'),
  petId: Yup.string(),
});

export const newsLetterValidationSchema = Yup.object({
  email: Yup.string().required('Debe agregar un email').email(),
});
