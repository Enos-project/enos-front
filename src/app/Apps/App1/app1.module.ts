import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

import { DesktopComponent } from './Components/DesktopComponent/desktop.component';
import { App1Component } from './Components/app1.component';

@NgModule({
  declarations: [
      DesktopComponent,
      App1Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    DesktopComponent,
    App1Component
  ],
  providers: [ ],
  bootstrap: [ App1Component ]
})
export class App1Module { }
