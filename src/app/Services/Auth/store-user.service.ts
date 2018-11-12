import { Injectable } from '@angular/core';

import { CookieType } from '../../Types/CookieType';

@Injectable()
export class StoreUserService {
    private key = 'connected-user';

    public storeUser(user: CookieType) {
        localStorage.setItem(this.key, JSON.stringify(user));
    }

    public getUser(): CookieType {
        const user = localStorage.getItem(this.key);
        return !!user && JSON.parse(user) || null;
    }

    public removeUser() {
        localStorage.removeItem('connected-user');
    }
}
