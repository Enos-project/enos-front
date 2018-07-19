import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TimeService {
    private timeObservable: Observable<string>;
    private dateObservable: Observable<string>;
    private fulldateObservable: Observable<string>;

    constructor() {
        this.timeObservable = new Observable((observer) => {
            setInterval(() => {
                observer.next(this.getLocalHour('HH:MM'));
            }, 1000);
        });

        this.dateObservable = new Observable((observer) => {
            let date = this.getLocalDate('DD/MM/YY');

            const hourObserver = {
                next: hour => {
                    if (hour === '00:00') {
                        date = this.getLocalDate('DD/MM/YY');
                    }
                    observer.next(date);
                }
            };
        });

        this.fulldateObservable = new Observable((observer) => {
            let date = this.getLocalDate('DDD DD MMM YY');

            const hourObserver = {
                next: hour => {
                    if (hour === '00:00') {
                        date = this.getLocalDate('DDD DD MMM YY');
                    }
                    observer.next(date);
                }
            };
        });
    }

    /**
     * Will replace H(H) by the hour, M(M) by the minutes and S(S) by the seconds
     * @param format 'HH:MM:SS'
     * @param amPm default false
     * H = 1
     * HH = 01
     * M = 1
     * MM = 01
     * S = 1
     * SS = 01
     */
    getLocalHour(format: string, amPm: boolean = false): string {
        const localDate = new Date();

        let result = format;

        // Hours
        if (localDate.getHours() < 10) {
            result = result.replace('HH', '0' + localDate.getHours().toString());
        }
        if (!amPm) {
            result = result.replace('HH', localDate.getHours().toString());
            result = result.replace('H', localDate.getHours().toString());
        }
        result = result.replace('HH', (localDate.getHours() % 12).toString());
        result = result.replace('H', (localDate.getHours() % 12).toString());

        // Minutes
        if (localDate.getMinutes() < 10) {
            result = result.replace('MM', '0' + localDate.getMinutes().toString());
        }
        result = result.replace('MM', localDate.getMinutes().toString());
        result = result.replace('M', localDate.getMinutes().toString());

        // Seconds
        if (localDate.getSeconds() < 10) {
            result = result.replace('SS', '0' + localDate.getSeconds().toString());
        }
        result = result.replace('SS', localDate.getSeconds().toString());
        result = result.replace('S', localDate.getSeconds().toString());

        result += !!amPm && (localDate.getHours() <= 12 && ' AM' || ' PM') || '';

        return result;
    }

    /**
     * Will replace D(D)(D) by the day, M(M)(M) by the month, and Y(Y) by the year
     * D = 1
     * DD = 01
     * DDD = Day 01
     * M = 1
     * MM = 01
     * MMM = January
     * Y = 18
     * YY = 2018
     */
    getLocalDate(format: string): string {
        const localDate = new Date();
        const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'];

        let result = format;

        // Day
        // Replace DDD with day DD to let the second pass to replace the num
        result = result.replace('DDD', dayLabels[localDate.getDay()] + ' DD');

        if (localDate.getDate() < 10) {
            result = result.replace('DD', '0' + localDate.getDate().toString());
        } else {
            result = result.replace('DD', localDate.getDate().toString());
        }

        // Month
        result = result.replace('MMM', monthLabels[localDate.getMonth()]);

        if (localDate.getMonth() + 1 < 10) {
            result = result.replace('MM', '0' + (localDate.getMonth() + 1).toString());
        } else {
            result = result.replace('M', (localDate.getMonth() + 1).toString());
        }

        // Year
        result = result.replace('YY', localDate.getFullYear().toString());

        if (parseInt(localDate.getFullYear().toString().substring(2, 4), 10) < 10) {
            result = result.replace('Y', '0' + localDate.getFullYear().toString().substring(3, 4));
        } else {
            result = result.replace('Y', localDate.getFullYear().toString().substring(2, 4));
        }

        return result;
    }

    getTimezone(): string {
        const localDate = new Date();

        let timezone = (-1) * (localDate.getTimezoneOffset() / 60);
        timezone = timezone * 60;

        if (timezone >= 0) {
            return '+ ' + this.toHHMM(timezone);
        }
        return '- ' + this.toHHMM((-1) * timezone) + 'H';
    }

    toHHMMSS(num): string {
        if (!isFinite(num)) {
            return 'Infinity';
        }

        const hours   = Math.floor(num / 3600);
        const minutes = Math.floor((num - (hours * 3600)) / 60);
        const seconds = num - (hours * 3600) - (minutes * 60);

        const hoursString = (hours < 10 && '0' + hours) || hours;
        const mintutesString = (minutes < 10 && '0' + minutes) || minutes;
        const secondsString = (seconds < 10 && '0' + seconds) || seconds;

        return hoursString + ':' + mintutesString + ':' + secondsString;
    }

    toHHMM(num): string {
        if (!isFinite(num)) {
            return 'Infinity';
        }

        const hours = Math.floor(num / 60);
        const minutes = num - (hours * 60);

        const hoursString = hours;
        const minutesString = (minutes < 10 && '0' + minutes) || minutes;

        return hoursString + ':' + minutesString;
    }

    observeTime(): Observable<string> {
        return this.timeObservable;
    }

    observeDate(): Observable<string> {
        return this.dateObservable;
    }

    observeFulldate(): Observable<string> {
        return this.fulldateObservable;
    }
}
