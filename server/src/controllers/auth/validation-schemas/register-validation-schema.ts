import * as yup from 'yup';
import { RegistrationBody } from '../types';

const registrationBodyValidationSchema: yup.ObjectSchema<RegistrationBody> = yup.object({
  email: yup.string()
    .required('email is required')
    .email('incorect email format'),

  password: yup.string()
    .required('password is required')
    .min(8, 'password must have at least 8 symbols')
    .max(32, 'password cannot have more than 32 symbols')
    .matches(/[A-Z]{1}/, 'password must have at least one upper case letter')
    .matches(/[a-z]{1}/, 'password must have at least one lower case letter')
    .matches(/[0-Z9]{1}/, 'password must have at least one number')
    .matches(/[#?!.,$%^&*]{1}/, 'password must have at least one special symbol'),

  passwordConfirmation: yup.string()
    .required('password is required')
    .oneOf([yup.ref('password')], 'passwords do not match'),

  name: yup.string()
    .required('Name is required')
    .min(2, 'Your name must be longer then 2 symbols')
    .max(15, 'Your name cannot be longer then 15 symbols'),

  surname: yup.string()
    .required('Surame is required')
    .min(2, 'Your surname must be longer then 2 symbols')
    .max(15, 'Your surname cannot be longer then 15 symbols'),

  phone: yup.string()
    .required('phone is required')
    .min(8, 'phone must have at least 2 numbers')
    .max(32, 'phone can\'t have more than 32 numbers'),

})

  .strict(true);
export default registrationBodyValidationSchema;
