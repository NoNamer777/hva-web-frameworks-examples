import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Component1Component} from "./component/component1/component1.component";
import {Component2Component} from "./component/component2/component2.component";
import {Component41Component} from "./component/component41/component41.component";
import {Component4Component} from "./component/component4/component4.component";
import {Component3Component} from "./component/component3/component3.component";
import {ErrorPageComponent} from "./component/error-page/error-page.component";
import {Component5Component} from "./component/component5/component5.component";
import {LoginComponent} from "./component/login/login.component";
import {Component6Component} from "./component/component6/component6.component";
import {NavbarComponent} from "./component/navbar/navbar.component";
import {Component7Component} from "./component/component7/component7.component";

@NgModule({
  declarations: [
    AppComponent,
    Component1Component,
    Component2Component,
    Component3Component,
    Component4Component,
    Component41Component,
    ErrorPageComponent,
    Component5Component,
    LoginComponent,
    Component6Component,
    NavbarComponent,
    Component7Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
