import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class PermissionService {

  public permissionTypes = [
    'geolocation',
    'notifications',
    'camera',
    'microphone'
  ];

  permissionSubscriber: Subscriber<Object>;
  permissionObservable: Observable<Object>;

  public constructObserver(): Observable<Object> {
    if (!!this.permissionObservable) {
        return this.permissionObservable;
    }

    const self = this;
    this.permissionObservable = new Observable<Object>((observer) => {
        self.permissionSubscriber = observer;

        // Fetch the permissionTypes to subscribe to changes
        self.permissionTypes.forEach((permission) => {
            (<any>navigator).permissions.query({ name: permission }).then(function (permissionStatus) {
                permissionStatus.onchange = () => {
                    self.constructResumeOfPermissions().then((resumeOfPermissions) => {
                        self.permissionSubscriber.next(resumeOfPermissions);
                    });
                };
            });
        });
    });
    return this.permissionObservable;
  }

  isPermissionGranted(type: string): Promise<string> {
    return new Promise((resolve, reject) => {
      (<any>navigator).permissions.query({ name: type }).then(function (result) {
        resolve(result.state);
      });
    });
  }

  constructResumeOfPermissions(): Promise<Object> {
    return new Promise((resolve, reject) => {
      const resume = {};
      let nbPromiseResolved = 0;

      this.permissionTypes.forEach((permission) => {
        this.isPermissionGranted(permission).then((result) => {
          resume[permission] = result;

          nbPromiseResolved++;

          if (nbPromiseResolved === this.permissionTypes.length) {
            resolve(resume);
          }
        });
      });
    });
  }

  requestPermission(type: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.isPermissionGranted(type).then((permissionsStatus) => {
        if (permissionsStatus === 'granted') {
          resolve(true);
        } else if (permissionsStatus === 'denied') {
          resolve(false);
        } else {
          // Grant permission
          switch (type) {
            case 'geolocation':
              navigator.geolocation.getCurrentPosition(() => resolve(true), () => resolve(false));
              break;
            case 'notifications':
              Notification.requestPermission().then((result) => { resolve(result === 'granted'); });
              break;
            case 'camera':
              navigator.getUserMedia({video: true}, () => resolve(true), () => { resolve(false); });
              break;
            case 'microphone':
              navigator.getUserMedia({audio: true}, () => resolve(true), () => resolve(false));
              break;
            default:
              console.error('Type non géré : ' + type);
              break;
          }
        }
      });
    });
  }
}
