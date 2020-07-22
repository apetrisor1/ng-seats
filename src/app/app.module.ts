import { AppRoutingModule } from './app-routing.module'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { AreaComponent } from './configuration/area/area.component'
import { ConfigurationComponent } from './configuration/configuration.component'
import { CpanelComponent } from './configuration/cpanel/cpanel.component'

import {
  AutoAlignDirective,
  InitiateMovementDirective,
  MovementDirective,
  MultiSelectDirective,
  RotateDirective
} from './shared/directives'
import {
  AutoAlignService,
  GroupingService,
  InterceptService,
  LoginService,
  SVGService,
  MultiSelectService,
  PositioningService,
  RotateService
} from './shared/services'
import { LoginComponent } from './login/login.component'

@NgModule({
  exports: [
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    AreaComponent,
    ConfigurationComponent,
    CpanelComponent,
    LoginComponent,
    AutoAlignDirective,
    InitiateMovementDirective,
    MovementDirective,
    RotateDirective,
    MultiSelectDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    AutoAlignService,
    GroupingService,
    InterceptService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptService,
        multi: true
      },
    LoginService,
    MultiSelectService,
    PositioningService,
    RotateService,
    SVGService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
