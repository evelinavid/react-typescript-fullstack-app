const register = async (fieldData: UserRegistration) => {
  const response = await fetch('http://localhost:8028/api/auth/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(fieldData),
  });
  const authResponse = await response.json();
  if (authResponse?.error) throw Error(authResponse.error);
  return authResponse as AuthResponse;
};

const login = async (fieldData:UserLogin) => {
  const response = await fetch('http://localhost:8028/api/auth/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(fieldData),
  });
  const authResponse = await response.json();
  if (authResponse?.error) throw Error(authResponse.error);

  return authResponse as AuthResponse;
};
const auth = async () => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  const response = await fetch('http://localhost:8028/api/auth/auth', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const authResponse = await response.json();
  if (authResponse?.error) throw Error(authResponse.error);
  return authResponse as AuthResponse;
};

const updateUser = async (fieldData: UserUpdateModel) => {
  const token = localStorage.getItem('token');
  if (token === null) throw new Error('Token expired');
  const response = await fetch('http://localhost:8028/api/auth/update-user', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fieldData),
  });
  const authResponse = await response.json();
  if (authResponse?.error) throw Error(authResponse.error);
  return authResponse as AuthResponse;
};

const AuthService = {
  register,
  login,
  auth,
  updateUser,
};

export default AuthService;
