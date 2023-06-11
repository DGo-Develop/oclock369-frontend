import { RecipientSender } from './recipientSender.model';
import { Traceability } from './traceability.model';

export class Guide {
  constructor(
    public guide_id: string,
    public guide_number: string,
    public sender_id: string,
    public recipient_id: string,
    public type: string,
    public priority: string,
    public must_contain: string,
    public custom_field1: string,
    public custom_field2: string,
    public custom_field3: string,
    public custom_field4: string,
    public declared_value: string,
    public collection_value: string,
    public freight_value: string,
    public over_freight_value: string,
    public total_value: string,
    public weight: string,
    public height: string,
    public length: string,
    public volumetric_weight: string,
    public suggested_collection_date: string,
    public status_guide_id: string,
    public office_id: string,
    public date_created: string,
    public hour_created: string,
    public date_probable_delivery: string,
    public hour_probable_delivery: string,
    public delivery_remarks: string,
    public width: string,
    public remission: string,
    public recipient: RecipientSender,
    public sender: RecipientSender,
    public traceability: Traceability
  ) {}
}
