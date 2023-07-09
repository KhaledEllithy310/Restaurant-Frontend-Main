import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  URl=environment.baseUrl;
  constructor(private http: HttpClient) {}

  createOrder(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/orders/`, data);
  }

  getOrderTable(id: any) {
    return this.http.get(`http://127.0.0.1:8000/api/orders/tables/complete/` + id);
  }

  makeOrderServerd(id:number)
  {
    return this.http.post(`${this.URl}orders/served/${id}`,[])
  }

  makeOrderPaid(id:number,data:any)
  {
    return this.http.post(`${this.URl}orders/paid/${id}`,data)
  }

  getServedOrder(id:number)
  {
    return this.http.post(`${this.URl}orders/served/${id}`,[])
  }

  getServedOrderByTableId(id:number)
  {
    return this.http.get(`${this.URl}orders/tables/served/${id}`)

  }

  
}
