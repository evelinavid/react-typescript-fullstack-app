import React from 'react';
import {
  Typography, TextField, Container, Stack, Button,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import routes from 'navigation/routes';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ApiService from 'services/api-service';
import ImageField from './image-field';

const validationSchema = yup.object({
  title: yup.string()
    .required('Name is required')
    .min(4, 'Your title must be longer then 4 symbols')
    .max(20, 'Your title cannot be longer then 20 symbols'),

  description: yup.string()
    .required('Surame is required')
    .min(10, 'Your description must be longer then 10 symbols')
    .max(1000, 'Your description cannot be longer then 1000 symbols'),

  price: yup.number()
    .required('price is required')
    .positive('price must be positive')
    .test(
      'priceFormat',
      'price can\'t have more than 2 decimal points',
      (value) => Number(value.toFixed(2)) === value,
    ),

  workImages: yup
    .array(yup.string().required('required').min(1, 'can`t be emnpty').url('image must be proper url'))
    .min(1, 'at least one image required')
    .required('images are required'),
});

const PostServices = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    values,
    touched,
    errors,
    dirty,
    isValid,
    handleSubmit,
    handleChange,
    setFieldValue,
    handleBlur,
    setValues,
  } = useFormik<CreateServiceData>({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      workImages: [],
    },
    validationSchema,
    onSubmit: async (formData) => {
      if (id === undefined) {
        await ApiService.postService({
          ...formData,
          workImages: formData.workImages.filter((x) => x),
          price: Number(formData.price),
        });
      } else {
        await ApiService.updateService({
          ...formData,
          serviceId: Number(id),
          price: Number(formData.price),
        });
      }
      navigate(routes.ProfilePage);
    },
  });

  React.useEffect(() => {
    (async () => {
      if (id) {
        const result = await ApiService.fetchSingleService(id as string);
        setValues({
          title: result.title,
          description: result.description,
          price: result.price,
          workImages: result.images,
        });
      }
    })();
  }, []);

  return (
    <Container>
      <Stack spacing={2} sx={{ width: { xs: 300, md: 500 }, margin: 'auto' }} component="form" onSubmit={handleSubmit}>
        <Typography>
          Here you can manage your posted construction services.
        </Typography>
        <TextField
          variant="standard"
          label="Title"
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
          helperText={touched.title && errors.title}
          error={Boolean(errors.title) && Boolean(touched.title)}
          required
        />
        <TextField
          variant="standard"
          label="Description"
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          helperText={touched.description && errors.description}
          error={Boolean(errors.description) && Boolean(touched.description)}
          required
        />
        <TextField
          variant="standard"
          label="Price"
          type="number"
          id="price"
          name="price"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price}
          helperText={touched.price && errors.price}
          error={Boolean(errors.price) && Boolean(touched.price)}
          required
        />
        <ImageField
          value={values.workImages}
          onChange={(newImages) => setFieldValue('workImages', newImages)}
          errors={errors.workImages as string[]}
        />
        <Button variant="contained" type="submit" disabled={!(dirty && isValid)}>Save</Button>
        <Button variant="text" onClick={() => navigate(routes.ProfilePage)}>back</Button>
      </Stack>
    </Container>
  );
};

export default PostServices;
