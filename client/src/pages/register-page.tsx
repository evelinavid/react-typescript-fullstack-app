import React from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Navigate, useNavigate } from 'react-router-dom';
import routes from 'navigation/routes';
import { clearError, registerUserAction } from 'redux/user/userSlice';
import { useAppDispatch, useAppSelector } from 'redux/store/store';

const validationSchema = yup.object({
  email: yup.string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: yup.string()
    .required('Password is required')
    .min(8, 'Your password must be longer then 8 symbols')
    .max(32, 'Your password cannot be longer then 32 symbols')
    .matches(/[A-Z]{1}/, 'Password must have at least one upper case letter')
    .matches(/[a-z]{1}/, 'Password must have at least one lower case letter')
    .matches(/[0-Z9]{1}/, 'Password must have at least one number')
    .matches(/[#?!.,$%^&*]{1}/, 'Password must have at least one special symbol'),

  passwordConfirmation: yup.string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),

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
});

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const {
    values, touched, errors, dirty, isValid, handleSubmit, handleChange, handleBlur,
  } = useFormik({
    initialValues: {
      email: '',
      name: '',
      surname: '',
      phone: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: (fieldData: UserRegistration) => {
      dispatch(registerUserAction(fieldData));
      console.log(fieldData);
    },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation((show) => !show);
  };

  const { loading, user, error } = useAppSelector((state) => state.users);
  if (user) {
    <Navigate to={routes.LoginPage} />;
  }
  React.useEffect(() => function cleanUp() {
    dispatch(clearError());
  }, []);
  return (
    <Container sx={{
      position: 'relative',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
    >
      <Stack
        sx={{
          display: 'grid',
          gap: 2,
          width: '400px',
          backgroundColor: 'white',
          padding: 4,
          borderRadius: '6px',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography
          color="primary"
          sx={{
            textAlign: 'center', fontWeight: 600, fontSize: 25,
          }}
        >
          Register
        </Typography>
        {error && <Typography variant="caption" color="error">{error}</Typography>}
        <TextField
          label="Email"
          type="email"
          id="email"
          value={values.email}
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.email && errors.email}
          error={Boolean(errors.email) && Boolean(touched.email)}
          required
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <TextField
            label="Name"
            type="name"
            id="name"
            value={values.name}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.name && errors.name}
            error={Boolean(errors.name) && Boolean(touched.name)}
            required
          />
          <TextField
            label="Surname"
            type="surname"
            id="surname"
            value={values.surname}
            name="surname"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.surname && errors.surname}
            error={Boolean(errors.surname) && Boolean(touched.surname)}
            required
          />
        </Box>
        <TextField
          label="Phone number"
          type="phone"
          id="phone"
          value={values.phone}
          name="phone"
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.phone && errors.phone}
          error={Boolean(errors.phone) && Boolean(touched.phone)}
          required
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={values.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword
                    ? <VisibilityOffIcon />
                    : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.password && errors.password}
          error={Boolean(errors.password) && Boolean(touched.password)}
          required
        />
        <TextField
          label="Password Confimation"
          type={showPasswordConfirmation ? 'text' : 'password'}
          name="passwordConfirmation"
          value={values.passwordConfirmation}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPasswordConfirmation}>
                  {showPasswordConfirmation
                    ? <VisibilityOffIcon />
                    : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.passwordConfirmation && errors.passwordConfirmation}
          error={Boolean(errors.passwordConfirmation) && Boolean(touched.passwordConfirmation)}
          required
        />
        <Button variant="contained" type="submit" disabled={!(dirty && isValid)}>{loading ? 'Loading...' : 'Submit'}</Button>
        <Button variant="text" type="button" onClick={() => navigate(routes.LoginPage)}>Already have an account?</Button>

      </Stack>
    </Container>
  );
};

export default RegisterPage;
