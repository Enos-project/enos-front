import { Component } from '@angular/core';

import { AuthService } from '../../Routing/auth.service';
import { UserType } from '../../Types/Entities/UserType';

@Component({
  selector: 'app-logged-root',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent {
  user: UserType;

  constructor(authService: AuthService) {
    this.user = authService.fetchLoggedInUser();
  }

}
