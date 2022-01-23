import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Component1Component } from './component1/component1.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Component2Component } from './component2/component2.component';
import { Component3Component } from './component3/component3.component';
import { Component4Component } from './component4/component4.component';
import { Component41Component } from './component4/component41/component41.component';
import { Component42Component } from './component4/component42/component42.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from './services/message.service';
import { Component5Component } from './component5/component5.component';
import { Component6Component } from './component6/component6.component';

@NgModule({
  declarations: [
    AppComponent,
    Component1Component,
    NavbarComponent,
    Component2Component,
    Component3Component,
    Component4Component,
    Component41Component,
    Component42Component,
    Component5Component,
    Component6Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
