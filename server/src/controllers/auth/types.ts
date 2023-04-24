export type RegistrationBody = Omit<UserEntity, 'userId' | 'role' | 'companyName' | 'image'> & {
  passwordConfirmation: string,
};

export type Credentials = {
  email: string,
  password: string
};

export type UserUpdate = Omit<UserEntity, 'userId' | 'role' | 'companyName' | 'password'>;

export type UserData = Omit<RegistrationBody, 'passwordConfirmation'>;

export type UserViewModel = Omit<UserEntity, 'password'>;

export type AuthResponse = {
  user: UserViewModel,
  token: string,
};
