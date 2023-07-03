export enum UserRole {
  Admin = 'Admin',
  Waiter = 'Waiter',
  Cashier = 'Cashier',
  Kitchen = 'Kitchen',
}
export interface User {
  name: string;
  password: string;
  email: string;
  role: UserRole;
  image?: File;
  phone: string;
}
