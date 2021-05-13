import * as Yup from 'yup';
import 'yup-phone';

export const loginValidationSchema = Yup.object({
  email: Yup.string().required('El email es requerido').email(),
  password: Yup.string().required('La contrasena es requerida'),
});

export const registerValidationSchema = Yup.object({
  email: Yup.string().required('El email es requerido').email(),
  displayName: Yup.string().required('El nombre de usuario es requerida'),
  cedula: Yup.string()
    .min(5, 'La cedula debe tener al menos 5 caracteres')
    .required('La cedula es requerida'),
  password: Yup.string()
    .required('La contrasena es requerida')
    .min(6, 'La contrasena debe tener minimo 6 digitos'),
});

export const createUserValidationSchema = Yup.object({
  email: Yup.string().required('El email es requerido').email(),
  displayName: Yup.string().required('El nombre de usuario es requerida'),
  password: Yup.string()
    .required('La contrasena es requerida')
    .min(6, 'La contrasena debe tener minimo 6 digitos'),
  name: Yup.string().required('El nombre es requerido'),
  lastName: Yup.string().required('El apellido es requerido'),
  isAdmin: Yup.string().required(
    'Determinar si el usuario es administrador es requerido'
  ),
  cedula: Yup.string().required('La cedula es requerida'),
});

export const updateUserValidationSchema = Yup.object({
  email: Yup.string().required('El email es requerido').email(),
  displayName: Yup.string().required('El nombre de usuario es requerida'),
  name: Yup.string().required('El nombre es requerido'),
  lastName: Yup.string().required('El apellido es requerido'),
  isAdmin: Yup.string().required(
    'Determinar si el usuario es administrador es requerido'
  ),
});

export const createPetValidationSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  location: Yup.string().required('La ubicacion es requerida'),
  breed: Yup.string().required('La raza es requerida'),
  adopted: Yup.string().required('Debe escojer si la mascota esta adoptada o no'),
  description: Yup.string().required('La descripccion es requerida'),

  size: Yup.string().required('El tamaño es requerido'),
  adoptionDate: Yup.string()
    .notRequired()
    .when('adopted', {
      is: (val: string) => val !== 'false',
      then: Yup.string().required('La fecha de adopcion es requerida'),
    }),

  adoptionPlace: Yup.string()
    .notRequired()
    .when('adopted', {
      is: (val: string) => val !== 'false',
      then: Yup.string().required('El lugar de adopcion es requerido'),
    }),

  adopteeId: Yup.string()
    .notRequired()
    .when('adopted', {
      is: (val: string) => val !== 'false',
      then: Yup.string().required('La cedula del adoptante es requerida'),
    }),
  employee: Yup.string().required('El nombre del empleado es requerido'),
});

export const updatePersonalDataValidationSchema = Yup.object({
  displayName: Yup.string().required('El nombre de usuario es requerida'),
  name: Yup.string().required('El apellido es requerido'),
  lastName: Yup.string().required('El apellido es requerido'),
  phone: Yup.string().required('El telefono es requerido'),
  direction: Yup.string().required('La direccion es requerida'),
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
