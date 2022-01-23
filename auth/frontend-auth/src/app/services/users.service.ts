import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {

    return this.httpClient.get<User[]>(`${environment.apiUrl}/users`);
  }

  delete(user) {
    return this.httpClient.delete<User>(`${environment.apiUrl}/users/${user.email}`);
  }
}
