import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../Services/login.service';

import { UserType } from '../Types/Entities/UserType';

@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor (public loginService: LoginService, public router: Router) { }

  login(username: string, password: string): Promise<boolean> {
    const self = this;

    return new Promise(function(resolve, reject) {
      self.loginService.login(username, password).subscribe(function(response) {
        if ('_body' in response) {
          localStorage.setItem('connected-user', (<any> response)._body);
          resolve();
        } else {
          reject();
        }
      }, () => {
        reject();
      });
    });
  }

  fetchLoggedInUser(): UserType {
    const connectedUser = localStorage.getItem('connected-user');
    return !!connectedUser && JSON.parse(connectedUser) || null;
  }

  isLoggedIn(): boolean {
    return !!this.fetchLoggedInUser();
  }

  logout(): void {
    localStorage.removeItem('connected-user');
  }
}
