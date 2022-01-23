import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-component6',
  templateUrl: './component6.component.html',
  styleUrls: ['./component6.component.css']
})
export class Component6Component implements OnInit, CanComponentDeactivate {

  changesSaved = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSave() {
    this.changesSaved = true;
    this.router.navigate(['/']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesSaved) {
      return true;
    } else {
      return confirm('Do you want to discard changes?');
    }
  }

}
