import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
private URL=environment.baseUrl;
  constructor(private http: HttpClient) {

   }
    getAvailableTables()
   {
     return this.http.get(`${this.URL}tables/available`)
   }

   getAvailableTimeOnTable(id:string)
   {
    return this.http.get(`${this.URL}reservation/date/${id}`)
   }

   makeReservation(data:any)
   {
    return this.http.post(`${this.URL}reservation`,data)
   }
}