import { APIResponce } from 'app/models/responces/api-responce.model';
import { Contact } from 'app/models/contact.model';

export class ContactsResponce extends APIResponce
{
    public contacts: Contact[];
}
