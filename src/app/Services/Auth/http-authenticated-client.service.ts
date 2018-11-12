import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { HttpClientService } from './http-client.service';
import { StoreUserService } from './store-user.service';

import { CookieType } from '../../Types/CookieType';

@Injectable()
export class HttpAuthenticatedClientService {

    constructor(private httpClient: HttpClientService, private storeUserService: StoreUserService) { }

    addTokenToHeaders(headers: Headers): Headers {
        headers = headers || new Headers();
        const connectedUser = this.storeUserService.getUser();
        if (!!connectedUser) {
            headers.append('Authorization', 'Bearer ' + connectedUser.token);
        }
        return headers;
    }

    get(url: string, headers: Headers = null): Observable<Response> {
        headers = this.addTokenToHeaders(headers);
        return this.httpClient.get(url, headers);
    }

    post(url: string, data: Object, headers: Headers = null): Observable<Response> {
        headers = this.addTokenToHeaders(headers);
        return this.httpClient.post(url, data, headers);
    }

    put(url: string, data: Object, headers: Headers = null): Observable<Response> {
        headers = this.addTokenToHeaders(headers);
        return this.httpClient.put(url, data, headers);
    }

    patch(url: string, data: Object, headers: Headers = null): Observable<Response> {
        headers = this.addTokenToHeaders(headers);
        return this.httpClient.patch(url, data, headers);
    }

    delete(url: string, headers: Headers = null): Observable<Response> {
        headers = this.addTokenToHeaders(headers);
        return this.httpClient.delete(url, headers);
    }
}
