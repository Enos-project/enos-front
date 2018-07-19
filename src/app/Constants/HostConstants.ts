import { Injectable } from '@angular/core';

@Injectable()
export class HostConstants {

    static getHost(): string {
        return 'http://localhost';
    }

    static getPort(): string {
        return '8080';
    }

    static getHostURL(): string {
        return this.getHost() + ':' + this.getPort();
    }
}
