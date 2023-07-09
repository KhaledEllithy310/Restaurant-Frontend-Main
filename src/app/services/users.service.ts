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

  addUser(body: any, headers: any) {
    return this.http.post(`http://127.0.0.1:8000/api/users`, body, headers);
  }

  getUserByID(id: any) {
    return this.http.get(`http://127.0.0.1:8000/api/users/${id}`)
  }

  deleteUserByID(id: any) {
    return this.http.delete(`http://127.0.0.1:8000/api/users/${id}`)
  }
  
  editUserByID(id: any, body: any, headers: any) {
    return this.http.post(`http://127.0.0.1:8000/api/users/${id}`, body, headers);
  }
  userPagination(pageNumber: any) {
    return this.http.get(`http://127.0.0.1:8000/api/users/?page=${pageNumber}`);
  }
  onSearch(searchTerm: any) {
    return this.http.get(`http://127.0.0.1:8000/api/users/search?name=${searchTerm}`);
  }
}
