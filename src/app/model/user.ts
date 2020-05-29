export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  roles: Array<string>;
  pesel: string;
}
