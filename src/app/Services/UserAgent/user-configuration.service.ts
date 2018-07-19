import { Injectable } from '@angular/core';

import { OsRequestConstants } from '../../Constants/OsRequestConstants';

import { OsRequestType } from '../../Types/UserAgent/OsRequestType';
import { MemoryType } from '../../Types/UserAgent/MemoryType';
import { BrowserType } from '../../Types/UserAgent/BrowserType';
import { OsType } from '../../Types/UserAgent/OsType';

@Injectable()
export class UserConfigurationService {

    isMobile(): boolean {
        const navigatorVersion = navigator.appVersion;

        return !navigatorVersion || /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigatorVersion);
    }

    getTouchpoints(): number {
        return !!navigator.maxTouchPoints && navigator.maxTouchPoints || 0;
    }

    isTactile(): boolean {
        return this.getTouchpoints() > 0;
    }

    getOS(): OsType {
        const nAgt = navigator.userAgent;

        let os = '-';
        let version = '-';
        let icon = '';

        OsRequestConstants.getOsRequestStrings().forEach(function(clientString: OsRequestType) {
            if (clientString.regex.test(nAgt) && os === '-') {
                os = clientString.name;
            }
        });

        if (/Windows/.test(os)) {
            version = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
            icon = 'windows';
        }

        switch (os) {
            case 'Mac OS X':
                version = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                icon = 'apple';
                break;

            case 'Android':
                version = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                icon = 'android';
                break;

            case 'iOS':
                const osVersionIOS = /OS (\d+)_(\d+)_?(\d+)?/.exec(nAgt);
                version = osVersionIOS[1] + '.' + osVersionIOS[2] + '.' + (osVersionIOS[3] || 0);
                icon = 'apple';
                break;
            case 'Linux':
                icon = 'linux';
                break;
        }

        return <OsType> {
            os: os,
            osVersion: version,
            osIcon: icon
        };
    }

    getLanguage(): string {
        const language = navigator.language || (<any> navigator).userLanguage;
        return !!language && language || '';
    }

    getLanguageIso2(): string {
        let language = this.getLanguage();
        if (language.indexOf('-') >= 0) {
            language = language.split('-')[0];
            return language.toLowerCase();
        }
        return '';
    }

    getLanguageInEnglish(): string {
        const languages = OsRequestConstants.getLanguageList();

        if (languages.hasOwnProperty(this.getLanguage().substring(0, 2))) {
            return languages[this.getLanguage().substring(0, 2)].name;
        }

        return '';
    }

    getLanguageInNative(): string {
        const languages = OsRequestConstants.getLanguageList();

        if (languages.hasOwnProperty(this.getLanguage().substring(0, 2))) {
            return languages[this.getLanguage().substring(0, 2)].nativeName;
        }

        return '';
    }

    getBrowser(): object {
        const nVer = navigator.appVersion;
        const nAgt = navigator.userAgent;

        let browser = navigator.appName;
        let version = '' + parseFloat(navigator.appVersion);
        let majorVersion = parseInt(navigator.appVersion, 10);
        let nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }

        if ((verOffset = nAgt.indexOf('OPR')) !== -1) { // Opera Next
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        } else if ((verOffset = nAgt.indexOf('Edge')) !== -1) { // Edge
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 5);
        } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) { // MSIE
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) { // Chrome
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) { // Safari
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                version = nAgt.substring(verOffset + 8);
            }
        } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) { // Firefox
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        } else if (nAgt.indexOf('Trident/') !== -1) { // MSIE 11+
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) { // Other browsers
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() === browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) !== -1) {
            version = version.substring(0, ix);
        }
        if ((ix = version.indexOf(' ')) !== -1) {
            version = version.substring(0, ix);
        }
        if ((ix = version.indexOf(')')) !== -1) {
            version = version.substring(0, ix);
        }

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(nVer);
            majorVersion = parseInt(nVer, 10);
        }

        return <BrowserType> {
            name: browser,
            majorVersion: majorVersion,
            completeVersion: version
        };
    }

    isCookiesEnabled(): boolean {
        let cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') !== -1) ? true : false;
        }

        return cookieEnabled;
    }

    getMemoryUsage(): MemoryType {
        if ('performance' in window && 'memory' in window.performance) {
            const memoryTemp: MemoryType = (<any> window.performance).memory;

            if ('jsHeapSizeLimit' in memoryTemp && 'totalJSHeapSize' in memoryTemp && 'usedJSHeapSize' in memoryTemp) {
                return <MemoryType> {
                    jsHeapSizeLimit: memoryTemp.jsHeapSizeLimit / 1000000,
                    totalJSHeapSize: memoryTemp.totalJSHeapSize / 1000000,
                    usedJSHeapSize: memoryTemp.usedJSHeapSize / 1000000,
                    percentageUsedOfTotal: Math.floor(((<any> memoryTemp).usedJSHeapSize / (<any> memoryTemp).totalJSHeapSize) * 100),
                    percentageTotalOfLimit: Math.floor(((<any> memoryTemp).totalJSHeapSize / (<any> memoryTemp).jsHeapSizeLimit) * 100),
                    percentageTotalOfTotal: Math.floor(((<any> memoryTemp).usedJSHeapSize / (<any> memoryTemp).jsHeapSizeLimit) * 100)
                };
            } else {
                return null;
            }
        }
        return null;
    }

    getThreads(): number {
        return !!navigator.hardwareConcurrency && navigator.hardwareConcurrency || null;
    }

    getMemory(): string {
        if (!!(<any> navigator).deviceMemory) {
            if ((<any> navigator).deviceMemory >= 8) {
                return 'More than 8';
            }
            return (<any> navigator).deviceMemory;
        }
        return null;
    }

    isVibrateCompatible(): boolean {
        return !!navigator.vibrate;
    }

    vibrate(sequence): boolean {
        return navigator.vibrate(sequence);
    }

    isBluetoothCompatible(): boolean {
        return !!(<any> navigator).bluetooth;
    }

    getPlugins(): String[] {
        const plugins: String[] = [];

        for (let i = 0; i < navigator.plugins.length; i++) {
            plugins.push(navigator.plugins[i].name);
        }
        return plugins;
    }
}
