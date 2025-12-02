export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  name?: string;
  email?: string;
  role?: string;
}
