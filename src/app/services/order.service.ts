import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/orders/`, data);
  }

  getOrderTable(id: any) {
    return this.http.get(`http://127.0.0.1:8000/api/orders/tables/` + id);
  }

  
}
