import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {AuthGuardLoggedinService} from './services/auth-guard-loggedin.service';
import {PanelComponent} from './components/panel/panel.component';
import {AuthGuardAdminService} from './services/auth-guard-admin.service';
import {ForbiddenComponent} from './components/forbidden/forbidden.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'panel', component: PanelComponent, canActivate: [AuthGuardAdminService]},
  { path: 'users', component: UserListComponent, canActivate: [AuthGuardLoggedinService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
