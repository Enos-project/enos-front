import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RouteConstants } from '../Constants/RouteConstants';

@Injectable()
export class LoginService {

    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post(RouteConstants.getRouteForPath('login'), {
            username: username,
            password: password
        });
    }
}
