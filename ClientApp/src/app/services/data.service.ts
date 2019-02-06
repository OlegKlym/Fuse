import { Injectable } from '@angular/core';
import { Observable, concat } from 'rxjs';

import { Contact } from 'app/models/contact.model';
import { ContactsResponce } from 'app/models/responces/contacts-responce.model';
import { ContactsRequest } from 'app/models/requests/contacts-request.model';
import { ApiService } from 'app/services/api.service';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Injectable()
export class DataService {

  contacts: Contact[] = [];

  constructor(private _apiService: ApiService, private _fuseProgressBarService: FuseProgressBarService) { }

  // geddictionary(no Beared)

  // signin



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
