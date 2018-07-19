import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatTestComponent } from '../Components/MatTestComponent/mat-test.component';
import { ServiceTestComponent } from '../Components/ServiceTestComponent/service-test.component';

import { PageNotFoundComponent } from '../Components/PageNotFoundComponent/pagenotfound.component';
import { LoginComponent } from '../Components/LoginComponent/login.component';
import { RegisterComponent } from '../Components/RegisterComponent/register.component';
import { LogoutComponent } from '../Components/LogoutComponent/logout.component';
import { LoggedComponent } from '../Components/LoggedComponent/logged.component';

import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', component: LogoutComponent},

    { path: 'logged', component: LoggedComponent, canActivate: [AuthGuardService] },
    { path: 'mat-test', component: MatTestComponent, canActivate: [AuthGuardService] },
    { path: 'service-test', component: ServiceTestComponent, canActivate: [AuthGuardService] },

    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
