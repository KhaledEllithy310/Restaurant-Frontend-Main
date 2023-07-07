import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  private URL=environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllReservation(pageNum:number)
  {
    return this.http.get(`${this.URL}reservation?page=${pageNum}`)
  }

  cancelReservation(id:number)
  {
    return this.http.put(`${this.URL}reservation/status/cancel/${id}`,[]);
  }

  acceptReservation(id:number)
  {
    return this.http.put(`${this.URL}reservation/status/accept/${id}`,[]);
  }
}
