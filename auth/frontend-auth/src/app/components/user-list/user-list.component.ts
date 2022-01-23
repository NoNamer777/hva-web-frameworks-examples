import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  errorMessage: string;

  constructor(private service : UsersService) { }

  ngOnInit() {
    this.service.getUsers().subscribe((data) => {
      this.users = data;
    }, (error) => {
      console.error(error);
      this.errorMessage = error.message.toString();
    });
  }

  delete(user,index) {
    this.service.delete(user).subscribe((data) => {
      this.users.splice(index,1);
      this.errorMessage = null;
    }, (error) => {
      console.error(error);

      if(error.status == 403) {
        this.errorMessage = "insufficient rights for this operation"
      } else {
        this.errorMessage = error.message.toString();
      }
    })

  }

}
