import {
  Button, Box, TextField, IconButton, Avatar, Tooltip, Modal,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/store/store';
import { userUpdateAction } from 'redux/user/userSlice';
import * as yup from 'yup';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const validationSchema = yup.object({
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
});

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useAppSelector((state) => state.users.user);
  const {
    touched,
    errors,
    dirty,
    values, setFieldValue, handleChange, handleSubmit, setValues, handleBlur,
  } = useFormik({
    initialValues: {
      name: user?.name ?? '',
      surname: user?.surname ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      image: user?.image ?? '',
    },
    validationSchema,
    onSubmit: (fieldData) => {
      dispatch(userUpdateAction(fieldData));
    },
    enableReinitialize: true,
  });

  React.useEffect(() => {
    const newInitValues = {
      name: user?.name ?? '',
      surname: user?.surname ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      image: user?.image ?? '',
    };
    setValues(newInitValues);
  }, [user]);

  return (
    <Box>
      <Stack spacing={2} sx={{ width: { xs: 300, md: 500 }, margin: 'auto' }} component="form" onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          label="Email"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={values.email}
          onBlur={handleBlur}
          helperText={touched.email && errors.email}
          error={Boolean(errors.email) && Boolean(touched.email)}
        />
        <TextField
          variant="standard"
          label="Name"
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={values.name}
          onBlur={handleBlur}
          helperText={touched.name && errors.name}
          error={Boolean(errors.name) && Boolean(touched.name)}
        />
        <TextField
          variant="standard"
          label="Surname"
          type="text"
          id="surname"
          name="surname"
          onChange={handleChange}
          value={values.surname}
          onBlur={handleBlur}
          helperText={touched.surname && errors.surname}
          error={Boolean(errors.surname) && Boolean(touched.surname)}
        />
        <TextField
          variant="standard"
          label="Phone"
          type="text"
          id="phone"
          name="phone"
          onChange={handleChange}
          value={values.phone}
          onBlur={handleBlur}
          helperText={touched.phone && errors.phone}
          error={Boolean(errors.phone) && Boolean(touched.phone)}
        />
        <Stack>
          <Tooltip title="Click to add avatar" placement="left">
            <IconButton sx={{ width: 0, margin: 'auto' }} disableRipple type="submit" onClick={handleOpen}>
              <Avatar src={values.image} sizes="50px" />
            </IconButton>
          </Tooltip>

        </Stack>
        <Button variant="contained" type="submit" disabled={!dirty}>Save</Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            fullWidth
            label="image"
            variant="standard"
            value={values.image}
            onChange={(e) => setFieldValue('image', e.target.value)}
          />
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={values.image}
              onError={function (e) {
                const imgElement = e.target as HTMLImageElement;
                imgElement.onerror = null; imgElement.src = '/images/noimg.png';
              }}
              alt=""
              style={{
                width: 100, height: 100, objectFit: 'cover', objectPosition: 'center',
              }}
            />

          </Box>
          <Button variant="contained" sx={{ mt: 1 }} onClick={handleClose}>Save</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AccountPage;
