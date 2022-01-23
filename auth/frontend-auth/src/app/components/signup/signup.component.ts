import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/user.js';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();
  errorMessage: string;

  @ViewChild('f')
  myForm: NgForm;

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.service.create(this.user).subscribe(
      (data) => {
        this.router.navigate(['/login'], {queryParams: { email: this.user.email, msg: 'the user was successfuly addded - you can proceed with the login' } });
      },(error) => {
        this.errorMessage = error.message.toString();
      }
    );
  }
}
