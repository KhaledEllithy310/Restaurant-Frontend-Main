import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  
  registerCustomer(body: any, headers: any) {
    return this.http.post(`http://127.0.0.1:8000/api/auth/customer/register`, body, headers);
  }
  
  loginCustomer(body: any, headers: any) {
    return this.http.post(`http://127.0.0.1:8000/api/auth/user/login`, body, headers)
  }
  
  logout() {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post(`http://127.0.0.1:8000/api/auth/customer/logout`, {}, httpOptions)
  }
}
