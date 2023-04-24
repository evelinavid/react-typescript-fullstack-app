import React from 'react';
import {
  Button, Container, TextField, Stack, Typography, InputAdornment, IconButton,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import routes from 'navigation/routes';
import { useAppDispatch, useAppSelector } from 'redux/store/store';
import { clearError, loginUserAction } from 'redux/user/userSlice';

const validationSchema = yup.object({
  email: yup.string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: yup.string()
    .required('Password is required'),
});

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const {
    values, touched, errors, dirty, isValid, handleSubmit, handleChange, handleBlur,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (fieldData: UserLogin) => {
      dispatch(loginUserAction(fieldData));
    },
  });
  const { loading, error } = useAppSelector((state) => state.users);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  React.useEffect(() => function cleanUp() {
    dispatch(clearError());
  }, []);
  return (
    <Container sx={{
      position: 'relative',
      minHeight: '70vh',
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
          backgroundColor: 'white',
          width: '400px',
          height: '400px',
          padding: 4,
          borderRadius: '6px',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography
          color="primary"
          sx={{
            textAlign: 'center', fontWeight: 600, fontSize: 25, padding: 0, margin: 0,
          }}
        >
          Login
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
        <Button
          variant="contained"
          type="submit"
          disabled={!(dirty && isValid)}
        >
          {loading
            ? 'Loading...'
            : 'Login'}
        </Button>
        <Button variant="text" type="button" onClick={() => navigate(routes.RegisterPage)}>Don&apos;t have an account?</Button>

      </Stack>
    </Container>
  );
};

export default LoginPage;
