export interface IUser {
  username: string;
  phoneNumber: string;
  password: string;
  email?: string;
  role: 'Admin' | 'User';
}
