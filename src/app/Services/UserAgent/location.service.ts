import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocationType } from '../../Types/UserAgent/LocationType';

@Injectable()
export class LocationService {
    locationObservable: Observable<string>;

    getLocation(): Promise<LocationType> {
        return new Promise<LocationType>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((result) => {
            resolve(
                {
                    latitude: Math.floor(result.coords.latitude * 10000) / 10000,
                    longitude: Math.floor(result.coords.longitude * 10000) / 10000
                });
            }, (err) => {
                console.error(err);
                reject(err);
            });
        });
    }

    constructObserver(): Observable<LocationType> {
        return new Observable((observer) => {
            navigator.geolocation.watchPosition((location) => {
                observer.next(
                    {
                        latitude: Math.floor(location.coords.latitude * 10000) / 10000,
                        longitude: Math.floor(location.coords.longitude * 10000) / 10000
                    });
            });
        });
    }

    reverseGeocoding(location: LocationType) {
        // TODO
    }
}
