import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import {AuthService} from "../../services/auth-service";

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onClick4(allowEditingValue: boolean) {
    this.router.navigate(['/path4'], {queryParams: { allowEditing: allowEditingValue } } );
  }

  onLogout() {
    this.authService.logout();
  }

}
