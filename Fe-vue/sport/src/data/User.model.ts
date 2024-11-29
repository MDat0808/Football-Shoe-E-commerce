// User.ts
export default class User {
  constructor(
    public name: string,
    public password: string,
    public address: string,
    public phone: string
  ) {}

  static fromApiResponse(data: any): User {
    return new User(data.name, data.password, data.address, data.phone);
  }
}
