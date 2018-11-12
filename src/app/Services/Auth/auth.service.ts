import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { StoreUserService } from './store-user.service';

import { CookieType } from '../../Types/CookieType';

@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor (public loginService: LoginService,
    public router: Router,
    public storeUserService: StoreUserService) { }

  login(username: string, password: string): Promise<boolean> {
    const self = this;

    return new Promise(function(resolve, reject) {
      self.loginService.login(username, password).subscribe(function(response) {
        if ('_body' in response) {
          self.storeUserService.storeUser((<any> response)._body);
          resolve();
        } else {
          reject();
        }
      }, () => {
        reject();
      });
    });
  }

  fetchLoggedInUser(): CookieType {
    return this.storeUserService.getUser();
  }

  isLoggedIn(): boolean {
    return !!this.fetchLoggedInUser();
  }

  logout(): void {
    this.storeUserService.removeUser();
  }
}
