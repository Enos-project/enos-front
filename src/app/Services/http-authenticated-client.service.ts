import { Injectable } from '@angular/core';

import { HttpClientService } from './http-client.service';

@Injectable()
export class HttpAuthenticatedClient {

    constructor(private httpClient: HttpClientService) { }
}
