import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  getProfileData() {
    return this.http.get(`http://127.0.0.1:8000/api/auth/user/user-profile`);
  }
  updateProfileData(id: any, body: any, headers: any) {
    return this.http.post(`http://127.0.0.1:8000/api/users/${id}`, body, headers);
  }
}
