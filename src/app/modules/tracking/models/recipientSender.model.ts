import { Address } from './address.model';
import { Email } from './email.model';

export class RecipientSender {
  constructor(
    public first_name: string,
    public last_name: string,
    public identification_type_id: string,
    public identification: string,
    public phone: string,
    public address: Address,
    public emails: Email[]
  ) {}
}
