import { Injectable } from '@angular/core';
import { Observable, concat, BehaviorSubject } from 'rxjs';

import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ApiService } from 'app/services/api.service';

import { Contact } from 'app/models/contact.model';
import { ContactsRequest } from 'app/models/requests/contacts-request.model';
import { ContactsResponce } from 'app/models/responces/contacts-responce.model';

import { User } from 'app/models/user.model';
import { SignInRequest } from 'app/models/requests/sign-in-request.model';
import { SignInResponce } from 'app/models/responces/sign-in-responce.model';

@Injectable()
export class DataService {

  public contacts: Contact[] = [];

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  //currentUser = { name: 'Test user', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbmRyaXlfYSIsImVtYWlsIjoiYW5kcml5LmFuZHJ1c2hrb0BnbWFpbC5jb20iLCJ0eXAiOiJBZG1pbiIsImp0aSI6IjY4Nzg4MDUxLWE2NzktNDZmYi04NjBlLTMwMzIzMjkwYWFmOCIsImV4cCI6MTg2NTE1NjQzMSwiaXNzIjoiaHR0cHM6Ly9jdXN0b213aW5kb3dhY2NlbnRzLmNvbSIsImF1ZCI6Imh0dHBzOi8vY3VzdG9td2luZG93YWNjZW50cy5jb20ifQ.Lx5gPZMb7bYXzoj-ktjPAKRw9yC1oU1WYiaxz-NBxTQ'}

  constructor(private _apiService: ApiService, private _fuseProgressBarService: FuseProgressBarService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // geddictionary(no Beared)

  // signin
  signIn(request: SignInRequest, callback: (response: SignInResponce) => void): void {
    this._fuseProgressBarService.show();
    this._apiService.singIn(request)
      .subscribe(responce => {
        if (responce.user && responce.user.token) {
          localStorage.setItem('currentUser', JSON.stringify(responce.user));
        }
        this.currentUserSubject.next(responce.user);
        this._fuseProgressBarService.hide();
        callback(responce);
      });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  //login(username: string, password: string) {
  //  return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
  //    .pipe(map(user => {
  //      // login successful if there's a jwt token in the response
  //      if (user && user.token) {
  //        // store user details and jwt token in local storage to keep user logged in between page refreshes
  //        localStorage.setItem('currentUser', JSON.stringify(user));
  //        this.currentUserSubject.next(user);
  //      }

  //      return user;
  //    }));
  //}

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getContacts(request: ContactsRequest, callback: (response: ContactsResponce) => void): void {
    this._fuseProgressBarService.show();
    this._apiService.getContacts(request)
      .subscribe(responce => {
        this.contacts = responce.contacts;
        this._fuseProgressBarService.hide();
        callback(responce);
    });
  }

}
