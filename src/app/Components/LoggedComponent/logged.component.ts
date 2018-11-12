import { Component } from '@angular/core';

import { CookieType } from '../../Types/CookieType';
import { StoreUserService } from '../../Services/Auth/store-user.service';

@Component({
  selector: 'app-logged-root',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent {
  user: CookieType;

  constructor(storeUserService: StoreUserService) {
    this.user = storeUserService.getUser();
  }

}
