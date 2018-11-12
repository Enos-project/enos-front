import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message: string;
  messageError: boolean;

  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.message = null;
    this.authService.login(this.username, this.password).then(() => {
      if (this.authService.isLoggedIn()) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/logged';
        this.router.navigate([redirect]);
      } else {
        this.messageError = true;
        this.message = 'Bad credentials';
      }
    }, () => {
      this.messageError = true;
      this.message = 'Bad credentials';
    });
  }
}
