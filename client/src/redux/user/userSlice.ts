/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store/store';
import AuthService from 'services/auth-service';

type InitialStateProps = {
  loading: boolean,
  error: null | string,
  user: UserViewModel | null,
  token: null | string,
};
const initialState: InitialStateProps = {
  loading: false,
  error: null,
  user: null,
  token: localStorage.getItem('token') ?? null,
};

type RegisterProps = {
  email: string,
  name: string,
  surname: string,
  phone: string,
  password: string,
  passwordConfirmation: string,
};

type LoginProps = Omit<RegisterProps, 'name' | 'surname' | 'phone' | 'passwordConfirmation'>;

export const registerUserAction = createAsyncThunk('/register', async (
  {
    email,
    name,
    surname,
    phone,
    password,
    passwordConfirmation,
  }: RegisterProps,
  { rejectWithValue },
) => {
  try {
    const authResponse = await AuthService.register({
      email,
      name,
      surname,
      phone,
      password,
      passwordConfirmation,
    });
    return authResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Registered failed';
    return rejectWithValue(errorMessage);
  }
});

export const loginUserAction = createAsyncThunk('/login', async (
  {
    email,
    password,
  }: LoginProps,
  { rejectWithValue },
) => {
  try {
    const authResponse = await AuthService.login({
      email,
      password,
    });
    return authResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    return rejectWithValue(errorMessage);
  }
});

export const logoutUserAction = createAsyncThunk('/logout', async () => {
  localStorage.removeItem('token');
  return null;
});

export const authAction = createAsyncThunk('/auth', async (x, { rejectWithValue }) => {
  try {
    const authResponse = await AuthService.auth();
    return authResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Auth failed';
    return rejectWithValue(errorMessage);
  }
});

export const userUpdateAction = createAsyncThunk('/update-user', async ({
  email, name, surname, phone, image,
} : Omit<UserUpdateModel, 'id'>, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const id = state.users.user?.userId;

    if (id === undefined) return rejectWithValue('User ID not found, please re-login');
    const authResponse = await AuthService.updateUser({
      email, name, surname, phone, image, id,
    });
    return authResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'User update failed';
    return rejectWithValue(errorMessage);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      localStorage.removeItem('token');
    });
    // login
    builder.addCase(loginUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      localStorage.removeItem('token');
    });
    // auth
    builder.addCase(authAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(authAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      localStorage.removeItem('token');
    });
    // logout
    builder.addCase(logoutUserAction.fulfilled, (state) => {
      state.loading = false;
      state.token = null;
      state.user = null;
    });
    // update user
    builder.addCase(userUpdateAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userUpdateAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(userUpdateAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },

});
const usersReducer = userSlice.reducer;
export const {
  actions: { clearError },
} = userSlice;

export default usersReducer;
