import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';

import { User } from './login-2.user';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient, private router: Router) { }
    
    postData(user: User) {

        const body = { email: user.email, password: user.password };
        const headers = new HttpHeaders().set('odri-api-key', 'vmuRLTyVnU+5KWbl9FPjqQ==');

        return this.http.post('https://odri-ua.com/api/v2/Auth/signin', body, { headers: headers })
            .subscribe(
                (data: any) => {
                    
                    if(data.success)
                    {
                        localStorage.setItem('id_token', data.access_token);
                        this.router.navigateByUrl('/apps/dashboards/analytics');
                    }
                },
                error => console.log(error)
            );;
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        const token = localStorage.getItem("id_token");
        return token != null;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }
}