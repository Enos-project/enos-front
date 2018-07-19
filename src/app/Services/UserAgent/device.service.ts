import { Injectable } from '@angular/core';

import { DeviceType } from '../../Types/UserAgent/DeviceType';

@Injectable()
export class DeviceService {
    getAudioDevices(): Promise<DeviceType[]> {
        return new Promise((resolve, reject) => {
            navigator.getUserMedia({audio: true, video: false}, function() {
                navigator.mediaDevices.enumerateDevices().then(
                    (devices) => {
                        console.log(devices
                            .filter((device) => device.kind.includes('audio')));
                        resolve(
                            devices
                                .filter((device) => device.kind.includes('audio'))
                                .map((device) => ({kind: device.kind, groupId: device.groupId, label: device.label}) ));
                    },
                    (err) => {
                        console.error(err);
                        reject('');
                    }
                );
            }, function(err) {
                console.error(err);
            });
        });
    }

    getVideoDevices(): Promise<DeviceType[]> {
        return new Promise((resolve, reject) => {
            navigator.getUserMedia({audio: false, video: true}, function() {
                navigator.mediaDevices.enumerateDevices().then(
                    (devices) => {
                        resolve(
                            devices
                                .filter((device) => device.kind.includes('video'))
                                .map((device) => ({
                                    kind: device.kind, groupId: device.groupId, label: device.label}) ));
                    },
                    (err) => {
                        console.error(err);
                        reject('');
                    }
                );
            }, function(err) {
                console.error(err);
            });
        });
    }
}
