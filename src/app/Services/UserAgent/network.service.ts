import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { NetworkInformationType } from '../../Types/UserAgent/NetworkInformationType';

@Injectable()
export class NetworkService {
    networkInformationSubscriber: Subscriber<NetworkInformationType>;

    public constructObserver(): Observable<NetworkInformationType> {
        return new Observable((observer) => {
            this.networkInformationSubscriber = observer;
            this.getNetworkConnection().onchange = () => {
                observer.next(this.getNetworkConnection());
            };
            (<any> window).ononline = () => {
                observer.next(this.getNetworkConnection());
            };
            (<any> window).onoffline = () => {
                observer.next(this.getNetworkConnection());
            };
        });
    }

    getNetworkConnection(): NetworkInformationType {
        const connection = (<any> navigator).connection || (<any> navigator).mozConnection ||
            (<any> navigator).webkitConnection || (<any> navigator).msConnection;
        connection.online = navigator.onLine;
        if (!connection.type) {
            connection.type = 'ethernet';
        }
        return connection;
    }

    getIconForEffectiveType(effectiveType: string): string {
        switch (effectiveType) {
            case '4g':
                return 'mdi-network-strengh-4';
            case '3g':
                return 'mdi-network-strengh-3';
            case '2g':
                return 'mdi-network-strengh-2';
            default:
                return 'mdi-network-strengh-1-alert';
        }
    }
}
