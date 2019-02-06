import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { HttpService } from './main/pages/authentication/login-2/login-2.service';

@Injectable()
export class AppGuard implements CanActivate {
    /**
     *@param {Router} _router
     *@param {HttpService} _httpService
     */
    constructor(private _router: Router, private _httpService: HttpService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        const isLogged = this._httpService.isLoggedIn();
        if (!isLogged) {
            this._router.navigateByUrl('/pages/auth/login-2');
            return false;
        }

        return true;
    }
}