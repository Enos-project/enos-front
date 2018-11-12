import { Component } from '@angular/core';

import { HttpAuthenticatedClientService } from '../../../../Services/Auth/http-authenticated-client.service';
import { StoreUserService } from '../../../../Services/Auth/store-user.service';
import { InstallationType } from '../../../../Types/Entities/InstallationType';

import { RouteConstants } from '../../../../Constants/RouteConstants';

@Component({
  selector: 'app-1-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent {
  installations: InstallationType[];

  constructor(private httpAuthenticatedClientService: HttpAuthenticatedClientService,
    private storeUserService: StoreUserService) {

    this.httpAuthenticatedClientService.get(
      RouteConstants.getRouteForPath('installationsForUser') + storeUserService.getUser().id).subscribe({
      next: x => this.installations = x.json(),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
  });
  }

}
