import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


const USER_KEY = 'token';


@Injectable({
  providedIn: 'root'
})
export class StorgeTokenService {

  constructor() {}

  public saveUser(user: any): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  public logout(): void {
    sessionStorage.clear();
  }
}
