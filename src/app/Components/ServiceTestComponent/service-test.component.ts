import { Component, NgZone } from '@angular/core';

import { BatteryService } from '../../Services/UserAgent/battery.service';
import { DisplayService } from '../../Services/UserAgent/display.service';
import { TimeService } from '../../Services/UserAgent/time.service';
import { UserConfigurationService } from '../../Services/UserAgent/user-configuration.service';
import { NotificationService } from '../../Services/notification.service';
import { PermissionService } from '../../Services/UserAgent/permission.service';
import { NetworkService } from '../../Services/UserAgent/network.service';
import { DeviceService } from '../../Services/UserAgent/device.service';
import { LocationService } from '../../Services/UserAgent/location.service';

import { BatteryType } from '../../Types/UserAgent/BatteryType';
import { MemoryType } from '../../Types/UserAgent/MemoryType';
import { DisplayType } from '../../Types/UserAgent/DisplayType';
import { NetworkInformationType } from '../../Types/UserAgent/NetworkInformationType';
import { LocationType } from '../../Types/UserAgent/LocationType';

@Component({
  selector: 'app-service-test-root',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.scss']
})
export class ServiceTestComponent {

    battery: BatteryType = null;
    memory: MemoryType = null;
    display: DisplayType = null;
    permissions: object;
    networkInformation: NetworkInformationType;
    location: LocationType;

    permissionObserver = {
        next: x =>  {
            this.zone.run(() => {
                this.permissions = x;
            });
        },
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
    };

    networkObserver = {
        next: x =>  this.networkInformation = x,
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification')
    };

    locationObserver = {
        next: x =>  {this.location = x; console.log('location updated'); },
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification')
    };

    constructor(private batteryService: BatteryService,
        private displayService: DisplayService,
        private timeService: TimeService,
        private userAgentService: UserConfigurationService,
        private notificationService: NotificationService,
        private permissionService: PermissionService,
        private networkService: NetworkService,
        private locationService: LocationService,
        private deviceService: DeviceService,
        private zone: NgZone) {

        const self = this;

        this.batteryService.getBattery().then(function(battery) {
            self.battery = battery;
        }, function() {});

        this.memory = userAgentService.getMemoryUsage();
        this.display = displayService.getScreenProperties();

        permissionService.constructResumeOfPermissions().then((permissionResume) => {
            this.permissions = permissionResume;
        });
        this.permissionService.constructObserver().subscribe(this.permissionObserver);

        this.networkInformation = this.networkService.getNetworkConnection();
        this.networkService.constructObserver().subscribe(this.networkObserver);

        this.permissionService.requestPermission('geolocation').then((permissionStatus) => {
            if (permissionStatus) {
                this.locationService.getLocation().then((location) => this.location = location, (err) => console.error(err));
                this.locationService.constructObserver().subscribe(this.locationObserver);
            } else {
                notificationService.warning('Geolocation is disabled', 'Geolocation');
            }
        });

        this.deviceService.getAudioDevices().then((result) => console.log(result));
    }

    getIconForPermission(permission: string): string {
        if (permission === 'granted') {
            return 'mdi-check';
        } else if (permission === 'denied') {
            return 'mdi-close';
        }
        return 'mdi-help';
    }

    getColorForPermission(permission: string): string {
        if (permission === 'granted') {
            return 'color-primary';
        } else if (permission === 'denied') {
            return 'color-warn';
        }
        return 'color-black';
    }
}
