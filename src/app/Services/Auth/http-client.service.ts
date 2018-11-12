import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientService {

    constructor (private http: Http) { }

    get(url: string, headers: Headers = null): Observable<Response> {
        return this.http.get(url, {
            headers: headers
        });
    }

    post(url: string, data: Object, headers: Headers = null): Observable<Response> {
        return this.http.post(url, data, {
            headers: headers
        });
    }

    put(url: string, data: Object, headers: Headers = null): Observable<Response> {
        return this.http.put(url, data, {
            headers: headers
        });
    }

    patch(url: string, data: Object, headers: Headers = null): Observable<Response> {
        return this.http.patch(url, data, {
            headers: headers
        });
    }

    delete(url: string, headers: Headers = null): Observable<Response> {
        return this.http.delete(url, {
            headers: headers
        });
    }
}
