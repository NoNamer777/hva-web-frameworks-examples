import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  interval;
  remaining: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if(this.authService.isLoggedIn()) {
        const exp = Math.round(this.authService.currentUser.exp - Date.now() / 1000);
        if (exp > 0) {
          this.remaining = 'token expires in ' + exp + 's';
        } else {
          this.remaining = 'token expired';
        }
      }
    }, 1000);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isAdmin(): boolean {
    return this.authService.currentUser && this.authService.currentUser.admin == true;
  }

  get email(): string {
    return this.authService.email;
  }

}
