import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/user';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string;
  welcomeMessage: string;
  expectedUrl: string;

  @ViewChild('f')
  myForm: NgForm;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.expectedUrl = '/';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.welcomeMessage = params.msg;
        if (params.expectedUrl) {
          this.expectedUrl = params.expectedUrl;
        }
      });
  }

  onSubmit(): void {
    this.authService.auth(this.user).subscribe((data) => {

      this.router.navigate([this.expectedUrl]);
    }, (error) => {
      this.errorMessage = error.error.message || 'Apparently your server is down: ' + error.message;
    });
  }

}
