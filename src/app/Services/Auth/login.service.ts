import { Injectable } from '@angular/core';

import { HttpClientService } from './http-client.service';
import { RouteConstants } from '../../Constants/RouteConstants';

@Injectable()
export class LoginService {

    constructor(private httpClientService: HttpClientService) { }

    login(username: string, password: string) {
        return this.httpClientService.post(RouteConstants.getRouteForPath('login'), {
            username: username,
            password: password
        });
    }
}
