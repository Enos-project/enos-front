import { Injectable } from '@angular/core';

import { DisplayType } from '../../Types/UserAgent/DisplayType';

@Injectable()
export class DisplayService {

    getScreenProperties(): DisplayType {
        return <DisplayType> {
            height: {
                outer: window.outerHeight,
                inner: window.innerHeight,
                screen : screen.height,
                available: screen.availHeight
            },
            width: {
                outer: window.outerWidth,
                inner: window.innerWidth,
                screen: screen.width,
                available: screen.availWidth
            },
            isLandscapeScreen: (screen.width > screen.height),
            isLandscapeWindow: (window.outerWidth > window.outerHeight)
        };
    }

    getScreenProperty(property: string): number {
        const screenProperties = this.getScreenProperties();

        if (screenProperties.hasOwnProperty(property)) {
            return screenProperties[property];
        }
        console.error('No property ' + property + 'found for screen properties');
        return -1;
    }
}
