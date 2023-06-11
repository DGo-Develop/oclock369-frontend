export class Address {
  constructor(
    public address_id: string,
    public city_id: string,
    public department_id: string,
    public country_id: string,
    public zone_id: string,
    public latitude: number,
    public longitude: number,
    public localized_street: string
  ) {}
}
