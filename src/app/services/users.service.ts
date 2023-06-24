import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  signup(body: any, headers: any): Observable<any> {
        return this.http.post('http://localhost:4000/register', body, headers)
        .pipe(
          catchError((err) => {
            console.log('Error: ', err);
            return throwError(err);
          })
        )
      }
}
