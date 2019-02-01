import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { User } from './login-2.user';
import * as moment from "moment";

@Injectable()
export class HttpService {

    constructor(private http: HttpClient, private router: Router) { }

    //http://localhost:60489/Home/PostUser  ASP.NET MVC 5
    //http://localhost:8080/angular/setUser.php     PHP
    // http://localhost:60820/api/values        ASP NET Wep API 2
    postData(user: User) {

        const body = { email: user.email, password: user.password };
        const headers = new HttpHeaders().set('odri-api-key', 'vmuRLTyVnU+5KWbl9FPjqQ==');

        return this.http.post('https://odri-ua.com/api/v2/Auth/signin', body, { headers: headers })
            .subscribe(
                (data: any) => {
                    localStorage.setItem('id_token', data.access_token);
                    this.router.navigateByUrl('/');
                },
                error => console.log(error)
            );;
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}