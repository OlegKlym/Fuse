import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { catchError, tap, map, take } from 'rxjs/operators';;

import { environment } from 'environments/environment';

import { Contact } from 'app/models/contact.model';
import { ContactsResponce } from 'app/models/responces/contacts-responce.model';
import { ContactsRequest } from 'app/models/requests/contacts-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = environment.apiUrl;

  contacts: Contact[];

  constructor(private _httpClient: HttpClient) { }

  // geddictionary(no Bearer)

  // signin(no Bearer)

  // add Bearer/rename on Clients
  public getContacts(request: ContactsRequest): Observable<ContactsResponce> {
    return this._httpClient
      .get('api/contacts-contacts', request)
      .pipe(map(data => {
        let usersList = data["users"];
        let contacts = usersList.map((contact) => new Contact(contact));
        let responce = new ContactsResponce();
        responce.contacts = contacts;
        return responce;
      }),
      catchError(err => {
        console.log(err);
        let responce = new ContactsResponce();
        responce.success = false;
        responce.error = err;
        return throwError(responce);
      }));
  }

  // get vacancies
}

