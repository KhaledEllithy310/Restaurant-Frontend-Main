import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}


  listUsers() {
    return this.http.get(`http://127.0.0.1:8000/api/users`)
  }

  addUser(body: any) {
    return this.http.post(`http://127.0.0.1:8000/api/users`, body);
  }

  getUserByID(id: any) {
    return this.http.get(`http://127.0.0.1:8000/api/users/${id}`)
  }
  
  editUserByID(id: any, body: any) {
    return this.http.put(`http://127.0.0.1:8000/api/users/${id}`, body);
  }
  
}
