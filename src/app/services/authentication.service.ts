import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from "@angular/router";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private BASIC_URL = "http://localhost:8080"
  private AUTHENTICATE_URL = `${this.BASIC_URL}/authenticate`;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(this.AUTHENTICATE_URL, { username, password })
      .pipe(map(user => {
        console.log(user);
        if (user && user.jwt) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  loggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  logoutUser() {
    localStorage.removeItem('currentUser')
    this.router.navigate(['/login-register'])
    sessionStorage.clear()
    this.currentUserSubject.next(null);
  }
}
