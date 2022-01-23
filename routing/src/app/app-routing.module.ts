import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Component1Component} from "./component/component1/component1.component";
import {Component2Component} from "./component/component2/component2.component";
import {Component3Component} from "./component/component3/component3.component";
import {Component7Component} from "./component/component7/component7.component";
import {Component4Component} from "./component/component4/component4.component";
import {Component41Component} from "./component/component41/component41.component";
import {Component5Component} from "./component/component5/component5.component";
import {Component6Component} from "./component/component6/component6.component";
import {CanDeactivateGuard} from "./component/component6/can-deactivate-guard.service";
import {ErrorPageComponent} from "./component/error-page/error-page.component";
import {LoginComponent} from "./component/login/login.component";
import {AuthGuard} from "./auth-guard.service";

const appRoutes: Routes = [
  { path: '', redirectTo: '/simple-route', pathMatch: 'full'},
  { path: 'simple-route', component: Component1Component },
  { path: 'programmatic-route', component: Component2Component },
  { path: 'router-param/:myparam', component: Component3Component },
  { path: 'query-param', component: Component7Component },
  { path: 'nested-route' , component: Component4Component, children: [
      { path: ':acronym', component: Component41Component }
    ] },
  { path: 'protected-route', component: Component5Component, canActivate: [AuthGuard] },
  { path: 'deactivate-example', component: Component6Component, canDeactivate: [CanDeactivateGuard] },
  { path: 'not-found' , component: ErrorPageComponent, data: {message: 'page not found'} },
  { path: 'login' , component: LoginComponent },
  { path: '**', redirectTo: '/not-found', }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
