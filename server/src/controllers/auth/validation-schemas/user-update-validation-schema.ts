import * as yup from 'yup';
import { UserUpdate } from '../types';

const userUpdateValidationSchema: yup.ObjectSchema<UserUpdate> = yup.object({
  email: yup.string()
    .required('email is required')
    .email('incorect email format'),

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

  image: yup.string().url(),
})
  .strict(true);

export default userUpdateValidationSchema;
