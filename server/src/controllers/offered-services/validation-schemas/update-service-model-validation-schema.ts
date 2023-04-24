import * as yup from 'yup';
import { UpdateServiceBody } from '../types';

const updateServiceModelValidationSchema: yup.ObjectSchema<UpdateServiceBody> = yup.object({
  serviceId: yup.number().required(),
  
  title: yup.string()
    .required('Name is required')
    .min(2, 'Your name must be longer then 2 symbols')
    .max(20, 'Your name cannot be longer then 15 symbols'),

  description: yup.string()
    .required('Surame is required')
    .min(10, 'Your surname must be longer then 2 symbols')
    .max(1000, 'Your surname cannot be longer then 15 symbols'),

  price: yup.number()
    .required('price is required')
    .positive('price must be positive')
    .test(
      'priceFormat',
      'price can\'t have more than 2 decimal points',
      (value) => Number(value.toFixed(2)) === value,
    ),

  workImages: yup
    .array(yup.string().required().url('image must be accessible'))
    .min(1, 'at least one image required')
    .required('images are required'),

})
  .strict(true);

export default updateServiceModelValidationSchema;
