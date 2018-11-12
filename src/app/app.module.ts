import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './Components/app.component';

import { EnosAppComponentsModule } from './enosappcomponents.module';
import { AppRoutingModule } from './Routing/app-routing.module';

import { FabProgressComponent } from './Components/CustomComponents/FabProgressComponent/fab-progress.component';

import { MatTestComponent } from './Components/MatTestComponent/mat-test.component';
import { ServiceTestComponent } from './Components/ServiceTestComponent/service-test.component';

import { LoginComponent } from './Components/LoginComponent/login.component';
import { RegisterComponent } from './Components/RegisterComponent/register.component';
import { LogoutComponent } from './Components/LogoutComponent/logout.component';
import { PageNotFoundComponent } from './Components/PageNotFoundComponent/pagenotfound.component';
import { LoggedComponent } from './Components/LoggedComponent/logged.component';

import { AuthService } from './Services/Auth/auth.service';
import { AuthGuardService } from './Services/Auth/auth-guard.service';
import { StoreUserService } from './Services/Auth/store-user.service';

import { BatteryService } from './Services/UserAgent/battery.service';
import { DisplayService } from './Services/UserAgent/display.service';
import { TimeService } from './Services/UserAgent/time.service';
import { UserConfigurationService } from './Services/UserAgent/user-configuration.service';
import { PermissionService } from './Services/UserAgent/permission.service';
import { NetworkService } from './Services/UserAgent/network.service';
import { LocationService } from './Services/UserAgent/location.service';
import { DeviceService } from './Services/UserAgent/device.service';

import { NotificationService } from './Services/notification.service';

import { HttpClientService } from './Services/Auth/http-client.service';
import { HttpAuthenticatedClientService } from './Services/Auth/http-authenticated-client.service';
import { LoginService } from './Services/Auth/login.service';

// APPS
import { App1Module } from './Apps/App1/app1.module';

@NgModule({
  declarations: [
    // TEST
    MatTestComponent,
    ServiceTestComponent,

    // AUTH
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
    LogoutComponent,
    LoggedComponent,

    // OTHERS
    FabProgressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EnosAppComponentsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ToastrModule.forRoot(),

    // APPS
    App1Module
  ],
  providers: [
    MatIconRegistry,

    // AUTH
    AuthService,
    AuthGuardService,
    StoreUserService,
    HttpClientService,
    HttpAuthenticatedClientService,
    LoginService,

    // USER AGENT SERVICES
    BatteryService,
    DisplayService,
    TimeService,
    UserConfigurationService,
    PermissionService,
    NetworkService,
    LocationService,
    DeviceService,

    // OTHER SERVICES
    NotificationService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(router: Router, matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    matIconRegistry.registerFontClassAlias('fontawesome-brands', 'fab');
    matIconRegistry.registerFontClassAlias('fontawesome-regular', 'far');
    matIconRegistry.registerFontClassAlias('fontawesome-solid', 'fas');
    matIconRegistry.registerFontClassAlias('materialdesignicons', 'mdi');
  }
}
