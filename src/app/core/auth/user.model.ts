export class User {
  constructor(
    public user_id: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public prev_password: string,
    public last_password_change: Date,
    public role_id: string,
    public office_id: string,
    public status: boolean
  ) {}
}
