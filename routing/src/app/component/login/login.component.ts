import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth-service";

@Component({
  selector: 'app-forbidden',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
    this.router.navigate(['/']);
  }

}
