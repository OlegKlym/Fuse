import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, take } from 'rxjs/operators';;

import { environment } from 'environments/environment';

import { Contact } from 'app/models/contact.model';
import { ContactsRequest } from 'app/models/requests/contacts-request.model';
import { ContactsResponce } from 'app/models/responces/contacts-responce.model';

import { User } from 'app/models/user.model';
import { SignInRequest } from 'app/models/requests/sign-in-request.model';
import { SignInResponce } from 'app/models/responces/sign-in-responce.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = environment.apiUrl;
  headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json');
  //.set('Authorization', 'Bearer I9UWcEVYNawb_EPcctH3YA12upDvxqe3fDYGm1gIWeDHkvLuxY-sbcZk2msdhckOrIkCZrIA2ddeXE-yCd6DvbWhJkG-UcP5W_PeDUwVuPcUDB5GGiNRlF7O-wrElJUfivPmf4-Ak8zrj39k7v65ZQ0Xc40MF3eWaKqPyE_9NusOxNO3dqGsIxKKp_6uXy-ouEOrR2IuZnP7nvjLIOMISyWqGywKTYNSkcwSxCgJRm-hs3lFwkEjEcw2c5qH42gOdIK3X_V35NeT3S6casloDVN6l-ILxfd4we6ul0thB5jbyw9igFGJ_bzZ3zECUJPX9KnTjTtBHATxQzigfZZGqidSfQvdBD43C-77QmdmIA_oEKVSI9eTK6Hzb-phQVs00_sjk0iXe7JeS01pGlyBDlKfKf7Ygb_AV_FEF-WubdCAVPKxAxU6sDJDop27cjJink9RXxgBFhhtsHRARPNoI5wn9XK00L0vbZYhaKvLiNziXjt22pjWeDpQmYZJD8JSHcujzvG54-fHDJpUOZQrIEh1eOGWLZ5aSj_Wvr4kkPpeBzlJ1KasNILLd0H7ryMaX1CJOQibcIUv3QFPSSwPV3O5g1hXR-UTG2mh49II3sx73Wmig0pdtVJoSlT7T2bvLxFsrUR0Gx-73wluLjSL3q-MjpsYMZpnsSe-bbSItqkY8SvpVyouWYuAhCpBpqtKe0jZiEzvlH0okcsEH_Xz_YVWvZ8nMdQiNmoZ9sHJ63U')
  //.set('odri-api-key', 'vmuRLTyVnU+5KWbl9FPjqQ==');

  constructor(private _httpClient: HttpClient) { }

  // geddictionary(no Bearer)

  public singIn(request: SignInRequest): Observable<SignInResponce> {
    return this._httpClient
      .post('https://odri-ua.com/api/v2/Profile/get_me', request, { headers: this.headers })
      .pipe(map(data => {
        let user = data["user"];
        let responce = new SignInResponce();
        responce.user = user.map((user) => new User(user));
        return responce;
      }),
        catchError(err => {
          console.log(err);
          let responce = new SignInResponce();
          responce.success = false;
          responce.error = err;
          return throwError(responce);
        }));
  }

  // add Bearer/rename on Clients

  public getContacts(request: ContactsRequest): Observable<ContactsResponce> {
    request.cwaAviabilyty = true;
    request.mywAviabilyty = true;
    let req = request;
    return this._httpClient
      .post('https://odri-ua.com/api/v2/Profile/get_me', null, { headers: this.headers })
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

