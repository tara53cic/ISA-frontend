export interface Address {
  street?: string;
  city?: string;
  country?: string;
}

export interface User {
  id?: number;
  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: Address;
}
