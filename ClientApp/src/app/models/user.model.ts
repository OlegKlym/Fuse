export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token?: string;

  constructor(user)
    {
      this.id = user.id || 0;
      this.username = user.username || '';
      this.password = user.password || '';
      this.firstName = user.firstName || '';
      this.lastName = user.lastName || '';
      this.token = user.token || null;
    }
}
