export class CreateUserDto {
  readonly username: string;
  readonly phoneNumber: string;
  readonly password: string;
  readonly role: 'Admin' | 'User';
}
