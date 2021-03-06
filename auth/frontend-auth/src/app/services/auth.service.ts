import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {User} from '../model/user';
import {share} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user information
  currentUser: User = null;

  // utility function to decode token
  jwtService = new JwtHelperService();

  constructor(private httpClient: HttpClient) {
    // check if there is some token in the storage and update information
    this.updateUserInformation();
  }


  auth(user) {

    // using pipe(share()) to prevent multiple submissions per subscriber (observables are cold)
    // to find out more see https://blog.strongbrew.io/how-share()-can-reduce-network-requests/
    const observable = this.httpClient.post(`${environment.apiUrl}/auth`,
      {email: user.email, password: user.password}, { observe: 'response' }).pipe(share());

    observable.subscribe(data => {

        let token = data['headers'].get('Authorization');

        if(token == null) {
          throw new Error('token was not present in the response');
        }

        token = token.replace('Bearer ', '');

        sessionStorage.setItem('token', token);

        this.updateUserInformation();
      },
      (err) => {
        this.logout();
      });

    return observable;
  }

  create(user) {
    // using pipe(share()) to prevent multiple submissions per subscriber (observables are cold)
    // to find out more see https://blog.strongbrew.io/how-share()-can-reduce-network-requests/
    const observable = this.httpClient.post(`${environment.apiUrl}/auth/users`,
        {email: user.email, name: user.name, password: user.password}).pipe(share());

    observable.subscribe((data) => {

      },
      (err) => {
        console.log('creation error', err);
      });

    return observable;

  }

  get currentToken(): string {
    return sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.updateUserInformation();
  }

  refreshToken(): Observable<any> {

    const observable = this.httpClient.post(`${environment.apiUrl}/refresh-token`, {},
      { headers: new HttpHeaders({Authorization: this.currentToken}), observe: 'response'}).pipe(share());

    observable.subscribe(data => {

        let refreshedToken = data['headers'].get('Authorization');

        if (refreshedToken == null) {
          throw new Error('token was not present in the response');
        }

        refreshedToken = refreshedToken.replace('Bearer ', '');

        sessionStorage.setItem('token', refreshedToken);

        this.updateUserInformation();
      },
      (err) => {
        this.logout();
      });

    return observable;
  }

  isLoggedIn(): boolean {
    return this.currentToken != null;
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.currentUser.admin;
  }

  get email(): string {
    return this.currentUser.email;
  }

  private updateUserInformation(): void {

    if (this.currentToken) {

      const decodedToken = this.jwtService.decodeToken(this.currentToken);

      this.currentUser = new User();
      this.currentUser.email = decodedToken.sub;
      this.currentUser.admin = decodedToken.admin.toLowerCase() === 'true';
      this.currentUser.exp = decodedToken.exp;

    } else {
      this.currentUser = null;
    }
  }


}
