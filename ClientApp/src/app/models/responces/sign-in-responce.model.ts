import { APIResponce } from 'app/models/responces/api-responce.model';
import { User } from 'app/models/user.model';

export class SignInResponce extends APIResponce
{
    public user: User;
}
