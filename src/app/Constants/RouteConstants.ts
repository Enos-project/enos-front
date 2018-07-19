import { Injectable } from '@angular/core';

import { HostConstants } from '../Constants/HostConstants';

@Injectable()
export class RouteConstants {

    static getRoutes(): Object {
        return {
            'login': '/auth/login'
        };
    }

    static getRouteForPath(path: string): string {
        const routes = this.getRoutes();

        if (routes.hasOwnProperty(path)) {
            return HostConstants.getHostURL() + routes[path];
        } else {
            console.error('La route ' + path + 'n\'existe pas');
        }
    }
}
