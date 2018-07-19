import { Injectable } from '@angular/core';

import { BatteryType } from '../../Types/UserAgent/BatteryType';

@Injectable()
export class BatteryService {

    getBattery(): Promise<BatteryType> {
        const self = this;
        const promise = new Promise<BatteryType>((resolve, reject) => {
            (<any> navigator).getBattery()
                .then(function(battery) {
                    if (self.checkIfDesktop(<BatteryType> battery)) {
                        reject();
                    } else {
                        resolve(<BatteryType> {
                            charging: battery.charging,
                            chargingTime: battery.chargingTime,
                            pertinentChargingTime: battery.charging && battery.level < 1,
                            dischargingTime: battery.dischargingTime,
                            pertinentDischargingTime: !battery.charging,
                            level: battery.level
                        });
                    }
                }, function() {
                    const battery = (<any> navigator).battery || (<any> navigator).webkitBattery ||
                        (<any> navigator).mozBattery || (<any> navigator).msBattery;

                    if (!!battery && self.checkIfDesktop(<BatteryType> battery)) {
                        resolve(<BatteryType> {
                            charging: battery.charging,
                            chargingTime: battery.chargingTime,
                            pertinentChargingTime: battery.charging && battery.level < 1,
                            dischargingTime: battery.dischargingTime,
                            pertinentDischargingTime: !battery.charging,
                            level: battery.level
                        });
                    } else {
                        reject();
                    }
                });
        });

        return promise;
    }

    checkIfDesktop(battery: BatteryType): boolean {
        return false;
        // return battery.charging && battery.chargingTime === 0 && !isFinite(battery.dischargingTime) && battery.level === 1;
    }

    registerOnBatteryEventChange(callback: Function) {
        this.getBattery().then(function(battery) {
            (<any> battery).addEventListener('levelchange', callback);
            (<any> battery).addEventListener('chargingchange', callback);
        });
    }

    getBatteryLevelIconSuffix(level: number): string {
        level = Math.floor(level / 10) * 10;
        if (level < 10) {
            level = 10;
        }
        return '-' + level.toString();
    }

    getIcon(battery: BatteryType): string {
        let result = 'mdi-battery';
        if (battery.charging) {
            result += '-charging';
        }
        result += this.getBatteryLevelIconSuffix(battery.level * 100);
        if (result === 'battery-100') {
            result = 'battery';
        }

        return result;
    }
}
